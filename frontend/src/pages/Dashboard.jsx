import { useSensorData }   from '../hooks/useSensorData'
import SensorCard          from '../components/SensorCard'
import WaterQualityCard    from '../components/WaterQualityCard'

function Dashboard() {
  const { latest, loading, error } = useSensorData(3000)

  const styles = {
    page: {
      padding:       '1.5rem',
      maxWidth:      '1100px',
      margin:        '0 auto',
      paddingBottom: '5rem',
    },
    header: {
      marginBottom:  '1.5rem',
      paddingBottom: '1.5rem',
      borderBottom:  '1px solid #2a3040',
    },
    title: {
      fontSize:   '1.2rem',
      fontWeight: '700',
      color:      '#e2e8f0',
    },
    subtitle: {
      fontSize:  '0.82rem',
      color:     '#8892a4',
      marginTop: '3px',
    },
    timestamp: {
      fontSize:  '0.75rem',
      color:     '#8892a4',
      marginTop: '3px',
    },
    error: {
      background:   '#ff4d4d18',
      border:       '1px solid #ff4d4d',
      borderRadius: '8px',
      padding:      '0.75rem 1rem',
      color:        '#ff4d4d',
      fontSize:     '0.85rem',
      marginBottom: '1.5rem',
    },
    sectionTitle: {
      fontSize:      '0.72rem',
      color:         '#8892a4',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom:  '0.75rem',
      marginTop:     '1.5rem',
    },
    cardsRow: {
      display:             'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap:                 '0.75rem',
    },
  }

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.title}>Pond Dashboard</div>
        <div style={styles.subtitle}>
          Device: pond-sensor-001 · Majayjay, Laguna
        </div>
        {latest && (
          <div style={styles.timestamp}>
            Last reading: {new Date(latest.timestamp).toLocaleString()}
          </div>
        )}
      </div>

      {/* Error */}
      {error && <div style={styles.error}>{error}</div>}

      {/* Loading */}
      {loading && !latest && (
        <div style={{ color: '#8892a4', fontSize: '0.9rem' }}>
          Loading sensor data...
        </div>
      )}

      {/* Sensor cards */}
      {latest && (
        <>
          <div style={styles.sectionTitle}>Current readings</div>
          <div style={styles.cardsRow}>
            <SensorCard label="Temperature" value={latest.temperature} unit="°C"  max={29} />
            <SensorCard label="pH Level"    value={latest.ph}          unit="pH"  min={6.5} max={8.5} />
            <SensorCard label="Dissolved O₂" value={latest.oxygen}    unit="mg/L" min={5} />
            <SensorCard label="Turbidity"   value={latest.turbidity}   unit="NTU" />
            <SensorCard label="Water Level" value={latest.water_level} unit="cm"  min={32} />
          </div>
        </>
      )}

      {/* Water quality */}
      {latest && (
        <>
          <div style={styles.sectionTitle}>Water quality score</div>
          <WaterQualityCard reading={latest} />
        </>
      )}

    </div>
  )
}

export default Dashboard