from sqlalchemy import Column, Integer, String, Float, Text
from .database import Base

class Place(Base):
    __tablename__ = "places"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    prefecture = Column(String, nullable=False)
    notes = Column(Text)
    photo_path = Column(String)