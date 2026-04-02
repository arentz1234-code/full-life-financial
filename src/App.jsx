import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Public Pages
import Home from './pages/public/Home'
import About from './pages/public/About'
import Products from './pages/public/Products'
import Quote from './pages/public/Quote'
import Careers from './pages/public/Careers'
import Login from './pages/Login'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import AdminAgents from './pages/admin/Agents'
import AdminAnalytics from './pages/admin/Analytics'
import AdminApplications from './pages/admin/Applications'

// Agent Pages
import AgentDashboard from './pages/agent/Dashboard'
import AgentLeads from './pages/agent/Leads'
import AgentSales from './pages/agent/Sales'
import AgentMap from './pages/agent/Map'
import AgentLeaderboard from './pages/agent/Leaderboard'

// Shared Pages
import Profile from './pages/shared/Profile'
import Settings from './pages/shared/Settings'

// Layout Components
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/careers" element={<Careers />} />
        </Route>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="agents" element={<AdminAgents />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Agent Routes */}
        <Route path="/agent" element={<DashboardLayout role="agent" />}>
          <Route index element={<AgentDashboard />} />
          <Route path="leads" element={<AgentLeads />} />
          <Route path="sales" element={<AgentSales />} />
          <Route path="map" element={<AgentMap />} />
          <Route path="leaderboard" element={<AgentLeaderboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
