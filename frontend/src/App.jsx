import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar          from './components/Navbar'
import BottomNav       from './components/BottomNav'
import ChatWidget      from './components/ChatWidget'
import ProtectedRoute  from './components/ProtectedRoute'
import Dashboard       from './pages/Dashboard'
import AIInsights      from './pages/AIInsights'
import History         from './pages/History'
import Login           from './pages/Login'
import { useAuth }         from './hooks/useAuth'
import { useSensorData }   from './hooks/useSensorData'
import { useDeviceStatus } from './hooks/useDeviceStatus'

function AppShell() {
  const { user }   = useAuth()
  const { latest } = useSensorData(3000)
  const isOnline   = useDeviceStatus(latest, 10)

  return (
    <>
      {user && <Navbar isOnline={isOnline} lastSeen={latest?.timestamp} />}

      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        }/>
        <Route path="/ai" element={
          <ProtectedRoute><AIInsights /></ProtectedRoute>
        }/>
        <Route path="/history" element={
          <ProtectedRoute><History /></ProtectedRoute>
        }/>

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {user && <BottomNav />}
      {user && <ChatWidget />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App