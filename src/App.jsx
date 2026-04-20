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
import PolicyApplications from './pages/admin/PolicyApplications'
import CommissionTiers from './pages/admin/CommissionTiers'
import Carriers from './pages/admin/Carriers'
import AdminSales from './pages/admin/Sales'

// Agent Pages
import AgentDashboard from './pages/agent/Dashboard'
import AgentLeads from './pages/agent/Leads'
import AgentSales from './pages/agent/Sales'
import AgentMap from './pages/agent/Map'
import AgentLeaderboard from './pages/agent/Leaderboard'
import AgentApplications from './pages/agent/Applications'
import AgentNotifications from './pages/agent/Notifications'

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
          <Route path="commission-tiers" element={<CommissionTiers />} />
          <Route path="carriers" element={<Carriers />} />
          <Route path="sales" element={<AdminSales />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="policy-applications" element={<PolicyApplications />} />
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
          <Route path="applications" element={<AgentApplications />} />
          <Route path="notifications" element={<AgentNotifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
