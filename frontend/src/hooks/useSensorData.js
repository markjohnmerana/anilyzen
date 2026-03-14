import { useState, useEffect, useRef } from 'react'
import { getReadings, getAlerts } from '../api/sensors'

export function useSensorData(refreshInterval = 3000) {
  const [readings, setReadings] = useState([])
  const [alerts, setAlerts]     = useState([])
  const [latest, setLatest]     = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  // Keep previous values during refetch — prevents flicker
  const prevLatest   = useRef(null)
  const prevReadings = useRef([])

  const fetchData = async () => {
    try {
      const [readingsRes, alertsRes] = await Promise.all([
        getReadings(20),
        getAlerts(10),
      ])

      const readingList = readingsRes.data || []

      // Only update if we actually got data
      if (readingList.length > 0) {
        prevLatest.current   = readingList[0]
        prevReadings.current = readingList
        setLatest(readingList[0])
        setReadings(readingList)
      }

      setAlerts(alertsRes.data || [])
      setError(null)
    } catch (err) {
      setError('Cannot connect to API — is the backend running?')
      // Keep showing previous data on error
      if (prevLatest.current) {
        setLatest(prevLatest.current)
        setReadings(prevReadings.current)
      }
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