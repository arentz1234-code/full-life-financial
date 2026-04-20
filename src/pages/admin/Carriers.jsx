import { useState } from 'react'
import { Plus, Search, Edit2, Archive, X, Percent, FileText, AlertTriangle } from 'lucide-react'
import {
  getCarriers,
  getAllCarriers,
  getCarrierById,
  addCarrier,
  updateCarrier,
  archiveCarrier,
  addAuditLogEntry,
  adminUser
} from '../../data/mockData'
import './AdminCarriers.css'

function Carriers() {
  const [carriers, setCarriers] = useState(getCarriers())
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showArchiveModal, setShowArchiveModal] = useState(false)
  const [selectedCarrier, setSelectedCarrier] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    commissionRate: '',
    notes: ''
  })

  const filteredCarriers = carriers.filter(carrier =>
    carrier.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const refreshCarriers = () => {
    setCarriers(getCarriers())
  }

  const handleAddCarrier = (e) => {
    e.preventDefault()
    const rate = parseFloat(formData.commissionRate) / 100

    addCarrier({
      name: formData.name,
      commissionRate: rate,
      notes: formData.notes
    })

    addAuditLogEntry({
      changedByAdminId: adminUser.id,
      entityType: 'carrier',
      entityId: 'new',
      fieldChanged: 'created',
      oldValue: null,
      newValue: formData.name
    })

    refreshCarriers()
    setShowAddModal(false)
    setFormData({ name: '', commissionRate: '', notes: '' })
  }

  const handleEditCarrier = (e) => {
    e.preventDefault()
    const newRate = parseFloat(formData.commissionRate) / 100
    const oldCarrier = getCarrierById(selectedCarrier.id)

    if (oldCarrier.commissionRate !== newRate) {
      addAuditLogEntry({
        changedByAdminId: adminUser.id,
        entityType: 'carrier',
        entityId: selectedCarrier.id,
        fieldChanged: 'commissionRate',
        oldValue: String(oldCarrier.commissionRate),
        newValue: String(newRate)
      })
    }

    if (oldCarrier.name !== formData.name) {
      addAuditLogEntry({
        changedByAdminId: adminUser.id,
        entityType: 'carrier',
        entityId: selectedCarrier.id,
        fieldChanged: 'name',
        oldValue: oldCarrier.name,
        newValue: formData.name
      })
    }

    updateCarrier(selectedCarrier.id, {
      name: formData.name,
      commissionRate: newRate,
      notes: formData.notes
    })

    refreshCarriers()
    setShowEditModal(false)
    setSelectedCarrier(null)
    setFormData({ name: '', commissionRate: '', notes: '' })
  }

  const handleArchive = () => {
    addAuditLogEntry({
      changedByAdminId: adminUser.id,
      entityType: 'carrier',
      entityId: selectedCarrier.id,
      fieldChanged: 'archived',
      oldValue: 'active',
      newValue: 'archived'
    })

    archiveCarrier(selectedCarrier.id)
    refreshCarriers()
    setShowArchiveModal(false)
    setSelectedCarrier(null)
  }

  const openEditModal = (carrier) => {
    setSelectedCarrier(carrier)
    setFormData({
      name: carrier.name,
      commissionRate: String(carrier.commissionRate * 100),
      notes: carrier.notes || ''
    })
    setShowEditModal(true)
  }

  const openArchiveModal = (carrier) => {
    setSelectedCarrier(carrier)
    setShowArchiveModal(true)
  }

  return (
    <div className="admin-carriers">
      <div className="page-header">
        <div>
          <h1>Carriers</h1>
          <p>Manage insurance carriers and their commission rates.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            Add Carrier
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="carriers-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search carriers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Info Banner */}
      <div className="info-banner">
        <FileText size={18} />
        <p>
          <strong>How carrier rates work:</strong> Each carrier has a commission rate (e.g., 110% means the carrier pays 110% of the annual premium as commission).
          When a sale is logged, agent commission = <code>Annual Premium × Carrier Rate × Agent Tier %</code>.
        </p>
      </div>

      {/* Carriers Grid */}
      <div className="carriers-grid">
        {filteredCarriers.map(carrier => (
          <div key={carrier.id} className="carrier-card">
            <div className="carrier-header">
              <div className="carrier-logo">
                {carrier.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="carrier-actions">
                <button
                  className="action-btn edit"
                  onClick={() => openEditModal(carrier)}
                  title="Edit Carrier"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  className="action-btn archive"
                  onClick={() => openArchiveModal(carrier)}
                  title="Archive Carrier"
                >
                  <Archive size={16} />
                </button>
              </div>
            </div>

            <h3>{carrier.name}</h3>

            <div className="carrier-rate">
              <Percent size={16} />
              <span className="rate-value">{(carrier.commissionRate * 100).toFixed(0)}%</span>
              <span className="rate-label">Commission Rate</span>
            </div>

            {carrier.notes && (
              <p className="carrier-notes">{carrier.notes}</p>
            )}

            <div className="carrier-footer">
              <span className="status-badge active">Active</span>
              <span className="carrier-date">
                Added {new Date(carrier.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Carrier Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddModal(false)}>
              <X size={20} />
            </button>

            <h2>Add Carrier</h2>
            <p>Add a new insurance carrier with their commission rate.</p>

            <form onSubmit={handleAddCarrier}>
              <div className="form-group">
                <label className="form-label">Carrier Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Mutual of Omaha"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Commission Rate (%) *</label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g., 110"
                    min="50"
                    max="200"
                    value={formData.commissionRate}
                    onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
                    required
                  />
                  <span className="input-suffix">%</span>
                </div>
                <span className="form-hint">
                  Percentage of annual premium paid as total commission (e.g., 110% = carrier pays $1,100 on a $1,000 annual premium)
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-textarea"
                  placeholder="Optional notes about this carrier..."
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
                  Add Carrier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Carrier Modal */}
      {showEditModal && selectedCarrier && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowEditModal(false)}>
              <X size={20} />
            </button>

            <h2>Edit Carrier</h2>
            <p>Update carrier settings. Changes apply to future sales only.</p>

            <form onSubmit={handleEditCarrier}>
              <div className="form-group">
                <label className="form-label">Carrier Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Commission Rate (%) *</label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    className="form-input"
                    min="50"
                    max="200"
                    value={formData.commissionRate}
                    onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
                    required
                  />
                  <span className="input-suffix">%</span>
                </div>
                <span className="form-hint">
                  Percentage of annual premium paid as total commission
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
      {showArchiveModal && selectedCarrier && (
        <div className="modal-overlay" onClick={() => setShowArchiveModal(false)}>
          <div className="modal-content modal-confirm" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowArchiveModal(false)}>
              <X size={20} />
            </button>

            <div className="confirm-icon warning">
              <AlertTriangle size={32} />
            </div>

            <h2>Archive Carrier?</h2>
            <p>
              Are you sure you want to archive <strong>{selectedCarrier.name}</strong>?
              This carrier will no longer be available for new sales.
            </p>

            <div className="form-actions">
              <button className="btn btn-outline" onClick={() => setShowArchiveModal(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleArchive}>
                Archive Carrier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carriers
