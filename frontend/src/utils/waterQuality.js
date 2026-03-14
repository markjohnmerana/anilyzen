const SCORING = {
  temperature: {
    weight: 20,
    check: (v) => {
      if (v >= 24 && v <= 29)   return 1.0    // perfect
      if (v >= 22 && v <= 31)   return 0.6    // acceptable
      if (v >= 20 && v <= 33)   return 0.3    // concerning
      return 0                                 // critical
    }
  },
  ph: {
    weight: 20,
    check: (v) => {
      if (v >= 6.5 && v <= 8.5) return 1.0
      if (v >= 6.0 && v <= 9.0) return 0.6
      if (v >= 5.5 && v <= 9.5) return 0.3
      return 0
    }
  },
  oxygen: {
    weight: 20,
    check: (v) => {
      if (v >= 6.0)              return 1.0
      if (v >= 5.0)              return 0.7
      if (v >= 3.5)              return 0.3
      return 0
    }
  },
  turbidity: {
    weight: 20,
    check: (v) => {
      if (v <= 5)                return 1.0
      if (v <= 7)                return 0.6
      if (v <= 9)                return 0.3
      return 0
    }
  },
  water_level: {
    weight: 20,
    check: (v) => {
      if (v >= 35 && v <= 55)   return 1.0
      if (v >= 32 && v <= 58)   return 0.6
      if (v >= 28 && v <= 62)   return 0.3
      return 0
    }
  }
}

export function calculateWaterQuality(reading) {
  if (!reading) return null

  let totalScore = 0
  let breakdown  = {}

  for (const [sensor, config] of Object.entries(SCORING)) {
    const value = reading[sensor]
    if (value === null || value === undefined) {
      breakdown[sensor] = { score: 0, points: 0, weight: config.weight }
      continue
    }
    const ratio  = config.check(value)
    const points = Math.round(ratio * config.weight)
    totalScore  += points
    breakdown[sensor] = { score: ratio, points, weight: config.weight, value }
  }

  return {
    total:     totalScore,
    breakdown,
    status:    getStatus(totalScore),
    color:     getColor(totalScore),
  }
}

function getStatus(score) {
  if (score >= 85) return 'Excellent'
  if (score >= 70) return 'Good'
  if (score >= 50) return 'Fair'
  if (score >= 30) return 'Poor'
  return 'Critical'
}

function getColor(score) {
  if (score >= 85) return '#00c896'
  if (score >= 70) return '#00c896'
  if (score >= 50) return '#ffaa00'
  if (score >= 30) return '#ff6b35'
  return '#ff4d4d'
}