import { useState } from 'react'
import { Plus, Search, MoreVertical, Phone, Mail, MapPin, TrendingUp, Target, DollarSign, X, Download, Briefcase, Gem, Flame, Zap, Crown, BookOpen, Rocket } from 'lucide-react'
import { agents, getAgentStats, badges as badgeDefinitions } from '../../data/mockData'
import { exportAgents } from '../../utils/exportToExcel'
import './AdminAgents.css'

// Map icon names to Lucide components
const iconMap = {
  target: Target,
  briefcase: Briefcase,
  gem: Gem,
  flame: Flame,
  zap: Zap,
  crown: Crown,
  'book-open': BookOpen,
  rocket: Rocket
}

// Badge icon component
function BadgeIcon({ badge, size = 16 }) {
  const IconComponent = iconMap[badge.icon]
  if (!IconComponent) return null
  return <IconComponent size={size} style={{ color: badge.color }} />
}

function AdminAgents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newAgent, setNewAgent] = useState({
    name: '',
    email: '',
    phone: '',
    territory: 'Alabama'
  })

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.territory.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddAgent = (e) => {
    e.preventDefault()
    // In a real app, this would make an API call
    alert(`Agent ${newAgent.name} would be added!`)
    setShowAddModal(false)
    setNewAgent({ name: '', email: '', phone: '', territory: 'Alabama' })
  }

  return (
    <div className="admin-agents">
      <div className="page-header">
        <div>
          <h1>Agents</h1>
          <p>Manage your sales team and monitor their performance.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => exportAgents(agents, getAgentStats)}>
            <Download size={18} />
            Export
          </button>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            Add Agent
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="agents-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select className="filter-select">
            <option value="">All Territories</option>
            <option value="alabama">Alabama</option>
            <option value="florida">Florida</option>
            <option value="georgia">Georgia</option>
          </select>
          <select className="filter-select">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="agents-grid">
        {filteredAgents.map(agent => {
          const stats = getAgentStats(agent.id)
          return (
            <div key={agent.id} className="agent-card" onClick={() => setSelectedAgent(agent)}>
              <div className="agent-card-header">
                <div className="avatar avatar-lg" style={{ background: `hsl(${agent.id.charCodeAt(6) * 30}, 60%, 45%)` }}>
                  {agent.avatar}
                </div>
                <button className="more-btn" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical size={18} />
                </button>
              </div>

              <h3>{agent.name}</h3>
              <span className="agent-territory">{agent.territory}</span>

              <div className="agent-contact">
                <div className="contact-item">
                  <Mail size={14} />
                  <span>{agent.email}</span>
                </div>
                <div className="contact-item">
                  <Phone size={14} />
                  <span>{agent.phone}</span>
                </div>
              </div>

              <div className="agent-stats">
                <div className="stat-item">
                  <span className="stat-value">{stats.totalSales}</span>
                  <span className="stat-label">Sales</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">${(stats.totalRevenue / 1000).toFixed(1)}k</span>
                  <span className="stat-label">Revenue</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{stats.closeRate}%</span>
                  <span className="stat-label">Close Rate</span>
                </div>
              </div>

              <div className="agent-badges">
                {agent.badges.slice(0, 4).map(badgeId => {
                  const badge = badgeDefinitions[badgeId]
                  return badge ? (
                    <span key={badgeId} className="badge-icon" title={badge.name}>
                      <BadgeIcon badge={badge} size={14} />
                    </span>
                  ) : null
                })}
              </div>

              <div className="agent-footer">
                <span className={`status-badge ${agent.status}`}>
                  {agent.status}
                </span>
                <span className="level-badge">Level {agent.level}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div className="modal-overlay" onClick={() => setSelectedAgent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedAgent(null)}>
              <X size={20} />
            </button>

            <div className="modal-header">
              <div className="avatar avatar-xl" style={{ background: `hsl(${selectedAgent.id.charCodeAt(6) * 30}, 60%, 45%)` }}>
                {selectedAgent.avatar}
              </div>
              <div className="modal-header-info">
                <h2>{selectedAgent.name}</h2>
                <span className="modal-subtitle">
                  <MapPin size={14} />
                  {selectedAgent.territory}
                </span>
              </div>
            </div>

            <div className="modal-stats">
              {(() => {
                const stats = getAgentStats(selectedAgent.id)
                return (
                  <>
                    <div className="modal-stat">
                      <div className="stat-icon" style={{ background: 'rgba(27, 94, 32, 0.1)', color: 'var(--primary)' }}>
                        <DollarSign size={20} />
                      </div>
                      <div className="stat-content">
                        <span className="stat-value">${stats.totalRevenue.toLocaleString()}</span>
                        <span className="stat-label">Total Revenue</span>
                      </div>
                    </div>
                    <div className="modal-stat">
                      <div className="stat-icon" style={{ background: 'rgba(212, 168, 83, 0.1)', color: 'var(--accent)' }}>
                        <Target size={20} />
                      </div>
                      <div className="stat-content">
                        <span className="stat-value">{stats.totalSales}</span>
                        <span className="stat-label">Closed Sales</span>
                      </div>
                    </div>
                    <div className="modal-stat">
                      <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                        <TrendingUp size={20} />
                      </div>
                      <div className="stat-content">
                        <span className="stat-value">{stats.closeRate}%</span>
                        <span className="stat-label">Close Rate</span>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>

            <div className="modal-section">
              <h4>Contact Information</h4>
              <div className="contact-details">
                <div className="detail-row">
                  <Mail size={16} />
                  <span>{selectedAgent.email}</span>
                </div>
                <div className="detail-row">
                  <Phone size={16} />
                  <span>{selectedAgent.phone}</span>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h4>Badges & Achievements</h4>
              <div className="badges-list">
                {selectedAgent.badges.map(badgeId => {
                  const badge = badgeDefinitions[badgeId]
                  return badge ? (
                    <div key={badgeId} className="badge-item" style={{ borderColor: badge.color }}>
                      <span className="badge-icon-lg">
                        <BadgeIcon badge={badge} size={24} />
                      </span>
                      <div className="badge-info">
                        <span className="badge-name">{badge.name}</span>
                        <span className="badge-desc">{badge.description}</span>
                      </div>
                    </div>
                  ) : null
                })}
              </div>
            </div>

            <div className="modal-section">
              <h4>Agent Details</h4>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Hire Date</span>
                  <span className="detail-value">{new Date(selectedAgent.hireDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Level</span>
                  <span className="detail-value">{selectedAgent.level}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Current Streak</span>
                  <span className="detail-value">{selectedAgent.streak} days</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className={`status-badge ${selectedAgent.status}`}>{selectedAgent.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Agent Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddModal(false)}>
              <X size={20} />
            </button>

            <h2>Add New Agent</h2>
            <p>Create a new agent account for your team.</p>

            <form onSubmit={handleAddAgent}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-input"
                  value={newAgent.email}
                  onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={newAgent.phone}
                  onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Territory *</label>
                <select
                  className="form-select"
                  value={newAgent.territory}
                  onChange={(e) => setNewAgent({ ...newAgent, territory: e.target.value })}
                  required
                >
                  <option value="Alabama">Alabama</option>
                  <option value="Florida">Florida</option>
                  <option value="Georgia">Georgia</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminAgents
