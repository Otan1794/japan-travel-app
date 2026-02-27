from pydantic import BaseModel
from typing import Optional

class PlaceCreate(BaseModel):
    name: str
    latitude: float
    longitude: float
    prefecture: str
    notes: Optional[str] = None

class PlaceResponse(PlaceCreate):
    id: int
    photo_path: Optional[str]

    class Config:
        from_attributes = True