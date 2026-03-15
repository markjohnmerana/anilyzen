# Anilyzen 🦞

> Real-time crayfish pond monitoring SaaS — IoT sensor analytics, AI insights, and automated alerts.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-anilyzen.vercel.app-00c896?style=flat-square)](https://anilyzen.vercel.app)
[![Backend](https://img.shields.io/badge/API-Railway-00c896?style=flat-square)](https://anilyzen-production.up.railway.app/docs)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## Live Demo

🌊 **[anilyzen.vercel.app](https://anilyzen.vercel.app)**

> Demo credentials available on request.

---

## Overview

Anilyzen is a full-stack SaaS application that monitors crayfish pond health in real time using IoT sensors. It ingests sensor data through a REST API pipeline, stores it in a cloud database, detects dangerous water conditions, sends automated email alerts, and visualizes everything on a live React dashboard powered by AI insights.

Built as a featured portfolio project combining data engineering, software engineering, cloud engineering, and AI integration — from scratch — with a ₱0 budget.

---

## Features

- **Real-time monitoring** — live sensor cards updating every 3 seconds
- **Water quality score** — computed 0–100 score with per-sensor breakdown
- **AI analysis** — Gemini-powered pond health analysis, prediction, and recommendations
- **AI chat** — floating chat widget with live pond data context
- **Automated alerts** — threshold-based detection with email notifications via Gmail SMTP
- **Sensor history** — 5 live ECharts time-series charts with threshold markers
- **Authentication** — Supabase Auth with protected routes
- **Mobile responsive** — bottom navigation, grid layout, works on all screen sizes
- **Device status** — real-time online/offline indicator in navbar

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Apache ECharts |
| Backend | FastAPI (Python) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| AI | Google Gemini 1.5 Flash |
| Alerts | Gmail SMTP |
| Simulator | Python (ESP32-ready) |
| Hosting | Vercel (frontend) + Railway (backend + simulator) |
| Hardware (v2) | ESP32 + IoT sensors |

---

## Sensors Monitored

| Sensor | Unit | Safe Range |
|---|---|---|
| Temperature | °C | 24 – 29 |
| pH Level | pH | 6.5 – 8.5 |
| Dissolved Oxygen | mg/L | ≥ 5.0 |
| Turbidity | NTU | ≤ 8.0 |
| Water Level | cm | 32 – 58 |

---

## Architecture

```
ESP32 Sensors (v2) / Python Simulator (v1)
              ↓
       FastAPI Backend
       (REST API + Alert Engine)
              ↓
    Supabase (PostgreSQL)
              ↓
    React Dashboard + Gemini AI
              ↓
    Email Alerts (Gmail SMTP)
```

---

## Project Structure

```
anilyzen/
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI endpoints
│   │   ├── core/         # Config, database, alerts, email
│   │   └── models/       # Pydantic data models
│   ├── Procfile
│   ├── requirements.txt
│   └── runtime.txt
├── simulator/
│   ├── sensor_simulator.py
│   ├── Procfile
│   ├── requirements.txt
│   └── runtime.txt
├── frontend/
│   ├── src/
│   │   ├── api/          # Axios config, Gemini, Supabase
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # Shared sensor data context
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Dashboard, AI Insights, History, Login
│   │   └── utils/        # Water quality scoring logic
│   └── public/
│       └── favicon.svg
└── docs/
    └── schema.sql
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | App info |
| GET | `/health` | Health check |
| POST | `/api/v1/sensor-data` | Ingest sensor reading + trigger alerts |
| GET | `/api/v1/readings` | Get latest sensor readings |
| GET | `/api/v1/alerts` | Get latest alerts |

Full interactive docs: [anilyzen-production.up.railway.app/docs](https://anilyzen-production.up.railway.app/docs)

---

## Running Locally

### Prerequisites

- Python 3.11+
- Node.js 22+
- Supabase account (free)
- Google AI Studio API key (free)
- Gmail account with App Password

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Fill in your SUPABASE_URL, SUPABASE_KEY, EMAIL_* values

uvicorn app.main:app --reload
```

### Simulator

```bash
# In a separate terminal
python simulator/sensor_simulator.py
```

### Frontend

```bash
cd frontend
npm install

# Create .env.local file
cp .env.example .env.local
# Fill in your VITE_API_URL, VITE_GEMINI_API_KEY, VITE_SUPABASE_* values

npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Database Schema

```sql
-- Sensor readings (time-series data)
CREATE TABLE sensor_readings (
  id          bigserial primary key,
  device_id   text not null,
  timestamp   timestamptz not null,
  temperature numeric(5,2),
  ph          numeric(4,2),
  oxygen      numeric(4,2),
  turbidity   numeric(5,2),
  water_level numeric(5,2),
  created_at  timestamptz default now()
);

-- Triggered alerts
CREATE TABLE alerts (
  id         bigserial primary key,
  device_id  text not null,
  sensor     text not null,
  message    text not null,
  value      numeric(6,2),
  timestamp  timestamptz not null,
  created_at timestamptz default now()
);
```

---

## Roadmap

### v1.5 (current) ✅
- [x] Real-time sensor pipeline
- [x] Cloud database
- [x] Email alert notifications
- [x] Live analytics dashboard
- [x] Water quality score
- [x] AI analysis + prediction (Gemini)
- [x] Floating AI chat with pond context
- [x] Multi-page navigation (Overview, AI, History)
- [x] Supabase Auth + protected routes
- [x] Mobile responsive
- [x] Deployed on Vercel + Railway

### v2 (planned)
- [ ] Real ESP32 hardware integration
- [ ] Multi-pond support
- [ ] Export sensor data to CSV
- [ ] Pond health timeline chart
- [ ] Weekly AI-generated report
- [ ] Anomaly detection
- [ ] AWS migration
- [ ] Dark/light mode toggle

---

## Environment Variables

### Backend (`.env`)

```
SUPABASE_URL=
SUPABASE_KEY=
EMAIL_SENDER=
EMAIL_PASSWORD=
EMAIL_RECEIVER=
```

### Frontend (`.env.local`)

```
VITE_API_URL=
VITE_GEMINI_API_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## Screenshots

| Overview Dashboard | AI Insights | Login |
|---|---|---|
| Live sensor cards, water quality score | Gemini analysis + prediction + chat | Animated ocean background |

---

## About

Built by **Mark John Merana** — aspiring data analyst and engineer from Infanta, Quezon

This project demonstrates end-to-end data pipeline design, from IoT sensor ingestion to real-time analytics visualization and AI-powered insights.

- GitHub: [github.com/markjohnmerana](https://github.com/markjohnmerana)

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

*Built with FastAPI · Supabase · React · Gemini AI* 🦞