import { useState } from 'react'
import { Plus, Search, DollarSign, FileText, Calendar, User, X, CheckCircle } from 'lucide-react'
import { agents, sales } from '../../data/mockData'
import './AgentSales.css'

function AgentSales() {
  const agent = agents[0]
  const agentSales = sales.filter(s => s.agentId === agent.id)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSale, setNewSale] = useState({
    clientName: '',
    productType: 'Term Life - 20 Year',
    premium: '',
    coverageAmount: '',
    notes: ''
  })

  const filteredSales = agentSales.filter(sale =>
    sale.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalCommission = agentSales.reduce((sum, s) => sum + s.commission, 0)
  const totalPremium = agentSales.reduce((sum, s) => sum + s.premium, 0)
  const avgPolicyValue = agentSales.length > 0 ? Math.round(totalCommission / agentSales.length) : 0

  const handleAddSale = (e) => {
    e.preventDefault()
    alert(`Sale for ${newSale.clientName} would be recorded!`)
    setShowAddForm(false)
    setNewSale({ clientName: '', productType: 'Term Life - 20 Year', premium: '', coverageAmount: '', notes: '' })
  }

  return (
    <div className="agent-sales">
      <div className="page-header">
        <div>
          <h1>My Sales</h1>
          <p>Track your closed deals and record new sales.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
          <Plus size={18} />
          Record Sale
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
          <div className="summary-icon">
            <FileText size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-value">{agentSales.length}</span>
            <span className="summary-label">Policies Sold</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">
            <DollarSign size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-value">${totalPremium}</span>
            <span className="summary-label">Monthly Premium</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">
            <CheckCircle size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-value">${avgPolicyValue.toLocaleString()}</span>
            <span className="summary-label">Avg Commission</span>
          </div>
        </div>
      </div>

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
      </div>

      {/* Sales Table */}
      <div className="sales-table-wrapper">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Product</th>
              <th>Coverage</th>
              <th>Premium</th>
              <th>Commission</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map(sale => (
              <tr key={sale.id}>
                <td>
                  <div className="client-cell">
                    <div className="client-avatar">
                      {sale.clientName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="client-info">
                      <span className="client-name">{sale.clientName}</span>
                      <span className="client-location">{sale.location.city}, {sale.location.state}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="product-badge">{sale.productType}</span>
                </td>
                <td>${sale.coverageAmount.toLocaleString()}</td>
                <td>${sale.premium}/mo</td>
                <td className="commission">${sale.commission.toLocaleString()}</td>
                <td>{new Date(sale.closeDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${sale.status}`}>{sale.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Sale Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddForm(false)}>
              <X size={20} />
            </button>

            <h2>Record New Sale</h2>
            <p>Enter the details of your closed sale.</p>

            <form onSubmit={handleAddSale}>
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={newSale.clientName}
                  onChange={(e) => setNewSale({ ...newSale, clientName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Product Type *</label>
                <select
                  className="form-select"
                  value={newSale.productType}
                  onChange={(e) => setNewSale({ ...newSale, productType: e.target.value })}
                  required
                >
                  <option value="Term Life - 10 Year">Term Life - 10 Year</option>
                  <option value="Term Life - 20 Year">Term Life - 20 Year</option>
                  <option value="Term Life - 30 Year">Term Life - 30 Year</option>
                  <option value="Whole Life">Whole Life</option>
                  <option value="Universal Life">Universal Life</option>
                  <option value="Final Expense">Final Expense</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Coverage Amount *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newSale.coverageAmount}
                    onChange={(e) => setNewSale({ ...newSale, coverageAmount: e.target.value })}
                    placeholder="e.g., 500000"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Monthly Premium *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newSale.premium}
                    onChange={(e) => setNewSale({ ...newSale, premium: e.target.value })}
                    placeholder="e.g., 150"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-textarea"
                  value={newSale.notes}
                  onChange={(e) => setNewSale({ ...newSale, notes: e.target.value })}
                  rows={3}
                  placeholder="Any additional notes about this sale..."
                />
              </div>

              <div className="form-info">
                <p>Commission will be automatically calculated based on product type and premium.</p>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Record Sale
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
