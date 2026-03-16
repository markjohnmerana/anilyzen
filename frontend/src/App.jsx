import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar          from './components/Navbar'
import BottomNav       from './components/BottomNav'
import ChatWidget      from './components/ChatWidget'
import ProtectedRoute  from './components/ProtectedRoute'
import Landing         from './pages/Landing'
import Dashboard       from './pages/Dashboard'
import AIInsights      from './pages/AIInsights'
import History         from './pages/History'
import Login           from './pages/Login'
import { useAuth }         from './hooks/useAuth'
import { useDeviceStatus } from './hooks/useDeviceStatus'
import { SensorProvider, useSensor } from './context/SensorContext'

const APP_ROUTES = ['/dashboard', '/ai', '/history']

function NavBar() {
  const { latest }   = useSensor()
  const isOnline     = useDeviceStatus(latest, 10)
  const { user }     = useAuth()
  const location     = useLocation()
  const isAppRoute   = APP_ROUTES.includes(location.pathname)

  if (!user || !isAppRoute) return null
  return <Navbar isOnline={isOnline} lastSeen={latest?.timestamp} />
}

function AppShell() {
  const { user }   = useAuth()
  const location   = useLocation()
  const isAppRoute = APP_ROUTES.includes(location.pathname)

  return (
    <SensorProvider>
      <NavBar />
      <Routes>
        <Route path="/"          element={<Landing />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        }/>
        <Route path="/ai"        element={
          <ProtectedRoute><AIInsights /></ProtectedRoute>
        }/>
        <Route path="/history"   element={
          <ProtectedRoute><History /></ProtectedRoute>
        }/>
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
      {user && isAppRoute && <BottomNav />}
      {user && isAppRoute && <ChatWidget />}
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