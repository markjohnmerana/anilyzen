from fastapi import APIRouter, HTTPException
from app.models.sensor import SensorReading
from app.core.database import supabase
from app.core.alerts import check_and_save_alerts

router = APIRouter()

@router.post("/sensor-data")
def receive_sensor_data(reading: SensorReading):
    """Receive one sensor reading and save it to Supabase."""
    try:
        data = reading.model_dump()
        data["timestamp"] = data["timestamp"].isoformat()

        response = supabase.table("sensor_readings").insert(data).execute()

        # Check and save alerts
        triggered_alerts = check_and_save_alerts(data)

        return {
            "status":  "success",
            "message": "Reading saved",
            "data":    response.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/readings")
def get_readings(limit: int = 20):
    """Return the latest sensor readings."""
    try:
        response = (
            supabase.table("sensor_readings")
            .select("*")
            .order("timestamp", desc=True)
            .limit(limit)
            .execute()
        )
        return {
            "status": "success",
            "data":   response.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/alerts")
def get_alerts(limit: int = 20):
    """Return the latest alerts."""
    try:
        response = (
            supabase.table("alerts")
            .select("*")
            .order("timestamp", desc=True)
            .limit(limit)
            .execute()
        )
        return {
            "status": "success",
            "data":   response.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))