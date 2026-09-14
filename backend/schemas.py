from pydantic import BaseModel
from typing import Optional


class Complaint(BaseModel):
    customer_name: Optional[str] = None
    product_name: Optional[str] = None
    product_strength: Optional[str] = None
    batch_number: Optional[str] = None
    capture_date: Optional[str] = None
    expiry_date: Optional[str] = None
    affected_quantity: Optional[str] = None
    complaint_type: Optional[str] = None
    complaint_description: Optional[str] = None


class RiskAssessment(BaseModel):
    severity: Optional[str] = None
    risk_level: Optional[str] = None
    rationale: Optional[str] = None
    recommended_action: Optional[str] = None