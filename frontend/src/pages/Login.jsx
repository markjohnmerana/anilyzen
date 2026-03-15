import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function OceanBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset:    0,
      zIndex:   0,
      overflow: 'hidden',
      background: 'linear-gradient(180deg,#050e1a 0%,#071a2e 40%,#0a2540 70%,#0d3055 100%)',
    }}>
      <style>{`
        @keyframes wave1 { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes wave2 { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes wave3 { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
        @keyframes bob   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes bubble{ 0%{transform:translateY(0);opacity:.6} 100%{transform:translateY(-120px);opacity:0} }
        @keyframes glow  { 0%,100%{opacity:.4} 50%{opacity:.8} }
      `}</style>

      {/* Caustic glow */}
      <div style={{position:'absolute',top:'20%',left:'10%',width:'80%',height:'300px',background:'radial-gradient(ellipse,#00c89608 0%,transparent 70%)',animation:'glow 3s ease-in-out infinite'}}/>
      <div style={{position:'absolute',top:'40%',left:'30%',width:'40%',height:'150px',background:'radial-gradient(ellipse,#00c89605 0%,transparent 70%)',animation:'glow 4s ease-in-out infinite .5s'}}/>

      {/* Wave 3 — deep */}
      <div style={{position:'absolute',bottom:'80px',left:0,width:'200%',animation:'wave3 14s linear infinite'}}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{width:'100%',height:'80px'}}>
          <path d="M0,40 C180,70 360,10 540,40 C720,70 900,10 1080,40 C1260,70 1440,10 1440,40 L1440,80 L0,80 Z" fill="#0a2540" opacity="0.8"/>
        </svg>
      </div>

      {/* Wave 2 — mid */}
      <div style={{position:'absolute',bottom:'40px',left:0,width:'200%',animation:'wave2 9s linear infinite'}}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{width:'100%',height:'80px'}}>
          <path d="M0,30 C120,55 240,5 360,30 C480,55 600,5 720,30 C840,55 960,5 1080,30 C1200,55 1320,5 1440,30 L1440,80 L0,80 Z" fill="#0d3055" opacity="0.9"/>
        </svg>
      </div>

      {/* Wave 1 — surface */}
      <div style={{position:'absolute',bottom:0,left:0,width:'200%',animation:'wave1 6s linear infinite'}}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{width:'100%',height:'80px'}}>
          <path d="M0,20 C90,40 180,0 270,20 C360,40 450,0 540,20 C630,40 720,0 810,20 C900,40 990,0 1080,20 C1170,40 1260,0 1350,20 C1380,28 1410,14 1440,20 L1440,80 L0,80 Z" fill="#0f1117"/>
        </svg>
      </div>

      {/* Bubbles */}
      {[
        {left:'15%', delay:'0s',   size:6},
        {left:'28%', delay:'1.5s', size:4},
        {left:'45%', delay:'0.5s', size:5},
        {left:'62%', delay:'2s',   size:4},
        {left:'75%', delay:'1s',   size:6},
        {left:'88%', delay:'2.5s', size:4},
      ].map((b, i) => (
        <div key={i} style={{
          position:     'absolute',
          bottom:       '100px',
          left:         b.left,
          width:        `${b.size}px`,
          height:       `${b.size}px`,
          borderRadius: '50%',
          border:       '1px solid #00c89644',
          animation:    `bubble ${3.5 + i * 0.4}s ease-in infinite ${b.delay}`,
        }}/>
      ))}

      {/* Crayfish */}
      <div style={{position:'absolute',bottom:'95px',left:'50%',transform:'translateX(-50%)',animation:'bob 3s ease-in-out infinite'}}>
        <svg width="56" height="36" viewBox="0 0 56 36" fill="none">
          <ellipse cx="28" cy="20" rx="11" ry="6" fill="#00c896" opacity="0.7"/>
          <ellipse cx="39" cy="18" rx="5" ry="4" fill="#00c896" opacity="0.7"/>
          <path d="M17,20 L10,15 M17,20 L9,20 M17,20 L10,25" stroke="#00c896" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
          <path d="M41,14 L48,9 M48,9 L51,7 M48,9 L46,7" stroke="#00c896" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
          <path d="M41,22 L48,27 M48,27 L51,29 M48,27 L46,29" stroke="#00c896" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
          <path d="M24,25 L22,32 M27,26 L26,33 M30,26 L30,33 M33,25 L34,32" stroke="#00c896" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
          <path d="M42,14 L52,7 M42,13 L54,11" stroke="#00c896" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
          <circle cx="41" cy="16" r="1.5" fill="#0f1117"/>
          <circle cx="41" cy="16" r="0.7" fill="#00c896"/>
        </svg>
      </div>

      {/* Seaweed left */}
      <svg style={{position:'absolute',bottom:0,left:'6%'}} width="32" height="120" viewBox="0 0 32 120">
        <path d="M16,120 C16,95 5,82 16,65 C27,48 5,35 16,15" stroke="#00c896" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4"/>
        <path d="M22,120 C22,100 10,88 22,70 C34,52 10,40 22,22" stroke="#00c896" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.25"/>
      </svg>

      {/* Seaweed right */}
      <svg style={{position:'absolute',bottom:0,right:'8%'}} width="32" height="100" viewBox="0 0 32 100">
        <path d="M16,100 C16,78 5,65 16,48 C27,31 5,18 16,0" stroke="#00c896" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.35"/>
      </svg>

      {/* Seaweed far right */}
      <svg style={{position:'absolute',bottom:0,right:'20%'}} width="24" height="80" viewBox="0 0 24 80">
        <path d="M12,80 C12,62 4,52 12,38 C20,24 4,14 12,0" stroke="#00c896" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.2"/>
      </svg>
    </div>
  )
}

function Login() {
  const { signIn, user, loading }   = useAuth()
  const navigate                    = useNavigate()
  const [email,    setEmail]        = useState('')
  const [password, setPassword]     = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error,    setError]        = useState(null)

  if (loading) {
    return (
      <div style={{
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        background:     '#050e1a',
        color:          '#8892a4',
        fontSize:       '0.9rem',
      }}>
        Loading...
      </div>
    )
  }

  if (user) return <Navigate to="/dashboard" replace />

  const handleLogin = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error } = await signIn(email, password)
    if (error) {
      setError(error.message)
      setSubmitting(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display:   'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position:  'relative',
      padding:   '1rem',
    }}>
      <OceanBackground />

      {/* Login card */}
      <div style={{
        position:     'relative',
        zIndex:       1,
        background:   'rgba(26,31,46,0.92)',
        border:       '1px solid #2a3040',
        borderRadius: '16px',
        padding:      '2rem',
        width:        '100%',
        maxWidth:     '380px',
        backdropFilter: 'blur(8px)',
      }}>
        {/* Logo */}
        <div style={{fontSize:'1.5rem',fontWeight:'700',color:'#e2e8f0',textAlign:'center',marginBottom:'0.25rem'}}>
          <span style={{color:'#00c896'}}>Ani</span>lyzen
        </div>
        <div style={{fontSize:'0.82rem',color:'#8892a4',textAlign:'center',marginBottom:'2rem'}}>
          Crayfish pond monitoring platform
        </div>

        {/* Error */}
        {error && (
          <div style={{background:'#ff4d4d18',border:'1px solid #ff4d4d',borderRadius:'8px',padding:'0.65rem 0.9rem',color:'#ff4d4d',fontSize:'0.82rem',marginBottom:'1rem'}}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <label style={{display:'block',fontSize:'0.78rem',color:'#8892a4',marginBottom:'0.4rem'}}>
            Email
          </label>
          <input
            style={{width:'100%',background:'#0f1117',border:'1px solid #2a3040',borderRadius:'8px',padding:'0.7rem 0.9rem',color:'#e2e8f0',fontSize:'0.88rem',outline:'none',marginBottom:'1rem',boxSizing:'border-box',fontFamily:'inherit'}}
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label style={{display:'block',fontSize:'0.78rem',color:'#8892a4',marginBottom:'0.4rem'}}>
            Password
          </label>
          <input
            style={{width:'100%',background:'#0f1117',border:'1px solid #2a3040',borderRadius:'8px',padding:'0.7rem 0.9rem',color:'#e2e8f0',fontSize:'0.88rem',outline:'none',marginBottom:'1.25rem',boxSizing:'border-box',fontFamily:'inherit'}}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button
            style={{width:'100%',padding:'0.8rem',background:submitting?'#2a3040':'#00c896',color:submitting?'#8892a4':'#0f1117',border:'none',borderRadius:'8px',fontSize:'0.92rem',fontWeight:'700',cursor:submitting?'not-allowed':'pointer',transition:'background 0.2s'}}
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div style={{textAlign:'center',color:'#8892a4',fontSize:'0.72rem',marginTop:'1.5rem',borderTop:'1px solid #2a3040',paddingTop:'1rem'}}>
          v0.1.0 · Private access
        </div>
      </div>
    </div>
  )
}

export default Login