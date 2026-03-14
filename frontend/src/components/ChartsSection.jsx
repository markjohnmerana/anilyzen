import SensorChart from './SensorChart'

const SENSOR_CONFIG = [
  {
    sensor: 'temperature',
    label:  'Temperature',
    unit:   '°C',
    min:    24,
    max:    29,
    yMin:   18,
    yMax:   36,
  },
  {
    sensor: 'ph',
    label:  'pH Level',
    unit:   'pH',
    min:    6.5,
    max:    8.5,
    yMin:   4,
    yMax:   10,
  },
  {
    sensor: 'oxygen',
    label:  'Dissolved Oxygen',
    unit:   'mg/L',
    min:    5,
    yMin:   0,
    yMax:   12,
  },
  {
    sensor: 'turbidity',
    label:  'Turbidity',
    unit:   'NTU',
    max:    8,
    yMin:   0,
    yMax:   15,
  },
  {
    sensor: 'water_level',
    label:  'Water Level',
    unit:   'cm',
    min:    32,
    yMin:   20,
    yMax:   70,
  },
]

function ChartsSection({ readings }) {
  if (!readings || readings.length === 0) return null

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {SENSOR_CONFIG.map(config => (
        <SensorChart
          key={config.sensor}
          readings={readings}
          {...config}
        />
      ))}
    </div>
  )
}

export default ChartsSection