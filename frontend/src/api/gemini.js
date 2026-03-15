console.log('Gemini key:', import.meta.env.VITE_GEMINI_API_KEY)

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI  = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash'})

export async function analyzePond(latest, readings) {

  const trend = readings.slice(0, 5).reverse().map(r => ({
    time:        new Date(r.timestamp).toLocaleTimeString(),
    temperature: r.temperature,
    ph:          r.ph,
    oxygen:      r.oxygen,
    turbidity:   r.turbidity,
    water_level: r.water_level,
  }))

  const prompt = `
You are an expert aquaculture scientist specializing in crayfish pond management.

Here is the current sensor reading from a crayfish pond:
- Temperature:       ${latest.temperature}°C   (safe: 24–29°C)
- pH:                ${latest.ph}              (safe: 6.5–8.5)
- Dissolved Oxygen:  ${latest.oxygen} mg/L     (safe: ≥5.0)
- Turbidity:         ${latest.turbidity} NTU   (safe: ≤8 NTU)
- Water Level:       ${latest.water_level} cm  (safe: 32–58 cm)

Recent trend (last 5 readings):
${JSON.stringify(trend, null, 2)}

Please provide a structured response in this exact JSON format:
{
  "status": "one of: Excellent / Good / Fair / Warning / Critical",
  "summary": "2-3 sentence overall assessment of pond health",
  "analysis": [
    {
      "sensor": "sensor name",
      "value": "current value with unit",
      "assessment": "Normal / Warning / Critical",
      "insight": "one sentence explanation"
    }
  ],
  "prediction": "2-3 sentences predicting what might happen in the next few hours based on the trend",
  "recommendations": [
    "specific action 1",
    "specific action 2",
    "specific action 3"
  ],
  "urgency": "one of: Monitor / Act Soon / Act Now"
}

Respond with ONLY the JSON. No markdown, no backticks, no extra text.
`

  const result   = await model.generateContent(prompt)
  const text     = result.response.text()
  const cleaned  = text.replace(/```json|```/g, '').trim()
  return JSON.parse(cleaned)
}