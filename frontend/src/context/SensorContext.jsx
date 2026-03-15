import { createContext, useContext } from 'react'
import { useSensorData } from '../hooks/useSensorData'

const SensorContext = createContext(null)

export function SensorProvider({ children }) {
  const data = useSensorData(3000)
  return (
    <SensorContext.Provider value={data}>
      {children}
    </SensorContext.Provider>
  )
}

export function useSensor() {
  return useContext(SensorContext)
}