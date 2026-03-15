import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar      from './components/Navbar'
import BottomNav   from './components/BottomNav'
import ChatWidget  from './components/ChatWidget'
import Dashboard   from './pages/Dashboard'
import AIInsights  from './pages/AIInsights'
import History     from './pages/History'
import Login       from './pages/Login'
import { useSensorData }   from './hooks/useSensorData'
import { useDeviceStatus } from './hooks/useDeviceStatus'

function AppLayout() {
  const { latest } = useSensorData(3000)
  const isOnline   = useDeviceStatus(latest, 10)

  return (
    <>
      <Navbar isOnline={isOnline} lastSeen={latest?.timestamp} />
      <Routes>
        <Route path="/"          element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai"        element={<AIInsights />} />
        <Route path="/history"   element={<History />} />
        <Route path="/login"     element={<Login />} />
      </Routes>
      <BottomNav />
      <ChatWidget />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App