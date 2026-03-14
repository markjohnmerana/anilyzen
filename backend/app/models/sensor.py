from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SensorReading(BaseModel):
    device_id:   str
    timestamp:   datetime
    temperature: Optional[float] = None
    ph:          Optional[float] = None
    oxygen:      Optional[float] = None
    turbidity:   Optional[float] = None
    water_level: Optional[float] = None

class Alert(BaseModel):
    device_id: str
    sensor:    str
    message:   str
    value:     float
    timestamp: datetime