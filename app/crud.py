from sqlalchemy.orm import Session
from . import models, schemas

def create_place(db: Session, place: schemas.PlaceCreate, photo_path: str = None):
    db_place = models.Place(
        **place.dict(),
        photo_path=photo_path
    )
    db.add(db_place)
    db.commit()
    db.refresh(db_place)
    return db_place

def get_places(db: Session):
    return db.query(models.Place).all()

def delete_place(db: Session, place_id: int):
    place = db.query(models.Place).filter(models.Place.id == place_id).first()
    if place:
        db.delete(place)
        db.commit()
    return place