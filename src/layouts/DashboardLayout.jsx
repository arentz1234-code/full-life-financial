import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, BarChart3,
  Target, Map, Trophy, FileText, LogOut, Bell, Search,
  TrendingUp, ClipboardList, ChevronDown, Settings, User,
  DollarSign, UserPlus, Award, AlertCircle, Check, X, Menu
} from 'lucide-react'
import { adminUser, agents } from '../data/mockData'
import './DashboardLayout.css'

function DashboardLayout({ role }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const profileMenuRef = useRef(null)
  const notificationsRef = useRef(null)

  // Get current user based on role (for demo, use first agent if role is agent)
  const currentUser = role === 'admin' ? adminUser : agents[0]

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'sale',
      title: 'New Sale Closed',
      message: 'Sarah Mitchell closed a $2,500 Whole Life policy',
      time: '5 min ago',
      read: false,
      icon: DollarSign
    },
    {
      id: 2,
      type: 'lead',
      title: 'New Hot Lead',
      message: 'Robert Williams requested a quote for Term Life',
      time: '1 hour ago',
      read: false,
      icon: Target
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Badge Earned!',
      message: 'You earned the "Week Warrior" badge',
      time: '2 hours ago',
      read: false,
      icon: Award
    },
    {
      id: 4,
      type: 'alert',
      title: 'Follow-up Reminder',
      message: 'Michelle Davis follow-up is due today',
      time: '3 hours ago',
      read: true,
      icon: AlertCircle
    },
    {
      id: 5,
      type: 'team',
      title: 'New Team Member',
      message: 'Amanda Rivera joined the team',
      time: 'Yesterday',
      read: true,
      icon: UserPlus
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const adminNav = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/policy-applications', icon: FileText, label: 'Policy Applications' },
    { path: '/admin/agents', icon: Users, label: 'Agents' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/applications', icon: ClipboardList, label: 'Job Applications' }
  ]

  const agentNav = [
    { path: '/agent', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/agent/applications', icon: ClipboardList, label: 'My Applications' },
    { path: '/agent/leads', icon: Target, label: 'Leads' },
    { path: '/agent/sales', icon: FileText, label: 'Sales' },
    { path: '/agent/map', icon: Map, label: 'Territory Map' },
    { path: '/agent/leaderboard', icon: Trophy, label: 'Leaderboard' }
  ]

  const navItems = role === 'admin' ? adminNav : agentNav

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="dashboard-layout">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <img src="/logo.svg" alt="Full Life Financial" className="sidebar-logo-img" />
            <div className="logo-text">
              <span className="logo-name">Full Life</span>
              <span className="logo-tagline">Financial</span>
            </div>
          </Link>
        </div>

        <div className="sidebar-user">
          <div className="avatar" style={{ background: role === 'admin' ? 'var(--accent)' : 'var(--primary)' }}>
            {currentUser.avatar}
          </div>
          <div className="user-info">
            <span className="user-name">{currentUser.name}</span>
            <span className="user-role">{role === 'admin' ? 'Sales Manager' : 'Sales Agent'}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-section-title">Main Menu</span>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {role === 'agent' && (
            <div className="nav-section">
              <span className="nav-section-title">Quick Stats</span>
              <div className="quick-stats">
                <div className="quick-stat">
                  <TrendingUp size={16} />
                  <span>Level {currentUser.level}</span>
                </div>
                <div className="quick-stat">
                  <Trophy size={16} />
                  <span>Rank #{currentUser.rank}</span>
                </div>
              </div>
              <div className="xp-bar">
                <div className="xp-progress" style={{ width: `${(currentUser.xp / currentUser.xpToNextLevel) * 100}%` }}></div>
              </div>
              <span className="xp-text">{currentUser.xp} / {currentUser.xpToNextLevel} XP</span>
            </div>
          )}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Bar */}
        <header className="dashboard-header">
          <div className="header-search">
            <Search size={20} />
            <input type="text" placeholder="Search..." />
          </div>

          <div className="header-actions">
            <button
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <div className="notifications-container" ref={notificationsRef}>
              <button
                className={`header-btn ${notificationsOpen ? 'active' : ''}`}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </button>

              {notificationsOpen && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4>Notifications</h4>
                    {unreadCount > 0 && (
                      <button className="mark-all-read" onClick={markAllAsRead}>
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="notifications-list">
                    {notifications.length === 0 ? (
                      <div className="no-notifications">
                        <Bell size={32} />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map(notification => {
                        const IconComponent = notification.icon
                        return (
                          <div
                            key={notification.id}
                            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className={`notification-icon ${notification.type}`}>
                              <IconComponent size={18} />
                            </div>
                            <div className="notification-content">
                              <span className="notification-title">{notification.title}</span>
                              <span className="notification-message">{notification.message}</span>
                              <span className="notification-time">{notification.time}</span>
                            </div>
                            <button
                              className="notification-dismiss"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        )
                      })
                    )}
                  </div>

                  <div className="notifications-footer">
                    <Link
                      to={`/${role}/notifications`}
                      onClick={() => setNotificationsOpen(false)}
                    >
                      View All Notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="profile-menu-container" ref={profileMenuRef}>
              <button
                className={`header-user ${profileMenuOpen ? 'active' : ''}`}
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <div className="avatar avatar-sm" style={{ background: role === 'admin' ? 'var(--accent)' : 'var(--primary)' }}>
                  {currentUser.avatar}
                </div>
                <span>{currentUser.name}</span>
                <ChevronDown size={16} className={`chevron ${profileMenuOpen ? 'open' : ''}`} />
              </button>

              {profileMenuOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <div className="avatar" style={{ background: role === 'admin' ? 'var(--accent)' : 'var(--primary)' }}>
                      {currentUser.avatar}
                    </div>
                    <div className="dropdown-user-info">
                      <span className="dropdown-user-name">{currentUser.name}</span>
                      <span className="dropdown-user-email">{currentUser.email}</span>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link
                    to={`/${role}/profile`}
                    className="dropdown-item"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to={`/${role}/settings`}
                    className="dropdown-item"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <Settings size={18} />
                    <span>Account Settings</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
