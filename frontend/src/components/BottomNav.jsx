import { useLocation, useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  {
    route: '/dashboard',
    label: 'Overview',
    icon:  (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#00c896' : '#8892a4'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
      </svg>
    )
  },
  {
    route: '/ai',
    label: 'AI Insights',
    icon:  (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#00c896' : '#8892a4'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    )
  },
  {
    route: '/history',
    label: 'History',
    icon:  (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#00c896' : '#8892a4'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    )
  },
]

function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const styles = {
    nav: {
      position:       'fixed',
      bottom:         0,
      left:           0,
      right:          0,
      height:         '60px',
      background:     '#141820',
      borderTop:      '1px solid #2a3040',
      display:        'flex',
      justifyContent: 'space-around',
      alignItems:     'center',
      zIndex:         100,
    },
    item: (active) => ({
      display:       'flex',
      flexDirection: 'column',
      alignItems:    'center',
      gap:           '3px',
      cursor:        'pointer',
      padding:       '0.5rem 1.5rem',
      borderRadius:  '8px',
      background:    active ? '#00c89615' : 'transparent',
      transition:    'background 0.2s',
    }),
    label: (active) => ({
      fontSize:   '0.65rem',
      color:      active ? '#00c896' : '#8892a4',
      fontWeight: active ? '600' : '400',
    })
  }

  return (
    <nav style={styles.nav}>
      {NAV_ITEMS.map(item => {
        const active = location.pathname === item.route
        return (
          <div
            key={item.route}
            style={styles.item(active)}
            onClick={() => navigate(item.route)}
          >
            {item.icon(active)}
            <span style={styles.label(active)}>{item.label}</span>
          </div>
        )
      })}
    </nav>
  )
}

export default BottomNav