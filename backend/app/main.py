from fastapi import FastAPI
from app.api.sensor import router as sensor_router

app = FastAPI(
    title="AniLyzen API",
    description="Crayfish pond monitoring backend",
    version="0.1.0"
)

app.include_router(sensor_router, prefix="/api/v1")

@app.get("/")
def root():
     return {
        "app":     "Anilyzen API",
        "version": "0.1.0",
        "status":  "running",
        "docs":    "/docs"
    }

@app.get("/health")
def health():
    """Health check endpoint — used by hosting platforms to verify the app is alive."""
    return {"status": "ok"}