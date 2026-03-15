import { useState, useEffect } from 'react'

export function useDeviceStatus(latest, thresholdSeconds = 10) {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    if (!latest?.timestamp) {
      setIsOnline(false)
      return
    }

    const check = () => {
      const lastTime = new Date(latest.timestamp).getTime()
      const now      = Date.now()
      const diff     = (now - lastTime) / 1000
      setIsOnline(diff < thresholdSeconds)
    }

    check()
    const interval = setInterval(check, 1000)
    return () => clearInterval(interval)
  }, [latest])

  return isOnline
}