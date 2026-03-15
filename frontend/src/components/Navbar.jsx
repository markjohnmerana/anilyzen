function Navbar({ isOnline, lastSeen }) {

  const styles = {
    nav: {
      background:     '#141820',
      borderBottom:   '1px solid #2a3040',
      padding:        '0 2rem',
      height:         '56px',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      position:       'sticky',
      top:            0,
      zIndex:         100,
    },
    left: {
      display:    'flex',
      alignItems: 'center',
      gap:        '0.6rem',
    },
    logo: {
      fontSize:   '1.1rem',
      fontWeight: '700',
      color:      '#e2e8f0',
      letterSpacing: '-0.02em',
    },
    logoAccent: {
      color: '#00c896',
    },
    version: {
      fontSize:     '0.65rem',
      color:        '#8892a4',
      background:   '#2a3040',
      padding:      '2px 6px',
      borderRadius: '4px',
    },
    right: {
      display:    'flex',
      alignItems: 'center',
      gap:        '0.5rem',
    },
    dot: {
      width:        '8px',
      height:       '8px',
      borderRadius: '50%',
      background:   isOnline ? '#00c896' : '#ff4d4d',
      boxShadow:    isOnline ? '0 0 6px #00c896' : 'none',
      animation:    isOnline ? 'pulse 2s infinite' : 'none',
    },
    status: {
      fontSize: '0.78rem',
      color:    isOnline ? '#00c896' : '#ff4d4d',
    },
    lastSeen: {
      fontSize: '0.72rem',
      color:    '#8892a4',
    }
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <div style={styles.logo}>
          <span style={styles.logoAccent}>Ani</span>Lyzen
        </div>
        <span style={styles.version}>v0.1.0</span>
      </div>

      <div style={styles.right}>
        <div style={styles.dot}></div>
        <span style={styles.status}>
          {isOnline ? 'Device online' : 'Device offline'}
        </span>
        {lastSeen && (
          <span style={styles.lastSeen}>
            · {new Date(lastSeen).toLocaleTimeString()}
          </span>
        )}
      </div>
    </nav>
  )
}

export default Navbar