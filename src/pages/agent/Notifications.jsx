import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, DollarSign, Trophy, Target, Sparkles, Check, CheckCheck, Trash2 } from 'lucide-react'
import {
  agents,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead
} from '../../data/mockData'
import './AgentNotifications.css'

// Map notification types to icons and colors
const notificationConfig = {
  tier_changed: { icon: Sparkles, color: '#D4A853', label: 'Tier Update' },
  lead_assigned: { icon: Target, color: '#3B82F6', label: 'New Lead' },
  contest_started: { icon: Trophy, color: '#F59E0B', label: 'Contest' },
  paid_status_changed: { icon: DollarSign, color: '#10B981', label: 'Commission' }
}

// Format relative time
const formatRelativeTime = (dateStr) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString()
}

function AgentNotifications() {
  const agent = agents[0]
  const [refreshKey, setRefreshKey] = useState(0)
  const [filter, setFilter] = useState('all') // all, unread

  const allNotifications = getNotifications(agent.id)
  const notifications = filter === 'unread'
    ? allNotifications.filter(n => !n.isRead)
    : allNotifications

  const unreadCount = allNotifications.filter(n => !n.isRead).length

  const handleMarkAsRead = (id) => {
    markNotificationRead(id)
    setRefreshKey(prev => prev + 1)
  }

  const handleMarkAllAsRead = () => {
    markAllNotificationsRead(agent.id)
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="agent-notifications">
      <div className="page-header">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated on your sales, leads, and team activity.</p>
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-outline" onClick={handleMarkAllAsRead}>
            <CheckCheck size={18} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="notification-tabs">
        <button
          className={`tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({allNotifications.length})
        </button>
        <button
          className={`tab ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="notifications-list-full">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <Bell size={48} />
            <h3>{filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}</h3>
            <p>
              {filter === 'unread'
                ? 'You\'re all caught up!'
                : 'Notifications about your sales, leads, and contests will appear here.'}
            </p>
          </div>
        ) : (
          notifications.map(notification => {
            const config = notificationConfig[notification.type] || {
              icon: Bell,
              color: '#6B7280',
              label: 'Notification'
            }
            const IconComponent = config.icon

            return (
              <div
                key={notification.id}
                className={`notification-card ${notification.isRead ? 'read' : 'unread'}`}
              >
                <div className="notification-icon-wrapper" style={{ background: `${config.color}15` }}>
                  <IconComponent size={22} style={{ color: config.color }} />
                </div>

                <div className="notification-body">
                  <div className="notification-header">
                    <span className="notification-type" style={{ color: config.color }}>
                      {config.label}
                    </span>
                    <span className="notification-time">{formatRelativeTime(notification.createdAt)}</span>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                  {notification.link && (
                    <Link to={notification.link} className="notification-link">
                      View details
                    </Link>
                  )}
                </div>

                {!notification.isRead && (
                  <button
                    className="mark-read-btn"
                    onClick={() => handleMarkAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <Check size={18} />
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default AgentNotifications
