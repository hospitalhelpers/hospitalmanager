from pydantic import BaseModel, Field
from typing import Optional

class Medicine(BaseModel):
    medicationID: Optional[str] = None
    dosage: Optional[str] = None
    prescribedDate: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "medicationID": "somemedicinehere",
                "dosage": "somedosagehere",
                "prescribedDate": "somedatehere"
            }
        }