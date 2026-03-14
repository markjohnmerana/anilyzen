function SensorCard({ label, value, unit, min, max, decimals = 2 }) {

  const getStatus = () => {
    if (value === null || value === undefined) return 'neutral'
    if (min !== undefined && value < min) return 'danger'
    if (max !== undefined && value > max) return 'danger'
    return 'ok'
  }

  const status = getStatus()

  const styles = {
    card: {
      background:   'var(--bg-card)',
      border:       `1px solid ${status === 'danger' ? 'var(--danger)' : 'var(--border)'}`,
      borderRadius: '12px',
      padding:      '1.25rem',
      minWidth:     '160px',
      flex:         '1',
    },
    label: {
      fontSize:   '0.75rem',
      color:      'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '0.5rem',
    },
    value: {
      fontSize:   '2rem',
      fontWeight: '700',
      color:      status === 'danger' ? 'var(--danger)' : 'var(--primary)',
    },
    unit: {
      fontSize: '0.9rem',
      color:    'var(--text-muted)',
      marginLeft: '4px',
    },
    badge: {
      display:      'inline-block',
      marginTop:    '0.5rem',
      fontSize:     '0.7rem',
      padding:      '2px 8px',
      borderRadius: '99px',
      background:   status === 'danger' ? '#ff4d4d22' : '#00c89622',
      color:        status === 'danger' ? 'var(--danger)' : 'var(--primary)',
    }
  }

  return (
    <div style={styles.card}>
      <div style={styles.label}>{label}</div>
      <div>
        <span style={styles.value}>
          {value !== null && value !== undefined
            ? Number(value).toFixed(decimals)
            : '—'}
        </span>
        <span style={styles.unit}>{unit}</span>
      </div>
      <div style={styles.badge}>
        {status === 'danger' ? 'Out of range' : 'Normal'}
      </div>
    </div>
  )
}

export default SensorCard