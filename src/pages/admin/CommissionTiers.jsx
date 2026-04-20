import { useState } from 'react'
import { Plus, Search, Edit2, Archive, X, Users, Percent, FileText, AlertTriangle, History } from 'lucide-react'
import {
  getCommissionTiers,
  getCommissionTierById,
  addCommissionTier,
  updateCommissionTier,
  archiveCommissionTier,
  getAgentCountByTier,
  addAuditLogEntry,
  adminUser
} from '../../data/mockData'
import './AdminCommissionTiers.css'

function CommissionTiers() {
  const [tiers, setTiers] = useState(getCommissionTiers())
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showArchiveModal, setShowArchiveModal] = useState(false)
  const [selectedTier, setSelectedTier] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    baseMultiplier: '',
    notes: ''
  })

  const filteredTiers = tiers.filter(tier =>
    tier.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const refreshTiers = () => {
    setTiers(getCommissionTiers())
  }

  const handleAddTier = (e) => {
    e.preventDefault()
    const multiplier = parseFloat(formData.baseMultiplier) / 100

    addCommissionTier({
      name: formData.name,
      baseMultiplier: multiplier,
      notes: formData.notes,
      createdByAdminId: adminUser.id
    })

    addAuditLogEntry({
      changedByAdminId: adminUser.id,
      entityType: 'tier',
      entityId: 'new',
      fieldChanged: 'created',
      oldValue: null,
      newValue: formData.name
    })

    refreshTiers()
    setShowAddModal(false)
    setFormData({ name: '', baseMultiplier: '', notes: '' })
  }

  const handleEditTier = (e) => {
    e.preventDefault()
    const newMultiplier = parseFloat(formData.baseMultiplier) / 100
    const oldTier = getCommissionTierById(selectedTier.id)

    if (oldTier.baseMultiplier !== newMultiplier) {
      addAuditLogEntry({
        changedByAdminId: adminUser.id,
        entityType: 'tier',
        entityId: selectedTier.id,
        fieldChanged: 'baseMultiplier',
        oldValue: String(oldTier.baseMultiplier),
        newValue: String(newMultiplier)
      })
    }

    if (oldTier.name !== formData.name) {
      addAuditLogEntry({
        changedByAdminId: adminUser.id,
        entityType: 'tier',
        entityId: selectedTier.id,
        fieldChanged: 'name',
        oldValue: oldTier.name,
        newValue: formData.name
      })
    }

    updateCommissionTier(selectedTier.id, {
      name: formData.name,
      baseMultiplier: newMultiplier,
      notes: formData.notes
    })

    refreshTiers()
    setShowEditModal(false)
    setSelectedTier(null)
    setFormData({ name: '', baseMultiplier: '', notes: '' })
  }

  const handleArchive = () => {
    addAuditLogEntry({
      changedByAdminId: adminUser.id,
      entityType: 'tier',
      entityId: selectedTier.id,
      fieldChanged: 'archived',
      oldValue: 'active',
      newValue: 'archived'
    })

    archiveCommissionTier(selectedTier.id)
    refreshTiers()
    setShowArchiveModal(false)
    setSelectedTier(null)
  }

  const openEditModal = (tier) => {
    setSelectedTier(tier)
    setFormData({
      name: tier.name,
      baseMultiplier: String(tier.baseMultiplier * 100),
      notes: tier.notes || ''
    })
    setShowEditModal(true)
  }

  const openArchiveModal = (tier) => {
    setSelectedTier(tier)
    setShowArchiveModal(true)
  }

  return (
    <div className="admin-commission-tiers">
      <div className="page-header">
        <div>
          <h1>Commission Tiers</h1>
          <p>Manage commission tier levels and multipliers for your agents.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            Add Tier
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="tiers-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search tiers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Info Banner */}
      <div className="info-banner">
        <FileText size={18} />
        <p>
          <strong>How commission tiers work:</strong> Each agent is assigned a tier that determines their commission percentage.
          When a sale is logged, the agent earns: <code>Annual Premium × Carrier Rate × Tier Multiplier</code>.
          Changes to tiers only affect future sales — existing sales keep their original rates.
        </p>
      </div>

      {/* Tiers Table */}
      <div className="tiers-table-container">
        <table className="tiers-table">
          <thead>
            <tr>
              <th>Tier Name</th>
              <th>Multiplier</th>
              <th>Agents</th>
              <th>Notes</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTiers.map(tier => {
              const agentCount = getAgentCountByTier(tier.id)
              return (
                <tr key={tier.id}>
                  <td>
                    <div className="tier-name">
                      <span className="tier-badge" style={{
                        background: `hsl(${tier.baseMultiplier * 200}, 60%, 45%)`
                      }}>
                        {tier.name.charAt(0)}
                      </span>
                      <span>{tier.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="multiplier-badge">
                      <Percent size={14} />
                      {(tier.baseMultiplier * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td>
                    <span className="agents-count">
                      <Users size={14} />
                      {agentCount} agent{agentCount !== 1 ? 's' : ''}
                    </span>
                  </td>
                  <td>
                    <span className="tier-notes">{tier.notes || '—'}</span>
                  </td>
                  <td>
                    <span className="tier-date">
                      {new Date(tier.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit"
                        onClick={() => openEditModal(tier)}
                        title="Edit Tier"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="action-btn archive"
                        onClick={() => openArchiveModal(tier)}
                        title="Archive Tier"
                        disabled={agentCount > 0}
                      >
                        <Archive size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Add Tier Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddModal(false)}>
              <X size={20} />
            </button>

            <h2>Add Commission Tier</h2>
            <p>Create a new commission tier for your agents.</p>

            <form onSubmit={handleAddTier}>
              <div className="form-group">
                <label className="form-label">Tier Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Senior Agent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Commission Multiplier (%) *</label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g., 70"
                    min="1"
                    max="100"
                    value={formData.baseMultiplier}
                    onChange={(e) => setFormData({ ...formData, baseMultiplier: e.target.value })}
                    required
                  />
                  <span className="input-suffix">%</span>
                </div>
                <span className="form-hint">
                  Agent receives this percentage of the carrier payout
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-textarea"
                  placeholder="Optional description of this tier..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Tier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Tier Modal */}
      {showEditModal && selectedTier && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowEditModal(false)}>
              <X size={20} />
            </button>

            <h2>Edit Commission Tier</h2>
            <p>Update the tier settings. Changes apply to future sales only.</p>

            <form onSubmit={handleEditTier}>
              <div className="form-group">
                <label className="form-label">Tier Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Commission Multiplier (%) *</label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    className="form-input"
                    min="1"
                    max="100"
                    value={formData.baseMultiplier}
                    onChange={(e) => setFormData({ ...formData, baseMultiplier: e.target.value })}
                    required
                  />
                  <span className="input-suffix">%</span>
                </div>
                <span className="form-hint">
                  Agent receives this percentage of the carrier payout
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-textarea"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Archive Confirmation Modal */}
      {showArchiveModal && selectedTier && (
        <div className="modal-overlay" onClick={() => setShowArchiveModal(false)}>
          <div className="modal-content modal-confirm" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowArchiveModal(false)}>
              <X size={20} />
            </button>

            <div className="confirm-icon warning">
              <AlertTriangle size={32} />
            </div>

            <h2>Archive Tier?</h2>
            <p>
              Are you sure you want to archive <strong>{selectedTier.name}</strong>?
              This tier will no longer be available for assignment.
            </p>

            {getAgentCountByTier(selectedTier.id) > 0 && (
              <div className="warning-banner">
                <AlertTriangle size={16} />
                <span>
                  Cannot archive: {getAgentCountByTier(selectedTier.id)} agent(s) are currently assigned to this tier.
                  Reassign them first.
                </span>
              </div>
            )}

            <div className="form-actions">
              <button className="btn btn-outline" onClick={() => setShowArchiveModal(false)}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleArchive}
                disabled={getAgentCountByTier(selectedTier.id) > 0}
              >
                Archive Tier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommissionTiers
