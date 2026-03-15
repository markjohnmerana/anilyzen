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
import { useDeviceStatus } from './hooks/useDeviceStatus'
import { SensorProvider, useSensor } from './context/SensorContext'

function NavBar() {
  const { latest } = useSensor()
  const isOnline   = useDeviceStatus(latest, 10)
  const { user }   = useAuth()

  if (!user) return null

  return <Navbar isOnline={isOnline} lastSeen={latest?.timestamp} />
}

function AppShell() {
  const { user } = useAuth()

  return (
    <SensorProvider>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        }/>
        <Route path="/ai" element={
          <ProtectedRoute><AIInsights /></ProtectedRoute>
        }/>
        <Route path="/history" element={
          <ProtectedRoute><History /></ProtectedRoute>
        }/>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      {user && <BottomNav />}
      {user && <ChatWidget />}
    </SensorProvider>
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