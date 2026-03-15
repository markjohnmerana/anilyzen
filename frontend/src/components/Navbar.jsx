import { useState } from 'react'
import { useAuth }  from '../hooks/useAuth'

function Navbar({ isOnline, lastSeen }) {
  const { user, signOut }     = useAuth()
  const [dropdown, setDropdown] = useState(false)

  const getInitial = () => {
    if (!user?.email) return '?'
    return user.email[0].toUpperCase()
  }

  const handleSignOut = async () => {
    setDropdown(false)
    await signOut()
  }

  const styles = {
    nav: {
    background:          '#141820',
    borderBottom:        '1px solid #2a3040',
    padding:             '0 1.5rem',
    height:              '56px',
    display:             'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems:          'center',
    position:            'sticky',
    top:                 0,
    zIndex:              100,
    },
    left: {
      display:    'flex',
      alignItems: 'center',
      gap:        '0.6rem',
    },
    logo: {
      fontSize:      '1.1rem',
      fontWeight:    '700',
      color:         '#e2e8f0',
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
    center: {
      display:    'flex',
      alignItems: 'center',
      gap:        '0.5rem',
    },
    dot: {
      width:        '8px',
      height:       '8px',
      borderRadius: '50%',
      background:   isOnline ? '#00c896' : '#ff4d4d',
      boxShadow:    isOnline ? '0 0 6px #00c89688' : 'none',
      animation:    isOnline ? 'pulse 2s infinite' : 'none',
    },
    status: {
      fontSize: '0.75rem',
      color:    isOnline ? '#00c896' : '#ff4d4d',
    },
    lastSeen: {
      fontSize: '0.72rem',
      color:    '#8892a4',
    },
    right: {
      position: 'relative',
      justifySelf: 'end',
    },
    avatar: {
      width:          '32px',
      height:         '32px',
      borderRadius:   '50%',
      background:     '#00c896',
      color:          '#0f1117',
      fontSize:       '0.82rem',
      fontWeight:     '700',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      cursor:         'pointer',
      border:         '2px solid transparent',
      transition:     'border-color 0.2s',
      userSelect:     'none',
    },
    avatarActive: {
      borderColor: '#00c896',
    },
    dropdown: {
      position:     'absolute',
      top:          '42px',
      right:        0,
      background:   '#1a1f2e',
      border:       '1px solid #2a3040',
      borderRadius: '10px',
      minWidth:     '200px',
      overflow:     'hidden',
      boxShadow:    '0 8px 24px #00000066',
      zIndex:       200,
    },
    dropHeader: {
      padding:      '0.75rem 1rem',
      borderBottom: '1px solid #2a3040',
    },
    dropEmail: {
      fontSize:  '0.78rem',
      color:     '#e2e8f0',
      fontWeight: '500',
    },
    dropRole: {
      fontSize:  '0.7rem',
      color:     '#8892a4',
      marginTop: '2px',
    },
    dropItem: {
      padding:    '0.65rem 1rem',
      fontSize:   '0.82rem',
      color:      '#8892a4',
      cursor:     'pointer',
      transition: 'background 0.15s',
      display:    'flex',
      alignItems: 'center',
      gap:        '0.5rem',
    },
    signOutItem: {
      padding:      '0.65rem 1rem',
      fontSize:     '0.82rem',
      color:        '#ff4d4d',
      cursor:       'pointer',
      borderTop:    '1px solid #2a3040',
      display:      'flex',
      alignItems:   'center',
      gap:          '0.5rem',
      transition:   'background 0.15s',
    },
  }

  return (
    <nav style={styles.nav}>
      {/* Left — logo */}
      <div style={styles.left}>
        <div style={styles.logo}>
          <span style={styles.logoAccent}>Ani</span>Lyzen
        </div>
        <span style={styles.version}>v0.1.5</span>
      </div>

      {/* Center — device status */}
      <div style={styles.center}>
        <div style={styles.dot}></div>
        <span style={styles.status}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
        {lastSeen && (
          <span style={styles.lastSeen}>
            · {new Date(lastSeen).toLocaleTimeString()}
          </span>
        )}
      </div>

      {/* Right — avatar + dropdown */}
      <div style={styles.right}>
        <div
          style={{
            ...styles.avatar,
            ...(dropdown ? styles.avatarActive : {})
          }}
          onClick={() => setDropdown(d => !d)}
        >
          {getInitial()}
        </div>

        {dropdown && (
          <>
            {/* Backdrop to close dropdown */}
            <div
              style={{
                position: 'fixed',
                inset:    0,
                zIndex:   199,
              }}
              onClick={() => setDropdown(false)}
            />

            <div style={styles.dropdown}>
              {/* User info */}
              <div style={styles.dropHeader}>
                <div style={styles.dropEmail}>{user?.email}</div>
                <div style={styles.dropRole}>Pond Administrator</div>
              </div>

              {/* Menu items */}
              <div
                style={styles.dropItem}
                onMouseEnter={e => e.currentTarget.style.background = '#2a3040'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                🦞 pond-sensor-001
              </div>

              {/* Sign out */}
              <div
                style={styles.signOutItem}
                onClick={handleSignOut}
                onMouseEnter={e => e.currentTarget.style.background = '#ff4d4d18'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                Sign out
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar