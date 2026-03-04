from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from .database import engine
from . import models
from .routers import places

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
active_connections = []

app.include_router(places.router)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def root():
    return FileResponse("./templates/index.html")

@app.get("/home")
def home():
    return FileResponse("./templates/home.html")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)

    try:
        while True:
            data = await websocket.receive_text()

            # Broadcast message to everyone
            for connection in active_connections:
                await connection.send_text(data)

    except WebSocketDisconnect:
        active_connections.remove(websocket)