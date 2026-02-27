import os
from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import SessionLocal

router = APIRouter(prefix="/places", tags=["Places"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
async def create_place(
    name: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    prefecture: str = Form(...),
    notes: str = Form(None),
    photo: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    photo_path = None
    if photo:
        photo_path = f"{UPLOAD_DIR}/{photo.filename}"
        with open(photo_path, "wb") as f:
            f.write(await photo.read())

    place_data = schemas.PlaceCreate(
        name=name,
        latitude=latitude,
        longitude=longitude,
        prefecture=prefecture,
        notes=notes
    )

    return crud.create_place(db, place_data, photo_path)

@router.get("/")
def read_places(db: Session = Depends(get_db)):
    return crud.get_places(db)

@router.delete("/{place_id}")
def delete_place(place_id: int, db: Session = Depends(get_db)):
    return crud.delete_place(db, place_id)