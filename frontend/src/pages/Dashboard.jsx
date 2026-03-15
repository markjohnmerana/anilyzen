import { useSensorData }    from '../hooks/useSensorData'
import { useDeviceStatus }  from '../hooks/useDeviceStatus'
import Navbar               from '../components/Navbar'
import Footer               from '../components/Footer'
import SensorCard           from '../components/SensorCard'
import WaterQualityCard     from '../components/WaterQualityCard'
import ChartsSection        from '../components/ChartsSection'
import AlertsPanel          from '../components/AlertsPanel'

function Dashboard() {
  const { readings, latest, alerts, loading, error } = useSensorData(3000)
  const isOnline = useDeviceStatus(latest, 10)

  const styles = {
    page: {
      minHeight:  '100vh',
      display:    'flex',
      flexDirection: 'column',
      background: '#0f1117',
    },
    content: {
      padding:   '2rem',
      maxWidth:  '1100px',
      width:     '100%',
      margin:    '0 auto',
      flex:      1,
    },
    header: {
      marginBottom: '1.5rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid #2a3040',
    },
    headerTop: {
      display:        'flex',
      justifyContent: 'space-between',
      alignItems:     'flex-start',
      flexWrap:       'wrap',
      gap:            '0.5rem',
    },
    title: {
      fontSize:   '1.3rem',
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
      marginTop:     '2rem',
    },
    cardsRow: {
     display:             'grid',
     gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
     gap:                 '0.75rem',
     marginBottom:        '0.5rem',
    },
  }

  return (
    <div style={styles.page}>
      <Navbar isOnline={isOnline} lastSeen={latest?.timestamp} />

      <div style={styles.content}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTop}>
            <div>
              <div style={styles.title}>Pond Dashboard</div>
              <div style={styles.subtitle}>
                Device: pond-sensor-001 · Infanta, Quezon
              </div>
            </div>
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

        {/* Current readings */}
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

        {/* Water quality */}
        {latest && (
          <>
            <div style={styles.sectionTitle}>Water quality score</div>
            <WaterQualityCard reading={latest} />
          </>
        )}

        {/* Charts */}
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

      <Footer />
    </div>
  )
}

export default Dashboard
