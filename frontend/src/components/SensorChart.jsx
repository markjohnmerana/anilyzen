import ReactECharts from 'echarts-for-react'

function SensorChart({ readings, sensor, label, unit, min, max, yMin, yMax }) {

  const sorted = [...readings].reverse()

  const timestamps = sorted.map(r =>
    new Date(r.timestamp).toLocaleTimeString()
  )

  const values = sorted.map(r =>
    r[sensor] !== null ? Number(r[sensor]) : null
  )

  // Build threshold lines
  const markLines = []
  if (min !== undefined) {
    markLines.push({
      yAxis: min,
      name:  'Min',
      lineStyle: { color: '#ffaa00', type: 'dashed', width: 1 },
      label: { formatter: `min ${min}`, color: '#ffaa00', fontSize: 10 }
    })
  }
  if (max !== undefined) {
    markLines.push({
      yAxis: max,
      name:  'Max',
      lineStyle: { color: '#ff4d4d', type: 'dashed', width: 1 },
      label: { formatter: `max ${max}`, color: '#ff4d4d', fontSize: 10 }
    })
  }

  const option = {
    backgroundColor: 'transparent',
    grid: {
      top:    '12%',
      left:   '3%',
      right:  '4%',
      bottom: '12%',
      containLabel: true,
    },
    tooltip: {
      trigger:   'axis',
      formatter: (params) => {
        const p = params[0]
        return `${p.name}<br/>${label}: <b>${p.value} ${unit}</b>`
      },
      backgroundColor: '#1a1f2e',
      borderColor:     '#2a3040',
      textStyle: { color: '#e2e8f0' },
    },
    xAxis: {
      type:        'category',
      data:        timestamps,
      boundaryGap: false,
      axisLine:  { lineStyle: { color: '#2a3040' } },
      axisLabel: { color: '#8892a4', fontSize: 11 },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      min:  yMin,
      max:  yMax,
      axisLine:  { lineStyle: { color: '#2a3040' } },
      axisLabel: {
        color:    '#8892a4',
        fontSize: 11,
        formatter: `{value} ${unit}`,
      },
      splitLine: { lineStyle: { color: '#2a3040', type: 'dashed' } },
    },
    series: [
      {
        name:       label,
        type:       'line',
        data:       values,
        smooth:     true,
        symbol:     'circle',
        symbolSize: 4,
        lineStyle:  { width: 2, color: '#00c896' },
        itemStyle:  { color: '#00c896' },
        areaStyle:  { opacity: 0.08, color: '#00c896' },
        markLine: markLines.length > 0 ? {
          silent: true,
          data:   markLines,
          symbol: 'none',
        } : undefined,
      },
    ],
  }

  const styles = {
    wrapper: {
      background:   'var(--bg-card)',
      border:       '1px solid var(--border)',
      borderRadius: '12px',
      padding:      '1.25rem',
      marginBottom: '1rem',
    },
    header: {
      display:        'flex',
      justifyContent: 'space-between',
      alignItems:     'center',
      marginBottom:   '1rem',
    },
    title: {
      fontSize:      '0.85rem',
      color:         'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    badges: {
      display: 'flex',
      gap:     '0.5rem',
      fontSize: '0.72rem',
    },
    badge: (color) => ({
      background:   `${color}22`,
      color:        color,
      padding:      '2px 8px',
      borderRadius: '99px',
    })
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div style={styles.title}>{label} — last 20 readings</div>
        <div style={styles.badges}>
          {min !== undefined && (
            <span style={styles.badge('#ffaa00')}>min {min} {unit}</span>
          )}
          {max !== undefined && (
            <span style={styles.badge('#ff4d4d')}>max {max} {unit}</span>
          )}
        </div>
      </div>
      <ReactECharts
        option={option}
        style={{ height: '220px' }}
        notMerge={true}
      />
    </div>
  )
}

export default SensorChart