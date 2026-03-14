from app.core.database import supabase

# --- Thresholds ---
THRESHOLDS = {
    "ph_min":          6.5,
    "ph_max":          8.5,
    "oxygen_min":      5.0,
    "temperature_max": 29.0,
    "water_level_min": 32.0,
}

def check_and_save_alerts(reading: dict) -> list:
    """
    Check a reading against thresholds.
    Save any triggered alerts to Supabase.
    Return list of triggered alerts.
    """
    triggered = []

    checks = [
        (
            "ph",
            reading.get("ph"),
            lambda v: v < THRESHOLDS["ph_min"] or v > THRESHOLDS["ph_max"],
            lambda v: f"pH out of safe range: {v} (safe: {THRESHOLDS['ph_min']}–{THRESHOLDS['ph_max']})"
        ),
        (
            "oxygen",
            reading.get("oxygen"),
            lambda v: v < THRESHOLDS["oxygen_min"],
            lambda v: f"Low dissolved oxygen: {v} mg/L (min: {THRESHOLDS['oxygen_min']})"
        ),
        (
            "temperature",
            reading.get("temperature"),
            lambda v: v > THRESHOLDS["temperature_max"],
            lambda v: f"High temperature: {v}°C (max: {THRESHOLDS['temperature_max']})"
        ),
        (
            "water_level",
            reading.get("water_level"),
            lambda v: v < THRESHOLDS["water_level_min"],
            lambda v: f"Low water level: {v} cm (min: {THRESHOLDS['water_level_min']})"
        ),
    ]

    for sensor, value, is_triggered, message_fn in checks:
        if value is not None and is_triggered(value):
            alert = {
                "device_id": reading["device_id"],
                "sensor":    sensor,
                "message":   message_fn(value),
                "value":     value,
                "timestamp": reading["timestamp"],
            }
            # Save to Supabase
            supabase.table("alerts").insert(alert).execute()
            triggered.append(alert)

    return triggered