from pydantic import BaseModel, Field
from typing import Optional

class HospitalStructure(BaseModel):
    Floors: Optional[dict] = None
    FloorStructure: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "Floors": None,
                "FloorStructure": None
            }
        }