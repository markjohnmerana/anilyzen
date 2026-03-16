import { useNavigate } from 'react-router-dom'

const FEATURES = [
  {
    icon: 'M3 12 C6 8 9 16 12 12 C15 8 18 16 21 12 M3 17 C6 13 9 21 12 17 C15 13 18 21 21 17',
    title: 'Real-time monitoring',
    desc:  'Live sensor readings every 3 seconds — temperature, pH, oxygen, turbidity, water level.',
  },
  {
    icon: 'M12 2L15 9H22L16 13L18 20L12 16L6 20L8 13L2 9H9Z',
    title: 'AI pond insights',
    desc:  'Gemini-powered health analysis, trend prediction, and actionable recommendations.',
  },
  {
    icon: 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z',
    title: 'Smart alerts',
    desc:  'Instant email notifications when any sensor goes out of safe range.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10',
    title: 'Analytics dashboard',
    desc:  'Historical charts, water quality score, and trend analysis all in one place.',
  },
  {
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    title: 'AI chat assistant',
    desc:  'Ask anything about your pond — the AI always knows your live sensor readings.',
  },
  {
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    title: 'Secure access',
    desc:  'Private dashboard protected by Supabase Auth — your pond data stays yours.',
  },
]

function OceanWaves() {
  return (
    <div style={{position:'absolute',bottom:0,left:0,right:0,overflow:'hidden',height:'120px'}}>
      <style>{`
        @keyframes wl1{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes wl2{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
        @keyframes wbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      `}</style>
      <div style={{position:'absolute',bottom:'40px',left:0,width:'200%',animation:'wl2 12s linear infinite'}}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{width:'100%',height:'60px'}}>
          <path d="M0,30 C180,55 360,5 540,30 C720,55 900,5 1080,30 C1260,55 1440,5 1440,30 L1440,60 L0,60 Z" fill="#0a2540" opacity="0.7"/>
        </svg>
      </div>
      <div style={{position:'absolute',bottom:0,left:0,width:'200%',animation:'wl1 7s linear infinite'}}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{width:'100%',height:'60px'}}>
          <path d="M0,20 C90,40 180,0 270,20 C360,40 450,0 540,20 C630,40 720,0 810,20 C900,40 990,0 1080,20 C1170,40 1260,0 1350,20 L1440,20 L1440,60 L0,60 Z" fill="#071a2e"/>
        </svg>
      </div>
      <div style={{position:'absolute',bottom:'45px',right:'12%',animation:'wbob 3s ease-in-out infinite'}}>
        <svg width="44" height="30" viewBox="0 0 48 32" fill="none">
          <ellipse cx="24" cy="18" rx="10" ry="6" fill="#00c896" opacity="0.6"/>
          <ellipse cx="34" cy="16" rx="5" ry="4" fill="#00c896" opacity="0.6"/>
          <path d="M14,18 L8,14 M14,18 L7,18 M14,18 L8,22" stroke="#00c896" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
          <path d="M36,13 L42,9 M42,9 L44,7 M42,9 L40,7" stroke="#00c896" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
          <path d="M36,19 L42,23 M42,23 L44,25 M42,23 L40,25" stroke="#00c896" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
          <circle cx="35" cy="15" r="1" fill="#0f1117"/>
        </svg>
      </div>
    </div>
  )
}

function Landing() {
  const navigate = useNavigate()

  const s = {
    page:    { background:'#050e1a', color:'#e2e8f0', fontFamily:'-apple-system,sans-serif', minHeight:'100vh' },
    nav:     { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem 2rem', borderBottom:'1px solid #2a3040' },
    logo:    { fontSize:'1.1rem', fontWeight:'700', color:'#e2e8f0' },
    accent:  { color:'#00c896' },
    version: { fontSize:'0.65rem', background:'#2a3040', color:'#8892a4', padding:'2px 6px', borderRadius:'4px', marginLeft:'6px' },
    navLinks:{ display:'flex', gap:'0.5rem', alignItems:'center' },
    navLink: { fontSize:'0.82rem', color:'#8892a4', textDecoration:'none', padding:'0.4rem 0.75rem', cursor:'pointer', background:'none', border:'none' },
    signBtn: { fontSize:'0.82rem', background:'#00c896', color:'#0f1117', padding:'0.4rem 1rem', borderRadius:'8px', fontWeight:'600', cursor:'pointer', border:'none' },
    hero:    { position:'relative', minHeight:'480px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'4rem 2rem 8rem', overflow:'hidden', background:'linear-gradient(180deg,#050e1a 0%,#071a2e 60%,#0a2540 100%)' },
    badge:   { display:'inline-block', background:'#00c89618', border:'1px solid #00c89644', color:'#00c896', fontSize:'0.72rem', padding:'4px 14px', borderRadius:'99px', marginBottom:'1.25rem' },
    h1:      { fontSize:'2.8rem', fontWeight:'700', lineHeight:1.15, margin:'0 0 1.25rem', color:'#e2e8f0' },
    h1green: { color:'#00c896' },
    heroSub: { fontSize:'1rem', color:'#8892a4', maxWidth:'500px', margin:'0 auto 2rem', lineHeight:1.7 },
    btnRow:  { display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap' },
    btnPri:  { background:'#00c896', color:'#0f1117', padding:'0.8rem 1.75rem', borderRadius:'10px', fontWeight:'700', fontSize:'0.92rem', cursor:'pointer', border:'none' },
    btnSec:  { background:'transparent', color:'#e2e8f0', padding:'0.8rem 1.75rem', borderRadius:'10px', fontWeight:'600', fontSize:'0.92rem', cursor:'pointer', border:'1px solid #2a3040' },
    features:{ padding:'4rem 2rem', background:'#071a2e' },
    featHead:{ textAlign:'center', marginBottom:'2.5rem' },
    featSub: { fontSize:'0.72rem', color:'#8892a4', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' },
    featTitle:{ fontSize:'1.4rem', fontWeight:'700', color:'#e2e8f0' },
    grid:    { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1rem', maxWidth:'960px', margin:'0 auto' },
    fcard:   { background:'#1a1f2e', border:'1px solid #2a3040', borderRadius:'12px', padding:'1.25rem' },
    ficon:   { width:'38px', height:'38px', background:'#00c89618', border:'1px solid #00c89630', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'0.75rem' },
    ftitle:  { fontSize:'0.9rem', fontWeight:'600', color:'#e2e8f0', marginBottom:'4px' },
    fdesc:   { fontSize:'0.78rem', color:'#8892a4', lineHeight:1.6 },
    cta:     { padding:'4rem 2rem', textAlign:'center', background:'#050e1a', borderTop:'1px solid #2a3040' },
    ctaTitle:{ fontSize:'1.4rem', fontWeight:'700', color:'#e2e8f0', marginBottom:'0.5rem' },
    ctaSub:  { fontSize:'0.88rem', color:'#8892a4', marginBottom:'1.75rem' },
    stats:   { display:'flex', justifyContent:'center', gap:'3rem', flexWrap:'wrap', padding:'2rem', background:'#0a1628', borderTop:'1px solid #2a3040', borderBottom:'1px solid #2a3040' },
    stat:    { textAlign:'center' },
    statVal: { fontSize:'1.8rem', fontWeight:'700', color:'#00c896' },
    statLbl: { fontSize:'0.75rem', color:'#8892a4', marginTop:'2px' },
    footer:  { padding:'1.25rem 2rem', borderTop:'1px solid #2a3040', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'0.5rem' },
    footL:   { fontSize:'0.78rem', color:'#8892a4' },
    footR:   { fontSize:'0.72rem', color:'#8892a4' },
  }

  return (
    <div style={s.page}>

      {/* Navbar */}
      <nav style={s.nav}>
        <div style={s.logo}>
          <span style={s.accent}>Ani</span>Lyzen
          <span style={s.version}>v0.1.5</span>
        </div>
        <div style={s.navLinks}>
          <a href="#features" style={s.navLink}>Features</a>
          <a href="#about" style={s.navLink}>About</a>
          <button style={s.signBtn} onClick={() => navigate('/login')}>
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={s.hero}>
        <div style={{position:'relative',zIndex:2}}>
          <div style={s.badge}>Real-time IoT monitoring for aquaculture</div>
          <h1 style={s.h1}>
            Monitor your pond.<br/>
            <span style={s.h1green}>Protect your crayfish.</span>
          </h1>
          <p style={s.heroSub}>
            <span style={{color:'#00c896'}}>Ani</span> means harvest in Filipino, Lyze from analyze used in data analytics. <span style={{color:'#00c896'}}>Ani</span>Lyzen gives you real-time sensor data, AI-powered health analysis,
            and instant alerts — so your crayfish pond stays healthy 24/7.
          </p>
          <div style={s.btnRow}>
            <button style={s.btnPri} onClick={() => navigate('/login')}>
              Get started
            </button>
            <button style={s.btnSec} onClick={() => navigate('/login')}>
              View dashboard
            </button>
          </div>
        </div>
        <OceanWaves />
      </section>

      {/* Stats */}
      <div style={s.stats}>
        {[
          { val: '5',    lbl: 'Sensors monitored' },
          { val: '24/7', lbl: 'Real-time monitoring' },
          { val: 'AI',   lbl: 'Gemini-powered insights' },
          { val: '₱0',   lbl: 'Infrastructure cost' },
        ].map((st, i) => (
          <div key={i} style={s.stat}>
            <div style={s.statVal}>{st.val}</div>
            <div style={s.statLbl}>{st.lbl}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <section id="features" style={s.features}>
        <div style={s.featHead}>
          <div style={s.featSub}>Features</div>
          <div style={s.featTitle}>Everything you need to monitor your pond</div>
        </div>
        <div style={s.grid}>
          {FEATURES.map((f, i) => (
            <div key={i} style={s.fcard}>
              <div style={s.ficon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00c896" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={f.icon}/>
                </svg>
              </div>
              <div style={s.ftitle}>{f.title}</div>
              <div style={s.fdesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={{padding:'4rem 2rem',background:'#0a1628',textAlign:'center',borderTop:'1px solid #2a3040'}}>
        <div style={{maxWidth:'600px',margin:'0 auto'}}>
          <div style={{fontSize:'0.72rem',color:'#8892a4',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>About</div>
          <div style={{fontSize:'1.3rem',fontWeight:'700',color:'#e2e8f0',marginBottom:'1rem'}}>
            Built for crayfish farmers
          </div>
          <p style={{fontSize:'0.9rem',color:'#8892a4',lineHeight:1.8,marginBottom:'1.5rem'}}>
             <strong style={{color:'#00c896'}}>Ani</strong> is the Filipino word for harvest.
             <strong style={{color:'#00c896'}}> Lyze</strong> comes from analyze — the data analytics behind every reading. AniLyzen was built from scratch as a real-world IoT monitoring solution for my hobby, a freshwater crayfish aquaculture in Infanta, Quezon Philippines.
          </p>
          <div style={{display:'flex',gap:'0.75rem',justifyContent:'center',flexWrap:'wrap'}}>
            {['FastAPI','Supabase','React','Gemini AI','Railway','Vercel'].map((t,i) => (
              <span key={i} style={{background:'#1a1f2e',border:'1px solid #2a3040',color:'#8892a4',fontSize:'0.75rem',padding:'4px 12px',borderRadius:'99px'}}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={s.cta}>
        <div style={s.ctaTitle}>Ready to monitor your pond?</div>
        <div style={s.ctaSub}>Sign in to your AniLyzen dashboard</div>
        <button style={s.btnPri} onClick={() => navigate('/login')}>
          Sign in to dashboard
        </button>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.footL}>
          <span style={{color:'#00c896'}}>Ani</span>Lyzen · Crayfish pond monitoring · Infanta, Quezon
        </div>
        <div style={s.footR}>
          Built with FastAPI · Supabase · React · Gemini AI 🦞
        </div>
      </footer>

    </div>
  )
}

export default Landing