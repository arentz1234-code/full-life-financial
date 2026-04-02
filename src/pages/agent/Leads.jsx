import { useState, useMemo } from 'react'
import { Search, Plus, Phone, Mail, MapPin, Calendar, Filter, X, Grid, Columns, ChevronRight, Clock, DollarSign, ArrowRight, Flame, Thermometer, Snowflake, UserCheck, CheckCircle2, XCircle } from 'lucide-react'
import { agents, leads } from '../../data/mockData'
import './AgentLeads.css'

const PIPELINE_STAGES = [
  { id: 'new', label: 'New Leads', icon: Flame, color: '#EF4444' },
  { id: 'contacted', label: 'Contacted', icon: Phone, color: '#F59E0B' },
  { id: 'qualified', label: 'Qualified', icon: UserCheck, color: '#3B82F6' },
  { id: 'proposal', label: 'Proposal Sent', icon: Mail, color: '#8B5CF6' },
  { id: 'won', label: 'Won', icon: CheckCircle2, color: '#10B981' },
  { id: 'lost', label: 'Lost', icon: XCircle, color: '#6B7280' },
]

function AgentLeads() {
  const agent = agents[0]
  const agentLeads = leads.filter(l => l.assignedTo === agent.id)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedLead, setSelectedLead] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [viewMode, setViewMode] = useState('pipeline') // 'grid' or 'pipeline'
  const [draggedLead, setDraggedLead] = useState(null)
  const [leadStages, setLeadStages] = useState(() => {
    // Initialize lead stages based on status
    const stages = {}
    agentLeads.forEach(lead => {
      if (lead.status === 'hot') stages[lead.id] = 'new'
      else if (lead.status === 'warm') stages[lead.id] = 'contacted'
      else stages[lead.id] = 'qualified'
    })
    return stages
  })

  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    source: 'Website',
    productInterest: 'Term Life',
    notes: ''
  })

  const filteredLeads = useMemo(() => {
    return agentLeads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = !statusFilter || lead.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [agentLeads, searchTerm, statusFilter])

  // Group leads by pipeline stage
  const leadsByStage = useMemo(() => {
    const grouped = {}
    PIPELINE_STAGES.forEach(stage => {
      grouped[stage.id] = filteredLeads.filter(lead => leadStages[lead.id] === stage.id)
    })
    return grouped
  }, [filteredLeads, leadStages])

  const getStatusColor = (status) => {
    switch (status) {
      case 'hot': return 'var(--error)'
      case 'warm': return 'var(--warning)'
      case 'cold': return 'var(--info)'
      default: return 'var(--gray-400)'
    }
  }

  const handleAddLead = (e) => {
    e.preventDefault()
    alert(`Lead ${newLead.name} would be added!`)
    setShowAddForm(false)
    setNewLead({ name: '', email: '', phone: '', age: '', source: 'Website', productInterest: 'Term Life', notes: '' })
  }

  const handleDragStart = (e, lead) => {
    setDraggedLead(lead)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, stageId) => {
    e.preventDefault()
    if (draggedLead) {
      setLeadStages(prev => ({
        ...prev,
        [draggedLead.id]: stageId
      }))
    }
    setDraggedLead(null)
  }

  const handleDragEnd = () => {
    setDraggedLead(null)
  }

  const moveToStage = (leadId, stageId) => {
    setLeadStages(prev => ({
      ...prev,
      [leadId]: stageId
    }))
  }

  const totalValue = filteredLeads.reduce((sum, lead) => sum + lead.estimatedValue, 0)

  return (
    <div className="agent-leads">
      <div className="page-header">
        <div>
          <h1>Lead Pipeline</h1>
          <p>Manage and track your leads through the sales pipeline.</p>
        </div>
        <div className="header-actions">
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'pipeline' ? 'active' : ''}`}
              onClick={() => setViewMode('pipeline')}
              title="Pipeline View"
            >
              <Columns size={18} />
            </button>
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid size={18} />
            </button>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
            <Plus size={18} />
            Add Lead
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="leads-summary">
        <div className="summary-item total">
          <div className="summary-icon">
            <Filter size={20} />
          </div>
          <div className="summary-content">
            <span className="summary-value">{agentLeads.length}</span>
            <span className="summary-label">Total Leads</span>
          </div>
        </div>
        <div className="summary-item hot">
          <div className="summary-icon">
            <Flame size={20} />
          </div>
          <div className="summary-content">
            <span className="summary-value">{agentLeads.filter(l => l.status === 'hot').length}</span>
            <span className="summary-label">Hot Leads</span>
          </div>
        </div>
        <div className="summary-item warm">
          <div className="summary-icon">
            <Thermometer size={20} />
          </div>
          <div className="summary-content">
            <span className="summary-value">{agentLeads.filter(l => l.status === 'warm').length}</span>
            <span className="summary-label">Warm Leads</span>
          </div>
        </div>
        <div className="summary-item value">
          <div className="summary-icon">
            <DollarSign size={20} />
          </div>
          <div className="summary-content">
            <span className="summary-value">${(totalValue / 1000).toFixed(0)}K</span>
            <span className="summary-label">Pipeline Value</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="leads-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="hot">Hot</option>
            <option value="warm">Warm</option>
            <option value="cold">Cold</option>
          </select>
        </div>
      </div>

      {/* Pipeline View */}
      {viewMode === 'pipeline' && (
        <div className="pipeline-board">
          {PIPELINE_STAGES.map(stage => {
            const stageLeads = leadsByStage[stage.id] || []
            const stageValue = stageLeads.reduce((sum, lead) => sum + lead.estimatedValue, 0)
            const StageIcon = stage.icon

            return (
              <div
                key={stage.id}
                className={`pipeline-column ${draggedLead ? 'drag-active' : ''}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className="column-header" style={{ '--stage-color': stage.color }}>
                  <div className="column-title">
                    <StageIcon size={16} style={{ color: stage.color }} />
                    <span>{stage.label}</span>
                    <span className="column-count">{stageLeads.length}</span>
                  </div>
                  <span className="column-value">${stageValue.toLocaleString()}</span>
                </div>

                <div className="column-cards">
                  {stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      className={`pipeline-card ${draggedLead?.id === lead.id ? 'dragging' : ''}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead)}
                      onDragEnd={handleDragEnd}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="card-header">
                        <div className="card-avatar" style={{ background: getStatusColor(lead.status) }}>
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="card-info">
                          <span className="card-name">{lead.name}</span>
                          <span className={`status-badge ${lead.status}`}>{lead.status}</span>
                        </div>
                      </div>

                      <div className="card-details">
                        <div className="card-detail">
                          <Mail size={12} />
                          <span>{lead.email}</span>
                        </div>
                        <div className="card-detail">
                          <MapPin size={12} />
                          <span>{lead.location.city}, {lead.location.state}</span>
                        </div>
                      </div>

                      <div className="card-footer">
                        <span className="card-product">{lead.productInterest}</span>
                        <span className="card-value">${lead.estimatedValue.toLocaleString()}</span>
                      </div>

                      <div className="card-actions">
                        <button
                          className="mini-btn"
                          onClick={(e) => { e.stopPropagation() }}
                          title="Call"
                        >
                          <Phone size={14} />
                        </button>
                        <button
                          className="mini-btn"
                          onClick={(e) => { e.stopPropagation() }}
                          title="Email"
                        >
                          <Mail size={14} />
                        </button>
                        {stage.id !== 'won' && stage.id !== 'lost' && (
                          <button
                            className="mini-btn advance"
                            onClick={(e) => {
                              e.stopPropagation()
                              const currentIdx = PIPELINE_STAGES.findIndex(s => s.id === stage.id)
                              if (currentIdx < PIPELINE_STAGES.length - 2) {
                                moveToStage(lead.id, PIPELINE_STAGES[currentIdx + 1].id)
                              }
                            }}
                            title="Advance to next stage"
                          >
                            <ArrowRight size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="column-empty">
                      <span>No leads in this stage</span>
                      <span className="empty-hint">Drag leads here</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="leads-grid">
          {filteredLeads.map(lead => (
            <div
              key={lead.id}
              className="lead-card"
              onClick={() => setSelectedLead(lead)}
              style={{ borderLeftColor: getStatusColor(lead.status) }}
            >
              <div className="lead-header">
                <div className="lead-avatar">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="lead-title">
                  <h3>{lead.name}</h3>
                  <span className={`status-badge ${lead.status}`}>{lead.status}</span>
                </div>
              </div>

              <div className="lead-details">
                <div className="detail-item">
                  <Mail size={14} />
                  <span>{lead.email}</span>
                </div>
                <div className="detail-item">
                  <Phone size={14} />
                  <span>{lead.phone}</span>
                </div>
                <div className="detail-item">
                  <MapPin size={14} />
                  <span>{lead.location.city}, {lead.location.state}</span>
                </div>
              </div>

              <div className="lead-footer">
                <div className="product-tag">{lead.productInterest}</div>
                <div className="lead-value">${lead.estimatedValue.toLocaleString()}</div>
              </div>

              <div className="lead-actions">
                <button className="action-btn" onClick={(e) => { e.stopPropagation(); }}>
                  <Phone size={16} /> Call
                </button>
                <button className="action-btn" onClick={(e) => { e.stopPropagation(); }}>
                  <Mail size={16} /> Email
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedLead(null)}>
              <X size={20} />
            </button>

            <div className="modal-header">
              <div className="lead-avatar large" style={{ background: getStatusColor(selectedLead.status) }}>
                {selectedLead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2>{selectedLead.name}</h2>
                <span className={`status-badge ${selectedLead.status}`}>{selectedLead.status}</span>
              </div>
            </div>

            {/* Pipeline Stage Selector */}
            <div className="modal-section">
              <h4>Pipeline Stage</h4>
              <div className="stage-selector">
                {PIPELINE_STAGES.map(stage => {
                  const StageIcon = stage.icon
                  const isActive = leadStages[selectedLead.id] === stage.id
                  return (
                    <button
                      key={stage.id}
                      className={`stage-btn ${isActive ? 'active' : ''}`}
                      style={{ '--stage-color': stage.color }}
                      onClick={() => moveToStage(selectedLead.id, stage.id)}
                    >
                      <StageIcon size={14} />
                      <span>{stage.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="modal-section">
              <h4>Contact Information</h4>
              <div className="contact-grid">
                <div className="contact-item">
                  <Mail size={16} />
                  <div>
                    <span className="label">Email</span>
                    <span className="value">{selectedLead.email}</span>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone size={16} />
                  <div>
                    <span className="label">Phone</span>
                    <span className="value">{selectedLead.phone}</span>
                  </div>
                </div>
                <div className="contact-item">
                  <MapPin size={16} />
                  <div>
                    <span className="label">Location</span>
                    <span className="value">{selectedLead.location.city}, {selectedLead.location.state}</span>
                  </div>
                </div>
                <div className="contact-item">
                  <Calendar size={16} />
                  <div>
                    <span className="label">Last Contact</span>
                    <span className="value">{new Date(selectedLead.lastContact).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h4>Lead Details</h4>
              <div className="details-grid">
                <div className="detail-box">
                  <span className="label">Age</span>
                  <span className="value">{selectedLead.age} years</span>
                </div>
                <div className="detail-box">
                  <span className="label">Source</span>
                  <span className="value">{selectedLead.source}</span>
                </div>
                <div className="detail-box">
                  <span className="label">Product Interest</span>
                  <span className="value">{selectedLead.productInterest}</span>
                </div>
                <div className="detail-box">
                  <span className="label">Est. Value</span>
                  <span className="value highlight">${selectedLead.estimatedValue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h4>Notes</h4>
              <p className="notes-text">{selectedLead.notes}</p>
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary">
                <Phone size={18} /> Call Now
              </button>
              <button className="btn btn-outline">
                <Mail size={18} /> Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddForm(false)}>
              <X size={20} />
            </button>

            <h2>Add New Lead</h2>
            <p>Enter lead information to add to your pipeline.</p>

            <form onSubmit={handleAddLead}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newLead.age}
                    onChange={(e) => setNewLead({ ...newLead, age: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-input"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Source</label>
                  <select
                    className="form-select"
                    value={newLead.source}
                    onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                  >
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Trade Show">Trade Show</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Product Interest</label>
                  <select
                    className="form-select"
                    value={newLead.productInterest}
                    onChange={(e) => setNewLead({ ...newLead, productInterest: e.target.value })}
                  >
                    <option value="Term Life">Term Life</option>
                    <option value="Whole Life">Whole Life</option>
                    <option value="Universal Life">Universal Life</option>
                    <option value="Final Expense">Final Expense</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-textarea"
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgentLeads
