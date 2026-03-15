import { useState } from 'react'
import { useSensorData } from '../hooks/useSensorData'
import { analyzePond }   from '../api/gemini'
import { useSensor } from '../context/SensorContext'

const STATUS_COLORS = {
  Excellent: '#00c896',
  Good:      '#00c896',
  Fair:      '#ffaa00',
  Warning:   '#ff6b35',
  Critical:  '#ff4d4d',
}

const URGENCY_COLORS = {
  'Monitor':   '#00c896',
  'Act Soon':  '#ffaa00',
  'Act Now':   '#ff4d4d',
}

function Badge({ text, color }) {
  return (
    <span style={{
      background:   `${color}22`,
      color:        color,
      padding:      '3px 10px',
      borderRadius: '99px',
      fontSize:     '0.75rem',
      fontWeight:   '600',
    }}>
      {text}
    </span>
  )
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background:   '#1a1f2e',
      border:       '1px solid #2a3040',
      borderRadius: '12px',
      padding:      '1.25rem',
      marginBottom: '1rem',
      ...style,
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize:      '0.72rem',
      color:         '#8892a4',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom:  '0.75rem',
      marginTop:     '1.5rem',
    }}>
      {children}
    </div>
  )
}

function AIInsights() {
  const { latest, readings } = useSensor()
  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const handleAnalyze = async () => {
    if (!latest) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await analyzePond(latest, readings)
      setResult(data)
    } catch (err) {
      setError('Failed to get AI analysis. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const styles = {
    page: {
      padding:   '1.5rem',
      maxWidth:  '800px',
      margin:    '0 auto',
      paddingBottom: '5rem',
    },
    header: {
      marginBottom: '1.5rem',
    },
    title: {
      fontSize:   '1.2rem',
      fontWeight: '700',
      color:      '#e2e8f0',
    },
    subtitle: {
      fontSize:  '0.82rem',
      color:     '#8892a4',
      marginTop: '3px',
    },
    analyzeBtn: {
      width:        '100%',
      padding:      '0.9rem',
      background:   loading ? '#2a3040' : '#00c896',
      color:        loading ? '#8892a4' : '#0f1117',
      border:       'none',
      borderRadius: '10px',
      fontSize:     '0.95rem',
      fontWeight:   '700',
      cursor:       loading ? 'not-allowed' : 'pointer',
      marginBottom: '1.5rem',
      transition:   'background 0.2s',
    },
    summaryText: {
      fontSize:   '0.9rem',
      color:      '#e2e8f0',
      lineHeight: 1.6,
      marginTop:  '0.75rem',
    },
    statusRow: {
      display:    'flex',
      gap:        '0.5rem',
      flexWrap:   'wrap',
      marginTop:  '0.75rem',
    },
    analysisRow: {
      display:        'flex',
      justifyContent: 'space-between',
      alignItems:     'flex-start',
      paddingBottom:  '0.75rem',
      marginBottom:   '0.75rem',
      borderBottom:   '1px solid #2a3040',
      gap:            '1rem',
    },
    sensorName: {
      fontSize:   '0.82rem',
      color:      '#8892a4',
      marginBottom: '2px',
    },
    sensorValue: {
      fontSize:   '1rem',
      fontWeight: '700',
      color:      '#e2e8f0',
    },
    insight: {
      fontSize:  '0.8rem',
      color:     '#8892a4',
      marginTop: '4px',
      flex:      1,
    },
    predictionText: {
      fontSize:   '0.88rem',
      color:      '#e2e8f0',
      lineHeight: 1.7,
    },
    recItem: {
      display:     'flex',
      gap:         '0.75rem',
      alignItems:  'flex-start',
      marginBottom: '0.6rem',
    },
    recDot: {
      width:        '6px',
      height:       '6px',
      borderRadius: '50%',
      background:   '#00c896',
      marginTop:    '6px',
      flexShrink:   0,
    },
    recText: {
      fontSize:   '0.85rem',
      color:      '#e2e8f0',
      lineHeight: 1.5,
    },
    errorBox: {
      background:   '#ff4d4d18',
      border:       '1px solid #ff4d4d',
      borderRadius: '8px',
      padding:      '0.75rem 1rem',
      color:        '#ff4d4d',
      fontSize:     '0.85rem',
    },
    noData: {
      textAlign:  'center',
      color:      '#8892a4',
      fontSize:   '0.88rem',
      padding:    '3rem 0',
    }
  }

  const ASSESSMENT_COLORS = {
    Normal:   '#00c896',
    Warning:  '#ffaa00',
    Critical: '#ff4d4d',
  }

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.title}>AI Pond Insights</div>
        <div style={styles.subtitle}>
          Powered by Gemini · Analysis + Prediction
        </div>
      </div>

      {/* Analyze button */}
      <button
        style={styles.analyzeBtn}
        onClick={handleAnalyze}
        disabled={loading || !latest}
      >
        {loading ? 'Analyzing your pond...' : 'Analyze My Pond'}
      </button>

      {/* Error */}
      {error && <div style={styles.errorBox}>{error}</div>}

      {/* No sensor data */}
      {!latest && !loading && (
        <div style={styles.noData}>
          No sensor data available. Start the simulator first.
        </div>
      )}

      {/* Results */}
      {result && (
        <>
          {/* Summary */}
          <SectionTitle>Overall Assessment</SectionTitle>
          <Card>
            <div style={styles.statusRow}>
              <Badge
                text={result.status}
                color={STATUS_COLORS[result.status] || '#00c896'}
              />
              <Badge
                text={result.urgency}
                color={URGENCY_COLORS[result.urgency] || '#ffaa00'}
              />
            </div>
            <div style={styles.summaryText}>{result.summary}</div>
          </Card>

          {/* Sensor analysis */}
          <SectionTitle>Sensor Analysis</SectionTitle>
          <Card>
            {result.analysis.map((item, i) => (
              <div
                key={i}
                style={{
                  ...styles.analysisRow,
                  ...(i === result.analysis.length - 1
                    ? { borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }
                    : {})
                }}
              >
                <div style={{ minWidth: '120px' }}>
                  <div style={styles.sensorName}>{item.sensor}</div>
                  <div style={styles.sensorValue}>{item.value}</div>
                  <div style={{ marginTop: '4px' }}>
                    <Badge
                      text={item.assessment}
                      color={ASSESSMENT_COLORS[item.assessment] || '#8892a4'}
                    />
                  </div>
                </div>
                <div style={styles.insight}>{item.insight}</div>
              </div>
            ))}
          </Card>

          {/* Prediction */}
          <SectionTitle>Prediction</SectionTitle>
          <Card>
            <div style={styles.predictionText}>{result.prediction}</div>
          </Card>

          {/* Recommendations */}
          <SectionTitle>Recommendations</SectionTitle>
          <Card>
            {result.recommendations.map((rec, i) => (
              <div key={i} style={styles.recItem}>
                <div style={styles.recDot}></div>
                <div style={styles.recText}>{rec}</div>
              </div>
            ))}
          </Card>
        </>
      )}

    </div>
  )
}

export default AIInsights