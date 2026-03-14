import random
import time
import json
from datetime import datetime, timezone

# --- Sensor value ranges ---
# Based on healthy crayfish pond conditions
SENSOR_RANGES = {
    "temperature":  (24.0, 30.0),   # Celsius
    "ph":           (6.5,  8.5),    # pH scale
    "oxygen":       (5.0,  9.0),    # mg/L dissolved oxygen
    "turbidity":    (0.0,  10.0),   # NTU (lower = clearer water)
    "water_level":  (30.0, 60.0),   # cm
}

DEVICE_ID = "pond-sensor-001"

def generate_reading():
    """Generate one fake sensor reading."""
    reading = {
        "device_id":   DEVICE_ID,
        "timestamp":   datetime.now(timezone.utc).isoformat(),
    }

    for sensor, (min_val, max_val) in SENSOR_RANGES.items():
        reading[sensor] = round(random.uniform(min_val, max_val), 2)

    return reading

def check_alerts(reading):
    """Check if any reading is outside safe thresholds."""
    alerts = []

    if reading["ph"] < 6.5 or reading["ph"] > 8.5:
        alerts.append(f"ALERT: pH out of range → {reading['ph']}")

    if reading["oxygen"] < 5.0:
        alerts.append(f"ALERT: Low oxygen → {reading['oxygen']} mg/L")

    if reading["temperature"] > 29.0:
        alerts.append(f"ALERT: High temperature → {reading['temperature']}°C")

    if reading["water_level"] < 32.0:
        alerts.append(f"ALERT: Low water level → {reading['water_level']} cm")

    return alerts

def run_simulator(interval_seconds=3):
    """Run the simulator continuously."""
    print("Anilyzen Sensor Simulator running...")
    print(f"Device: {DEVICE_ID}")
    print(f"Interval: every {interval_seconds} seconds")
    print("-" * 45)

    while True:
        reading = generate_reading()

        # Print the reading as formatted JSON
        print(json.dumps(reading, indent=2))

        # Check and print any alerts
        alerts = check_alerts(reading)
        for alert in alerts:
            print(f"⚠  {alert}")

        print("-" * 45)
        time.sleep(interval_seconds)

if __name__ == "__main__":
    run_simulator()