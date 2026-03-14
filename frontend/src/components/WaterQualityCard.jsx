import { calculateWaterQuality } from '../utils/waterQuality'

const SENSOR_LABELS = {
  temperature: 'Temperature',
  ph:          'pH Level',
  oxygen:      'Dissolved O₂',
  turbidity:   'Turbidity',
  water_level: 'Water Level',
}

function ScoreBar({ points, weight, color }) {
  const pct = Math.round((points / weight) * 100)
  return (
    <div style={{
      flex:         1,
      height:       '6px',
      borderRadius: '99px',
      background:   `linear-gradient(to right, ${color} ${pct}%, #2a3040 ${pct}%)`,
    }}/>
  )
}

function WaterQualityCard({ reading }) {
  const result = calculateWaterQuality(reading)
  if (!result) return null

  const { total, breakdown, status, color } = result

  const r    = 50
  const cx   = 80
  const cy   = 75
  const arc  = Math.PI * r
  const dash = (total / 100) * arc

  const styles = {
    card: {
      background:   'var(--bg-card)',
      border:       '1px solid var(--border)',
      borderRadius: '12px',
      padding:      '1.25rem',
      marginBottom: '1.5rem',
      display:      'flex',
      gap:          '2rem',
      flexWrap:     'wrap',
      alignItems:   'center',
    },
    left: {
      display:       'flex',
      flexDirection: 'column',
      alignItems:    'center',
      minWidth:      '160px',
    },
    right: {
      flex:     1,
      minWidth: '200px',
    },
    sectionLabel: {
      fontSize:      '0.75rem',
      color:         'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom:  '0.75rem',
    },
    status: {
      fontSize:   '0.9rem',
      fontWeight: '600',
      color:      color,
      marginTop:  '0.5rem',
    },
    breakdownRow: {
      display:      'flex',
      alignItems:   'center',
      gap:          '0.75rem',
      marginBottom: '0.6rem',
    },
    sensorName: {
      fontSize:   '0.78rem',
      color:      'var(--text-muted)',
      width:      '110px',
      flexShrink: 0,
    },
    points: {
      fontSize:   '0.78rem',
      color:      'var(--text-main)',
      width:      '42px',
      textAlign:  'right',
      flexShrink: 0,
    }
  }

  return (
    <div style={styles.card}>

      {/* Left — gauge */}
      <div style={styles.left}>
        <div style={styles.sectionLabel}>Water quality</div>

        <svg width="160" height="95" viewBox="0 0 160 95">
          {/* Track */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="#2a3040"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Progress */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${arc}`}
          />
          {/* Score number */}
          <text
            x={cx}
            y={cy - 8}
            textAnchor="middle"
            fill={color}
            fontSize="26"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            {total}
          </text>
          {/* Label */}
          <text
            x={cx}
            y={cy + 10}
            textAnchor="middle"
            fill="#8892a4"
            fontSize="10"
            fontFamily="sans-serif"
          >
            out of 100
          </text>
        </svg>

        <div style={styles.status}>{status}</div>
      </div>

      {/* Right — breakdown */}
      <div style={styles.right}>
        <div style={styles.sectionLabel}>Score breakdown</div>
        {Object.entries(breakdown).map(([sensor, data]) => (
          <div key={sensor} style={styles.breakdownRow}>
            <div style={styles.sensorName}>{SENSOR_LABELS[sensor]}</div>
            <ScoreBar
              points={data.points}
              weight={data.weight}
              color={color}
            />
            <div style={styles.points}>{data.points}/{data.weight}</div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default WaterQualityCard