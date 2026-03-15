import { calculateWaterQuality } from '../utils/waterQuality'
import { useSensorData }   from '../hooks/useSensorData'
import SensorCard          from '../components/SensorCard'
import WaterQualityCard    from '../components/WaterQualityCard'
import { useSensor } from '../context/SensorContext'

function Dashboard() {
  const { readings, latest, alerts, loading, error } = useSensor()

  const previous = readings.length > 1 ? readings[1] : null

  // Real quality score from latest reading
  const qualityResult = calculateWaterQuality(latest)
  const qualityScore  = qualityResult ? qualityResult.total : 0

  // Active alerts in last 60 minutes
  const activeAlerts = alerts.filter(a => {
  const age = (Date.now() - new Date(a.timestamp).getTime()) / 1000 / 60
  return age < 60
  }).length

  // Total readings today
  const todayStart    = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayReadings = readings.filter(r =>
  new Date(r.timestamp) >= todayStart
).length

// Uptime — minutes since first reading today
  const firstToday = readings
   .filter(r => new Date(r.timestamp) >= todayStart)
   .slice(-1)[0]
  const uptimeMinutes = firstToday
   ? Math.floor((Date.now() - new Date(firstToday.timestamp).getTime()) / 1000 / 60)
   : 0
  const uptimeDisplay = uptimeMinutes >= 60
    ? `${Math.floor(uptimeMinutes / 60)}h ${uptimeMinutes % 60}m`
    : `${uptimeMinutes}m`

  // Last alert
  const lastAlert = alerts.length > 0 ? alerts[0] : null

  const URGENCY_COLOR = {
    'Act Now':  '#ff4d4d',
    'Act Soon': '#ffaa00',
    'Monitor':  '#00c896',
  }

  const styles = {
    page: {
      padding:       '1.5rem',
      maxWidth:      '1100px',
      margin:        '0 auto',
      paddingBottom: '5rem',
    },
    sectionTitle: {
      fontSize:      '0.68rem',
      color:         '#8892a4',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom:  '0.75rem',
      marginTop:     '1.5rem',
    },
    error: {
      background:   '#ff4d4d18',
      border:       '1px solid #ff4d4d',
      borderRadius: '8px',
      padding:      '0.75rem 1rem',
      color:        '#ff4d4d',
      fontSize:     '0.85rem',
      marginBottom: '1rem',
    },
  }

  return (
    <div style={styles.page}>

      {/* Error */}
      {error && <div style={styles.error}>{error}</div>}

      {/* Loading */}
      {loading && !latest && (
        <div style={{color:'#8892a4',fontSize:'0.9rem',padding:'2rem 0'}}>
          Loading sensor data...
        </div>
      )}

      {/* Pond identity card */}
      {latest && (
        <>
          <div style={styles.sectionTitle}>Pond</div>
          <div style={{background:'#1a1f2e',border:'1px solid #2a3040',borderRadius:'12px',padding:'1rem 1.25rem',display:'flex',alignItems:'center',gap:'1rem',marginBottom:'0.75rem'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'12px',background:'#00c89620',border:'1px solid #00c89644',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00c896" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2 12 C5 8 8 16 12 12 C16 8 19 16 22 12"/>
                <path d="M2 17 C5 13 8 21 12 17 C16 13 19 21 22 17"/>
              </svg>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:'0.9rem',fontWeight:'600',color:'#e2e8f0'}}>pond-sensor-001</div>
              <div style={{fontSize:'0.75rem',color:'#8892a4',marginTop:'2px'}}>Majayjay, Laguna · Freshwater crayfish</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:'0.7rem',background:'#00c89620',color:'#00c896',padding:'3px 10px',borderRadius:'99px'}}>
                Online
              </div>
              {latest && (
                <div style={{fontSize:'0.68rem',color:'#8892a4',marginTop:'4px'}}>
                  {new Date(latest.timestamp).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Quick stats */}
      {latest && (
        <>
          <div style={styles.sectionTitle}>Today</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0.75rem',marginBottom:'0.75rem'}}>
            {[
                 { value: qualityScore,    label: 'Quality score',  color: qualityScore >= 70 ? '#00c896' : '#ffaa00' },
                 { value: activeAlerts,   label: 'Active alerts',  color: activeAlerts > 0 ? '#ffaa00' : '#00c896' },
                 { value: todayReadings,  label: 'Readings today', color: '#e2e8f0' },
                 { value: uptimeDisplay,  label: 'Uptime today',   color: '#00c896' },
              ].map((stat, i) => (
              <div key={i} style={{background:'#1a1f2e',border:'1px solid #2a3040',borderRadius:'12px',padding:'1rem',textAlign:'center'}}>
                <div style={{fontSize:'1.6rem',fontWeight:'700',color:stat.color,lineHeight:1}}>{stat.value}</div>
                <div style={{fontSize:'0.72rem',color:'#8892a4',marginTop:'4px'}}>{stat.label}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Last alert banner */}
      {lastAlert && (
        <>
          <div style={styles.sectionTitle}>Latest alert</div>
          <div style={{
            background:  '#ff4d4d12',
            border:      '1px solid #ff4d4d44',
            borderLeft:  '3px solid #ff4d4d',
            borderRadius:'10px',
            padding:     '0.75rem 1rem',
            display:     'flex',
            justifyContent:'space-between',
            alignItems:  'center',
            gap:         '1rem',
            marginBottom:'0.75rem',
            flexWrap:    'wrap',
          }}>
            <div>
              <div style={{fontSize:'0.82rem',color:'#ff4d4d',fontWeight:'600'}}>
                {lastAlert.message}
              </div>
              <div style={{fontSize:'0.72rem',color:'#8892a4',marginTop:'3px'}}>
                Sensor: {lastAlert.sensor} · {new Date(lastAlert.timestamp).toLocaleTimeString()}
              </div>
            </div>
            <div style={{fontSize:'0.7rem',background:'#ff4d4d22',color:'#ff4d4d',padding:'3px 10px',borderRadius:'99px',flexShrink:0}}>
              Act Now
            </div>
          </div>
        </>
      )}

      {/* Sensor cards */}
      {latest && (
        <>
          <div style={styles.sectionTitle}>Current readings</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'0.75rem'}}>
            <SensorCard label="Temperature"  value={latest.temperature}  prevValue={previous?.temperature}  unit="°C"   max={29} />
            <SensorCard label="pH Level"     value={latest.ph}           prevValue={previous?.ph}           unit="pH"   min={6.5} max={8.5} />
            <SensorCard label="Dissolved O₂" value={latest.oxygen}       prevValue={previous?.oxygen}       unit="mg/L" min={5} />
            <SensorCard label="Turbidity"    value={latest.turbidity}    prevValue={previous?.turbidity}    unit="NTU" />
            <SensorCard label="Water Level"  value={latest.water_level}  prevValue={previous?.water_level}  unit="cm"   min={32} />
          </div>
        </>
      )}

      {/* Water quality */}
      {latest && (
        <>
          <div style={styles.sectionTitle}>Water quality score</div>
          <WaterQualityCard reading={latest} />
        </>
      )}

    </div>
  )
}

export default Dashboard