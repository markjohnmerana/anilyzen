function Footer() {
  const styles = {
    footer: {
      borderTop:  '1px solid #2a3040',
      padding:    '1.5rem 2rem',
      marginTop:  '3rem',
      display:    'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap:   'wrap',
      gap:        '0.5rem',
    },
    left: {
      fontSize: '0.78rem',
      color:    '#8892a4',
    },
    right: {
      fontSize: '0.78rem',
      color:    '#8892a4',
    },
    accent: {
      color: '#00c896',
    }
  }

  return (
    <footer style={styles.footer}>
      <div style={styles.left}>
        <span style={styles.accent}>Ani</span>Lyzen — Crayfish Pond Monitoring & Analytics
      </div>
      <div style={styles.right}>
        Built with FastAPI · Supabase · React · v0.1.0
      </div>
    </footer>
  )
}

export default Footer