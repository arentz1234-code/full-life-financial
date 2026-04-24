import { useState } from 'react'
import { Plus, Search, MoreVertical, Phone, Mail, MapPin, TrendingUp, Target, DollarSign, X, Download, Briefcase, Gem, Flame, Zap, Crown, BookOpen, Rocket, Layers, History, AlertTriangle } from 'lucide-react'
import {
  getAgents,
  getAllAgentsWithTiers,
  getAgentStats,
  badges as badgeDefinitions,
  getCommissionTiers,
  getCommissionTierById,
  updateAgentTier,
  getAgentTierHistory,
  adminUser,
  addNotification,
  addAgent
} from '../../data/mockData'
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
  const [agents, setAgents] = useState(getAllAgentsWithTiers())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showTierModal, setShowTierModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [tierChangeAgent, setTierChangeAgent] = useState(null)
  const [selectedTierId, setSelectedTierId] = useState('')
  const [tierChangeReason, setTierChangeReason] = useState('')
  const [newAgent, setNewAgent] = useState({
    name: '',
    email: '',
    phone: '',
    territory: 'Alabama',
    commissionTierId: ''
  })

  const tiers = getCommissionTiers()

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.territory.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const refreshAgents = () => {
    setAgents(getAllAgentsWithTiers())
  }

  const handleAddAgent = (e) => {
    e.preventDefault()
    addAgent(newAgent)
    refreshAgents()
    setShowAddModal(false)
    setNewAgent({ name: '', email: '', phone: '', territory: 'Alabama', commissionTierId: '' })
  }

  const openTierChangeModal = (agent, e) => {
    e.stopPropagation()
    setTierChangeAgent(agent)
    setSelectedTierId(agent.commissionTierId)
    setTierChangeReason('')
    setShowTierModal(true)
  }

  const handleTierChange = () => {
    if (!tierChangeAgent || !selectedTierId || selectedTierId === tierChangeAgent.commissionTierId) {
      setShowTierModal(false)
      return
    }

    const newTier = getCommissionTierById(selectedTierId)

    // Update the tier
    updateAgentTier(
      tierChangeAgent.id,
      selectedTierId,
      adminUser.id,
      tierChangeReason
    )

    // Send notification to agent
    addNotification({
      recipientAgentId: tierChangeAgent.id,
      type: 'tier_changed',
      message: `Your commission tier was updated to ${newTier.name} by ${adminUser.name}.`,
      link: '/agent/profile'
    })

    refreshAgents()
    setShowTierModal(false)
    setTierChangeAgent(null)
    setSelectedTierId('')
    setTierChangeReason('')
  }

  const openHistoryModal = (agent, e) => {
    e.stopPropagation()
    setSelectedAgent(agent)
    setShowHistoryModal(true)
  }

  const getTierHistory = (agentId) => {
    return getAgentTierHistory(agentId)
  }

  return (
    <div className="admin-agents">
      <div className="page-header">
        <div>
          <h1>Agents</h1>
          <p>Manage your sales team, assign commission tiers, and monitor performance.</p>
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
            <option value="">All Tiers</option>
            {tiers.map(tier => (
              <option key={tier.id} value={tier.id}>{tier.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="agents-grid">
        {filteredAgents.map(agent => {
          const stats = getAgentStats(agent.id)
          const tier = getCommissionTierById(agent.commissionTierId)
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

              {/* Commission Tier */}
              <div className="agent-tier-section">
                <div className="tier-display">
                  <Layers size={14} />
                  <span className="tier-name">{tier?.name || 'No Tier'}</span>
                  <span className="tier-rate">{tier ? `${(tier.baseMultiplier * 100).toFixed(0)}%` : '—'}</span>
                </div>
                <div className="tier-actions">
                  <button
                    className="tier-btn change"
                    onClick={(e) => openTierChangeModal(agent, e)}
                    title="Change Tier"
                  >
                    Change
                  </button>
                  <button
                    className="tier-btn history"
                    onClick={(e) => openHistoryModal(agent, e)}
                    title="View History"
                  >
                    <History size={14} />
                  </button>
                </div>
              </div>

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
                  <span className="stat-label">Commission</span>
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
      {selectedAgent && !showHistoryModal && (
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
                        <span className="stat-label">Total Commission</span>
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

            {/* Commission Tier Section */}
            <div className="modal-section">
              <h4>Commission Tier</h4>
              {(() => {
                const tier = getCommissionTierById(selectedAgent.commissionTierId)
                return (
                  <div className="tier-detail-card">
                    <div className="tier-detail-info">
                      <Layers size={20} />
                      <div>
                        <span className="tier-detail-name">{tier?.name || 'No Tier'}</span>
                        <span className="tier-detail-rate">
                          {tier ? `${(tier.baseMultiplier * 100).toFixed(0)}% of carrier payout` : 'Not assigned'}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={(e) => openTierChangeModal(selectedAgent, e)}
                    >
                      Change Tier
                    </button>
                  </div>
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

      {/* Change Tier Modal */}
      {showTierModal && tierChangeAgent && (
        <div className="modal-overlay" onClick={() => setShowTierModal(false)}>
          <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowTierModal(false)}>
              <X size={20} />
            </button>

            <h2>Change Commission Tier</h2>
            <p>Update {tierChangeAgent.name}'s commission tier. This will apply to all future sales.</p>

            <div className="current-tier-display">
              <span className="label">Current Tier:</span>
              <span className="value">
                {getCommissionTierById(tierChangeAgent.commissionTierId)?.name || 'None'} ({(getCommissionTierById(tierChangeAgent.commissionTierId)?.baseMultiplier * 100 || 0).toFixed(0)}%)
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">New Tier *</label>
              <select
                className="form-select"
                value={selectedTierId}
                onChange={(e) => setSelectedTierId(e.target.value)}
              >
                {tiers.map(tier => (
                  <option key={tier.id} value={tier.id}>
                    {tier.name} ({(tier.baseMultiplier * 100).toFixed(0)}%)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Reason (optional)</label>
              <textarea
                className="form-textarea"
                placeholder="Why is this tier being changed?"
                value={tierChangeReason}
                onChange={(e) => setTierChangeReason(e.target.value)}
                rows={2}
              />
            </div>

            {selectedTierId !== tierChangeAgent.commissionTierId && (
              <div className="warning-banner info">
                <AlertTriangle size={16} />
                <span>
                  The agent will receive a notification about this change.
                </span>
              </div>
            )}

            <div className="form-actions">
              <button className="btn btn-outline" onClick={() => setShowTierModal(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleTierChange}
                disabled={selectedTierId === tierChangeAgent.commissionTierId}
              >
                Update Tier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tier History Modal */}
      {showHistoryModal && selectedAgent && (
        <div className="modal-overlay" onClick={() => { setShowHistoryModal(false); setSelectedAgent(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => { setShowHistoryModal(false); setSelectedAgent(null); }}>
              <X size={20} />
            </button>

            <h2>Tier History</h2>
            <p>Commission tier changes for {selectedAgent.name}</p>

            <div className="history-list">
              {getTierHistory(selectedAgent.id).length === 0 ? (
                <div className="empty-history">
                  <History size={32} />
                  <p>No tier changes recorded yet.</p>
                </div>
              ) : (
                getTierHistory(selectedAgent.id).map(entry => {
                  const prevTier = getCommissionTierById(entry.previousTierId)
                  const newTier = getCommissionTierById(entry.newTierId)
                  return (
                    <div key={entry.id} className="history-item">
                      <div className="history-change">
                        <span className="old-tier">{prevTier?.name || 'Unknown'}</span>
                        <span className="arrow">→</span>
                        <span className="new-tier">{newTier?.name || 'Unknown'}</span>
                      </div>
                      <div className="history-meta">
                        <span className="history-date">
                          {new Date(entry.changedAt).toLocaleDateString()} at {new Date(entry.changedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {entry.reason && (
                          <span className="history-reason">"{entry.reason}"</span>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
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

              <div className="form-group">
                <label className="form-label">Commission Tier *</label>
                <select
                  className="form-select"
                  value={newAgent.commissionTierId}
                  onChange={(e) => setNewAgent({ ...newAgent, commissionTierId: e.target.value })}
                  required
                >
                  <option value="">Select a tier...</option>
                  {tiers.map(tier => (
                    <option key={tier.id} value={tier.id}>
                      {tier.name} ({(tier.baseMultiplier * 100).toFixed(0)}%)
                    </option>
                  ))}
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
