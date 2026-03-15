function SensorCard({ label, value, prevValue, unit, min, max, decimals = 2 }) {

  const getStatus = () => {
    if (value === null || value === undefined) return 'neutral'
    if (min !== undefined && value < min) return 'danger'
    if (max !== undefined && value > max) return 'danger'
    return 'ok'
  }

  const status = getStatus()
  const color  = status === 'danger' ? '#ff4d4d' : '#00c896'

  // Mini bar percentage
  const getBarPct = () => {
    if (value === null || value === undefined) return 0
    if (min !== undefined && max !== undefined) {
      return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
    }
    if (max !== undefined) return Math.min(100, (value / max) * 100)
    if (min !== undefined) return Math.min(100, (value / (min * 2)) * 100)
    return 50
  }

  // Delta from previous reading
  const getDelta = () => {
    if (prevValue === null || prevValue === undefined) return null
    if (value === null || value === undefined) return null
    const diff = Number(value) - Number(prevValue)
    if (Math.abs(diff) < 0.01) return { text: '→ stable', color: '#8892a4' }
    if (diff > 0) return { text: `↑ +${diff.toFixed(2)}`, color: status === 'danger' ? '#ff4d4d' : '#00c896' }
    return { text: `↓ ${diff.toFixed(2)}`, color: status === 'danger' ? '#ff4d4d' : '#00c896' }
  }

  const delta = getDelta()
  const pct   = getBarPct()

  return (
    <div style={{
      background:   '#1a1f2e',
      border:       `1px solid ${status === 'danger' ? '#ff4d4d' : '#2a3040'}`,
      borderRadius: '12px',
      padding:      '1rem',
      flex:         '1 1 0',
      minWidth:     '0',
    }}>
      <div style={{fontSize:'0.68rem',color:'#8892a4',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'6px'}}>
        {label}
      </div>
      <div style={{display:'flex',alignItems:'baseline',gap:'3px'}}>
        <span style={{fontSize:'1.5rem',fontWeight:'700',color,lineHeight:1}}>
          {value !== null && value !== undefined ? Number(value).toFixed(decimals) : '—'}
        </span>
        <span style={{fontSize:'0.78rem',color:'#8892a4'}}>{unit}</span>
      </div>
      {/* Mini trend bar */}
      <div style={{height:'3px',background:'#2a3040',borderRadius:'99px',marginTop:'8px',overflow:'hidden'}}>
        <div style={{height:'100%',width:`${pct}%`,background:color,borderRadius:'99px',transition:'width 0.5s ease'}}/>
      </div>
      {/* Delta */}
      {delta && (
        <div style={{fontSize:'0.68rem',color:delta.color,marginTop:'5px'}}>{delta.text}</div>
      )}
    </div>
  )
}

export default SensorCard