import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Login() {
  const { signIn }                    = useAuth()
  const navigate                      = useNavigate()
  const [email,    setEmail]          = useState('')
  const [password, setPassword]       = useState('')
  const [loading,  setLoading]        = useState(false)
  const [error,    setError]          = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  const styles = {
    page: {
      minHeight:      '100vh',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      background:     '#0f1117',
      padding:        '1rem',
    },
    card: {
      background:   '#1a1f2e',
      border:       '1px solid #2a3040',
      borderRadius: '16px',
      padding:      '2rem',
      width:        '100%',
      maxWidth:     '380px',
    },
    logo: {
      fontSize:     '1.5rem',
      fontWeight:   '700',
      color:        '#e2e8f0',
      textAlign:    'center',
      marginBottom: '0.25rem',
    },
    logoAccent: {
      color: '#00c896',
    },
    subtitle: {
      fontSize:     '0.82rem',
      color:        '#8892a4',
      textAlign:    'center',
      marginBottom: '2rem',
    },
    label: {
      display:      'block',
      fontSize:     '0.78rem',
      color:        '#8892a4',
      marginBottom: '0.4rem',
    },
    input: {
      width:        '100%',
      background:   '#0f1117',
      border:       '1px solid #2a3040',
      borderRadius: '8px',
      padding:      '0.7rem 0.9rem',
      color:        '#e2e8f0',
      fontSize:     '0.88rem',
      outline:      'none',
      marginBottom: '1rem',
      boxSizing:    'border-box',
      fontFamily:   'inherit',
    },
    btn: {
      width:        '100%',
      padding:      '0.8rem',
      background:   loading ? '#2a3040' : '#00c896',
      color:        loading ? '#8892a4' : '#0f1117',
      border:       'none',
      borderRadius: '8px',
      fontSize:     '0.92rem',
      fontWeight:   '700',
      cursor:       loading ? 'not-allowed' : 'pointer',
      marginTop:    '0.5rem',
      transition:   'background 0.2s',
    },
    error: {
      background:   '#ff4d4d18',
      border:       '1px solid #ff4d4d',
      borderRadius: '8px',
      padding:      '0.65rem 0.9rem',
      color:        '#ff4d4d',
      fontSize:     '0.82rem',
      marginBottom: '1rem',
    },
    divider: {
      textAlign:    'center',
      color:        '#8892a4',
      fontSize:     '0.75rem',
      margin:       '1.5rem 0 1rem',
      borderTop:    '1px solid #2a3040',
      paddingTop:   '1rem',
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Logo */}
        <div style={styles.logo}>
          <span style={styles.logoAccent}>Ani</span>lyzen
        </div>
        <div style={styles.subtitle}>
          Crayfish pond monitoring platform
        </div>

        {/* Error */}
        {error && <div style={styles.error}>{error}</div>}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div style={styles.divider}>
          v0.1.0 · Single tenant · Private access
        </div>

      </div>
    </div>
  )
}

export default Login