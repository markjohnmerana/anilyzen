import { useSensorData } from '../hooks/useSensorData'
import ChartsSection     from '../components/ChartsSection'
import AlertsPanel       from '../components/AlertsPanel'

function History() {
  const { readings, alerts, loading } = useSensorData(3000)

  const styles = {
    page: {
      padding:       '1.5rem',
      maxWidth:      '1100px',
      margin:        '0 auto',
      paddingBottom: '5rem',
    },
    title: {
      fontSize:     '1.2rem',
      fontWeight:   '700',
      color:        '#e2e8f0',
      marginBottom: '3px',
    },
    subtitle: {
      fontSize:     '0.82rem',
      color:        '#8892a4',
      marginBottom: '1.5rem',
    },
    sectionTitle: {
      fontSize:      '0.72rem',
      color:         '#8892a4',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom:  '0.75rem',
      marginTop:     '1.5rem',
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.title}>Sensor History</div>
      <div style={styles.subtitle}>Last 20 readings per sensor</div>

      {loading && (
        <div style={{ color: '#8892a4', fontSize: '0.9rem' }}>
          Loading history...
        </div>
      )}

      {readings.length > 0 && (
        <>
          <div style={styles.sectionTitle}>Sensor charts</div>
          <ChartsSection readings={readings} />
        </>
      )}

      <div style={styles.sectionTitle}>Recent alerts</div>
      <AlertsPanel alerts={alerts} />
    </div>
  )
}

export default History