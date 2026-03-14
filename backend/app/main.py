from fastapi import FastAPI
from app.api.sensor import router as sensor_router

app = FastAPI(
    title="Anilyzen API",
    description="Crayfish pond monitoring backend",
    version="0.1.0"
)

app.include_router(sensor_router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "Anilyzen API is running 🦞"}