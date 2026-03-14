import { useSensorData } from '../hooks/useSensorData'
import SensorCard from '../components/SensorCard'
import AlertsPanel from '../components/AlertsPanel'

function Dashboard() {
  const { latest, alerts, loading, error } = useSensorData(3000)

  const styles = {
    page: {
      padding:   '2rem',
      maxWidth:  '1100px',
      margin:    '0 auto',
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
      display:  'flex',
      flexWrap: 'wrap',
      gap:      '1rem',
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
      fontSize: '0.75rem',
      color:    'var(--text-muted)',
      marginBottom: '1rem',
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

      {/* Error state */}
      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div style={{ color: 'var(--text-muted)' }}>
          Loading sensor data...
        </div>
      )}

      {/* Latest timestamp */}
      {latest && (
        <div style={styles.timestamp}>
          Last reading: {new Date(latest.timestamp).toLocaleString()}
        </div>
      )}

      {/* Sensor cards */}
      {latest && (
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
      )}

      {/* Alerts panel */}
      <AlertsPanel alerts={alerts} />

    </div>
  )
}

export default Dashboard