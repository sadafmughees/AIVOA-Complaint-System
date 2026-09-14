from fastapi import FastAPI, UploadFile, File, HTTPException
from backend.schemas import Complaint, RiskAssessment
from backend.ai_graph import complaint_graph

from pypdf import PdfReader
from io import BytesIO


app = FastAPI(
    title="AIVOA Complaint Management System"
)


# --------------------------------------------------
# HOME
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "AIVOA Complaint Management System API is running"
    }


# --------------------------------------------------
# HEALTH
# --------------------------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# --------------------------------------------------
# CREATE COMPLAINT
# --------------------------------------------------

@app.post("/complaints")
def create_complaint(
    complaint: Complaint,
    risk: RiskAssessment
):
    return {
        "message": "Complaint received successfully",
        "complaint": complaint,
        "risk_assessment": risk
    }


# --------------------------------------------------
# AI COPILOT MESSAGE
# --------------------------------------------------

@app.post("/copilot/message")
def copilot_message(data: dict):

    result = complaint_graph.invoke({
        "user_message": data.get(
            "message",
            ""
        ),

        "current_complaint": data.get(
            "current_complaint",
            {}
        ),

        "current_risk": data.get(
            "current_risk",
            {}
        ),

        "result": {}
    })

    return result["result"]


# --------------------------------------------------
# PDF COMPLAINT EXTRACTION
# --------------------------------------------------

@app.post("/copilot/upload-pdf")
async def upload_complaint_pdf(
    file: UploadFile = File(...)
):

    # Check file type
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    # Read uploaded PDF
    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded PDF is empty."
        )

    try:

        # Create PDF reader
        pdf = PdfReader(
            BytesIO(file_bytes)
        )

        # Extract text from all pages
        extracted_text = ""

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:
                extracted_text += page_text + "\n"

        if not extracted_text.strip():
            raise HTTPException(
                status_code=400,
                detail=(
                    "No readable text was found in the PDF."
                )
            )

        # Send extracted text to LangGraph
        result = complaint_graph.invoke({

            "user_message": (
                "Extract complaint information from "
                "this uploaded customer complaint PDF.\n\n"
                + extracted_text
            ),

            "current_complaint": {},

            "current_risk": {},

            "result": {}
        })

        return {
            "message": "PDF processed successfully",
            "filename": file.filename,
            "extracted_text": extracted_text,
            "ai_result": result["result"]
        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"PDF processing failed: {str(e)}"
        )