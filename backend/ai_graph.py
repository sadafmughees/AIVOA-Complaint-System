import os
import json
from typing import TypedDict
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq
from langgraph.graph import StateGraph, START, END


# --------------------------------------------------
# LOAD ENVIRONMENT
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
ENV_FILE = BASE_DIR / ".env"

load_dotenv(ENV_FILE)


# --------------------------------------------------
# LANGGRAPH STATE
# --------------------------------------------------

class ComplaintState(TypedDict):
    user_message: str
    current_complaint: dict
    current_risk: dict
    result: dict


# --------------------------------------------------
# GROQ
# --------------------------------------------------

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError(
        f"GROQ_API_KEY was not found. Check: {ENV_FILE}"
    )

client = Groq(api_key=api_key)

MODEL = os.getenv(
    "GROQ_MODEL",
    "openai/gpt-oss-20b"
)


# --------------------------------------------------
# AI NODE
# --------------------------------------------------

def complaint_ai_node(state: ComplaintState):

    user_message = state["user_message"]

    current_complaint = state.get(
        "current_complaint",
        {}
    )

    current_risk = state.get(
        "current_risk",
        {}
    )

    prompt = f"""
You are an AI Copilot for a pharmaceutical
Customer Complaint Management System.

Extract complaint information from the user message.

You may receive:
1. A new customer complaint
2. A correction to an existing complaint
3. Text extracted from a customer complaint document

CURRENT COMPLAINT:
{json.dumps(current_complaint, indent=2)}

CURRENT RISK:
{json.dumps(current_risk, indent=2)}

USER/DOCUMENT TEXT:
{user_message}

RULES:

1. Extract only information supported by the text.
2. Do not invent batch numbers or quantities.
3. If existing complaint information is present, preserve it.
4. If the user corrects a field, update that field.
5. Assess the complaint from a pharmaceutical QA perspective.
6. Severity must be Minor, Major, or Critical.
7. Risk level must be Low, Medium, or High.
8. Return ONLY valid JSON.

Return:

{{
    "assistant_message": "Short confirmation",

    "complaint": {{
        "customer_name": null,
        "product_name": null,
        "product_strength": null,
        "batch_number": null,
        "capture_date": null,
        "expiry_date": null,
        "affected_quantity": null,
        "complaint_type": null,
        "complaint_description": null
    }},

    "risk_assessment": {{
        "severity": null,
        "risk_level": null,
        "rationale": null,
        "recommended_action": null
    }}
}}
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a pharmaceutical quality "
                    "complaint AI assistant."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0,
        response_format={
            "type": "json_object"
        }
    )

    content = response.choices[0].message.content

    result = json.loads(content)

    # --------------------------------------------------
    # MERGE COMPLAINT
    # --------------------------------------------------

    new_complaint = result.get(
        "complaint",
        {}
    )

    merged_complaint = current_complaint.copy()

    for key, value in new_complaint.items():
        if value is not None and value != "":
            merged_complaint[key] = value

    # --------------------------------------------------
    # MERGE RISK
    # --------------------------------------------------

    new_risk = result.get(
        "risk_assessment",
        {}
    )

    merged_risk = current_risk.copy()

    for key, value in new_risk.items():
        if value is not None and value != "":
            merged_risk[key] = value

    result["complaint"] = merged_complaint
    result["risk_assessment"] = merged_risk

    return {
        "user_message": user_message,
        "current_complaint": current_complaint,
        "current_risk": current_risk,
        "result": result
    }


# --------------------------------------------------
# LANGGRAPH
# --------------------------------------------------

workflow = StateGraph(ComplaintState)

workflow.add_node(
    "complaint_ai",
    complaint_ai_node
)

workflow.add_edge(
    START,
    "complaint_ai"
)

workflow.add_edge(
    "complaint_ai",
    END
)

complaint_graph = workflow.compile()