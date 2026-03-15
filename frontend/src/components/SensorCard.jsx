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
      border:       `1px solid ${status === 'danger' ? '#ff4d4d' : '#2a3040'}`,
      borderRadius: '12px',
      padding:      '1rem',
      //flex:         '1 1 calc(50% - 0.75rem)',
      //minWidth:     '140px'
      minWidth:     '100%'
    },
    label: {
      fontSize:      '0.72rem',
      color:         '#8892a4',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom:  '0.5rem',
    },
    valueRow: {
      display:    'flex',
      alignItems: 'baseline',
      gap:        '4px',
    },
    value: {
     fontSize:   '1.6rem',    // was 2rem
     fontWeight: '700',
     color:      status === 'danger' ? '#ff4d4d' : '#00c896',
     lineHeight: 1,
    },
    unit: {
      fontSize: '0.85rem',
      color:    '#8892a4',
    },
    badge: {
      display:      'inline-block',
      marginTop:    '0.5rem',
      fontSize:     '0.7rem',
      padding:      '2px 8px',
      borderRadius: '99px',
      background:   status === 'danger' ? '#ff4d4d22' : '#00c89622',
      color:        status === 'danger' ? '#ff4d4d'   : '#00c896',
    }
  }

  return (
    <div style={styles.card}>
      <div style={styles.label}>{label}</div>
      <div style={styles.valueRow}>
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