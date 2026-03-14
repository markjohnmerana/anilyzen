import { useSensorData } from '../hooks/useSensorData'
import SensorCard from '../components/SensorCard'
import ChartsSection from '../components/ChartsSection'
import AlertsPanel from '../components/AlertsPanel'
import WaterQualityCard from '../components/WaterQualityCard'

function Dashboard() {
  const { readings, latest, alerts, loading, error } = useSensorData(3000)

  const styles = {
    page: {
      padding:  '2rem',
      maxWidth: '1100px',
      margin:   '0 auto',
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize:   '1.5rem',
      fontWeight: '700',
      color:      'var(--text-main)',
    },
    subtitle: {
      fontSize:  '0.85rem',
      color:     'var(--text-muted)',
      marginTop: '4px',
    },
    dot: {
      display:      'inline-block',
      width:        '8px',
      height:       '8px',
      borderRadius: '50%',
      background:   'var(--primary)',
      marginRight:  '6px',
      animation:    'pulse 2s infinite',
    },
    cardsRow: {
    display:      'flex',
    flexWrap:     'wrap',
    gap:          '1rem',
    marginBottom: '2rem',
    },
    error: {
      background:   '#ff4d4d22',
      border:       '1px solid var(--danger)',
      borderRadius: '8px',
      padding:      '1rem',
      color:        'var(--danger)',
      marginBottom: '1rem',
    },
    timestamp: {
      fontSize:     '0.75rem',
      color:        'var(--text-muted)',
      marginBottom: '1rem',
    },
    sectionTitle: {
      fontSize:      '0.75rem',
      color:         'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom:  '1rem',
      marginTop:     '2rem',
    }
  }

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.title}>
          <span style={styles.dot}></span>
          Anilyzen Dashboard
        </div>
        <div style={styles.subtitle}>
          Crayfish pond — real-time monitoring
        </div>
      </div>

      {/* Error */}
      {error && <div style={styles.error}>{error}</div>}

      {/* Loading */}
      {loading && (
        <div style={{ color: 'var(--text-muted)' }}>
          Loading sensor data...
        </div>
      )}

      {/* Timestamp */}
      {latest && (
        <div style={styles.timestamp}>
          Last reading: {new Date(latest.timestamp).toLocaleString()}
        </div>
      )}

      {/* Sensor cards */}
      {latest && (
        <>
          <div style={styles.sectionTitle}>Current readings</div>
          <div style={styles.cardsRow}>
            <SensorCard
              label="Temperature"
              value={latest.temperature}
              unit="°C"
              max={29}
            />
            <SensorCard
              label="pH Level"
              value={latest.ph}
              unit="pH"
              min={6.5}
              max={8.5}
            />
            <SensorCard
              label="Dissolved O₂"
              value={latest.oxygen}
              unit="mg/L"
              min={5}
            />
            <SensorCard
              label="Turbidity"
              value={latest.turbidity}
              unit="NTU"
            />
            <SensorCard
              label="Water Level"
              value={latest.water_level}
              unit="cm"
              min={32}
            />
          </div>
        </>
      )}

         {/* Water quality score */}
         {latest && (
         <>
            <div style={styles.sectionTitle}>Water quality score</div>
            <WaterQualityCard reading={latest} />
         </>
      )}

      {/* All sensor charts */}
      {readings.length > 0 && (
        <>
          <div style={styles.sectionTitle}>Sensor history</div>
          <ChartsSection readings={readings} />
        </>
      )}

      {/* Alerts */}
      <div style={styles.sectionTitle}>Recent alerts</div>
      <AlertsPanel alerts={alerts} />

    </div>
  )
}

export default Dashboard