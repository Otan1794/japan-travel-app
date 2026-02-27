from fastapi import FastAPI
from fastapi.responses import FileResponse
from .database import engine
from . import models
from .routers import places

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(places.router)

@app.get("/")
def root():
    return FileResponse("./templates/index.html")

@app.get("/home")
def home():
    return FileResponse("./templates/home.html")