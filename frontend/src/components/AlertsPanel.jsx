function AlertsPanel({ alerts }) {

  const styles = {
    panel: {
      background:   'var(--bg-card)',
      border:       '1px solid var(--border)',
      borderRadius: '12px',
      padding:      '1.25rem',
    },
    title: {
      fontSize:     '0.85rem',
      color:        'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '1rem',
    },
    empty: {
      color:    'var(--text-muted)',
      fontSize: '0.9rem',
    },
    item: {
      borderLeft:   '3px solid var(--danger)',
      paddingLeft:  '0.75rem',
      marginBottom: '0.75rem',
    },
    sensor: {
      fontSize:   '0.75rem',
      color:      'var(--danger)',
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    message: {
      fontSize: '0.85rem',
      color:    'var(--text-main)',
      marginTop: '2px',
    },
    time: {
      fontSize: '0.75rem',
      color:    'var(--text-muted)',
      marginTop: '2px',
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <div style={styles.panel}>
      <div style={styles.title}>Recent alerts</div>

      {alerts.length === 0 ? (
        <div style={styles.empty}>No alerts — pond is healthy</div>
      ) : (
        alerts.slice(0, 5).map((alert, i) => (
          <div key={i} style={styles.item}>
            <div style={styles.sensor}>{alert.sensor}</div>
            <div style={styles.message}>{alert.message}</div>
            <div style={styles.time}>{formatTime(alert.timestamp)}</div>
          </div>
        ))
      )}
    </div>
  )
}

export default AlertsPanel