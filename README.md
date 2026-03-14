# AniLyzen 🦞

> Real-time crayfish pond monitoring SaaS — IoT sensor analytics dashboard.

A full-stack SaaS application that monitors crayfish pond health using IoT 
sensors. Built as a featured portfolio project combining data engineering, 
software engineering, and cloud engineering.

## Architecture
```
Sensor / Simulator
       ↓
  FastAPI Backend
       ↓
  Supabase (PostgreSQL)
       ↓
  React Dashboard + Email Alerts
```

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI (Python) |
| Database | Supabase (PostgreSQL) |
| Frontend | React + Apache ECharts |
| Auth | Supabase Auth |
| Alerts | Gmail SMTP |
| Hosting | Vercel (frontend) · Railway (backend) |
| Hardware (v2) | ESP32 + IoT sensors |

## Sensors Monitored

- Temperature (°C)
- pH level
- Dissolved oxygen (mg/L)
- Turbidity (NTU)
- Water level (cm)

## Features (v1)

- [x] Real-time sensor data ingestion
- [x] Automated alert detection
- [x] Email notifications for out-of-range values
- [x] REST API with auto-generated docs
- [ ] React dashboard (in progress)
- [ ] Supabase Auth login
- [ ] Hardware integration (v2)

## Running Locally
```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Simulator
python simulator/sensor_simulator.py
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | App info |
| GET | `/health` | Health check |
| POST | `/api/v1/sensor-data` | Ingest sensor reading |
| GET | `/api/v1/readings` | Get latest readings |
| GET | `/api/v1/alerts` | Get latest alerts |

## Project Status

🚧 Active development — v1 (backend complete, dashboard in progress)

---

Built by [ Mark John Merana] · Featured portfolio project