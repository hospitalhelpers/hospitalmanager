from pydantic import BaseModel, Field
from typing import Optional

class PatientCase(BaseModel):
    patientName : Optional[str] = None
    symptoms : Optional[list] = None
    status : Optional[str] = None
    priority : Optional[int] = None
    age : Optional[int] = None


    class Config:
        json_schema_extra = {
            "example": {
                "patientName": "daniel",
                "symptoms": [],
                "status": "waiting",
                "priority": 1,
                "age": 20
            }
        }