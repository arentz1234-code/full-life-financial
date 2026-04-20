import { useState, useEffect } from 'react'
import { Plus, Search, DollarSign, FileText, CheckCircle, X, Calculator, Building2, Sparkles } from 'lucide-react'
import {
  agents,
  getSalesByAgent,
  getCarriers,
  getCarrierById,
  addSale,
  calculateCommission,
  getAgentTierInfo
} from '../../data/mockData'
import './AgentSales.css'

function AgentSales() {
  const agent = agents[0]
  const [agentSales, setAgentSales] = useState(getSalesByAgent(agent.id))
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const carriers = getCarriers()
  const tierInfo = getAgentTierInfo(agent.id)

  const [newSale, setNewSale] = useState({
    clientName: '',
    clientPhone: '',
    carrierId: carriers[0]?.id || '',
    monthlyPremium: '',
    coverageAmount: '',
    notes: ''
  })

  const [commissionPreview, setCommissionPreview] = useState(null)

  // Calculate commission preview when form changes
  useEffect(() => {
    if (newSale.monthlyPremium && newSale.carrierId) {
      const preview = calculateCommission(
        parseFloat(newSale.monthlyPremium),
        newSale.carrierId,
        agent.id
      )
      setCommissionPreview(preview)
    } else {
      setCommissionPreview(null)
    }
  }, [newSale.monthlyPremium, newSale.carrierId, agent.id])

  const refreshSales = () => {
    setAgentSales(getSalesByAgent(agent.id))
  }

  const filteredSales = agentSales.filter(sale =>
    sale.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.saleDate) - new Date(a.saleDate))

  const totalCommission = agentSales.reduce((sum, s) => sum + s.commission, 0)
  const paidCommission = agentSales.filter(s => s.isPaid).reduce((sum, s) => sum + s.commission, 0)
  const unpaidCommission = agentSales.filter(s => !s.isPaid).reduce((sum, s) => sum + s.commission, 0)
  const avgCommission = agentSales.length > 0 ? Math.round(totalCommission / agentSales.length) : 0

  const handleAddSale = (e) => {
    e.preventDefault()

    addSale({
      agentId: agent.id,
      carrierId: newSale.carrierId,
      clientName: newSale.clientName,
      clientPhone: newSale.clientPhone || null,
      monthlyPremium: parseFloat(newSale.monthlyPremium),
      coverageAmount: newSale.coverageAmount ? parseFloat(newSale.coverageAmount) : null,
      notes: newSale.notes || null,
      saleDate: new Date().toISOString().split('T')[0]
    })

    refreshSales()
    setShowAddForm(false)
    setNewSale({
      clientName: '',
      clientPhone: '',
      carrierId: carriers[0]?.id || '',
      monthlyPremium: '',
      coverageAmount: '',
      notes: ''
    })
  }

  return (
    <div className="agent-sales">
      <div className="page-header">
        <div>
          <h1>My Sales</h1>
          <p>Track your closed deals and record new sales.</p>
        </div>
        <button className="btn btn-primary btn-lg log-sale-btn" onClick={() => setShowAddForm(true)}>
          <Plus size={20} />
          Log a Sale
        </button>
      </div>

      {/* Summary Stats */}
      <div className="sales-summary">
        <div className="summary-card highlight">
          <div className="summary-icon">
            <DollarSign size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-value">${totalCommission.toLocaleString()}</span>
            <span className="summary-label">Total Commission</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon success">
            <CheckCircle size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-value">${paidCommission.toLocaleString()}</span>
            <span className="summary-label">Paid</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon warning">
            <FileText size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-value">${unpaidCommission.toLocaleString()}</span>
            <span className="summary-label">Pending</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">
            <Calculator size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-value">${avgCommission.toLocaleString()}</span>
            <span className="summary-label">Avg/Policy</span>
          </div>
        </div>
      </div>

      {/* Current Tier Info */}
      {tierInfo && (
        <div className="tier-info-banner">
          <Sparkles size={18} />
          <span>
            Your current tier: <strong>{tierInfo.name}</strong> ({(tierInfo.baseMultiplier * 100).toFixed(0)}% of carrier payout)
          </span>
        </div>
      )}

      {/* Toolbar */}
      <div className="sales-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search sales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="sales-count">{filteredSales.length} sale{filteredSales.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Sales Table */}
      <div className="sales-table-wrapper">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Carrier</th>
              <th>Premium</th>
              <th>Commission</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map(sale => {
              const carrier = getCarrierById(sale.carrierId)
              return (
                <tr key={sale.id}>
                  <td>
                    <div className="client-cell">
                      <div className="client-avatar">
                        {sale.clientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="client-info">
                        <span className="client-name">{sale.clientName}</span>
                        {sale.clientPhone && (
                          <span className="client-phone">{sale.clientPhone}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="carrier-badge">{carrier?.name || 'Unknown'}</span>
                  </td>
                  <td>
                    <span className="premium-amount">${sale.monthlyPremium}/mo</span>
                  </td>
                  <td>
                    <span className="commission-amount">${sale.commission.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="sale-date">{new Date(sale.saleDate).toLocaleDateString()}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${sale.isPaid ? 'paid' : 'pending'}`}>
                      {sale.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {filteredSales.length === 0 && (
        <div className="empty-state">
          <FileText size={48} />
          <h3>No sales yet</h3>
          <p>Log your first sale to start tracking your commissions!</p>
          <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
            <Plus size={18} />
            Log a Sale
          </button>
        </div>
      )}

      {/* Log Sale Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content log-sale-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddForm(false)}>
              <X size={20} />
            </button>

            <div className="modal-header-icon">
              <DollarSign size={28} />
            </div>

            <h2>Log a Sale</h2>
            <p>Enter the details of your closed sale to calculate your commission.</p>

            <form onSubmit={handleAddSale}>
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., John Smith"
                  value={newSale.clientName}
                  onChange={(e) => setNewSale({ ...newSale, clientName: e.target.value })}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Carrier *</label>
                <select
                  className="form-select"
                  value={newSale.carrierId}
                  onChange={(e) => setNewSale({ ...newSale, carrierId: e.target.value })}
                  required
                >
                  {carriers.map(carrier => (
                    <option key={carrier.id} value={carrier.id}>
                      {carrier.name} ({(carrier.commissionRate * 100).toFixed(0)}% rate)
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Monthly Premium *</label>
                <div className="input-with-prefix">
                  <span className="input-prefix">$</span>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g., 150"
                    value={newSale.monthlyPremium}
                    onChange={(e) => setNewSale({ ...newSale, monthlyPremium: e.target.value })}
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Commission Preview */}
              {commissionPreview && (
                <div className="commission-preview">
                  <div className="preview-header">
                    <Calculator size={16} />
                    <span>Commission Preview</span>
                  </div>
                  <div className="preview-breakdown">
                    <div className="preview-row">
                      <span>Annual Premium</span>
                      <span>${commissionPreview.annualPremium.toLocaleString()}</span>
                    </div>
                    <div className="preview-row">
                      <span>× Carrier Rate ({commissionPreview.carrierName})</span>
                      <span>{(commissionPreview.carrierRate * 100).toFixed(0)}%</span>
                    </div>
                    <div className="preview-row">
                      <span>× Your Tier ({commissionPreview.tierName})</span>
                      <span>{(commissionPreview.tierMultiplier * 100).toFixed(0)}%</span>
                    </div>
                    <div className="preview-total">
                      <span>Your Commission</span>
                      <span className="commission-value">${commissionPreview.agentCommission.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-row optional-fields">
                <div className="form-group">
                  <label className="form-label">Coverage Amount</label>
                  <div className="input-with-prefix">
                    <span className="input-prefix">$</span>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Optional"
                      value={newSale.coverageAmount}
                      onChange={(e) => setNewSale({ ...newSale, coverageAmount: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Client Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Optional"
                    value={newSale.clientPhone}
                    onChange={(e) => setNewSale({ ...newSale, clientPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-textarea"
                  value={newSale.notes}
                  onChange={(e) => setNewSale({ ...newSale, notes: e.target.value })}
                  rows={2}
                  placeholder="Any additional notes..."
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-lg">
                  <CheckCircle size={18} />
                  Log Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgentSales
