import { useState, useEffect } from 'react'
import { getReadings, getAlerts } from '../api/sensors'

export function useSensorData(refreshInterval = 3000) {
  const [readings, setReadings]   = useState([])
  const [alerts, setAlerts]       = useState([])
  const [latest, setLatest]       = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  const fetchData = async () => {
    try {
      const [readingsRes, alertsRes] = await Promise.all([
        getReadings(20),
        getAlerts(10),
      ])

      const readingList = readingsRes.data || []
      setReadings(readingList)
      setLatest(readingList[0] || null)
      setAlerts(alertsRes.data || [])
      setError(null)
    } catch (err) {
      setError('Cannot connect to API — is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, refreshInterval)
    return () => clearInterval(interval)
  }, [])

  return { readings, alerts, latest, loading, error }
}