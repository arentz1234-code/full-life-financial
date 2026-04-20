import { useState } from 'react'
import { Search, Download, Filter, Check, X, DollarSign, Calendar, Building2, User } from 'lucide-react'
import {
  getSales,
  getAgentById,
  getCarrierById,
  getCommissionTierById,
  updateSalePaidStatus,
  addNotification,
  getAgents,
  getCarriers
} from '../../data/mockData'
import './AdminSales.css'

function AdminSales() {
  const [sales, setSales] = useState(getSales())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAgent, setFilterAgent] = useState('')
  const [filterCarrier, setFilterCarrier] = useState('')
  const [filterPaid, setFilterPaid] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const agents = getAgents()
  const carriers = getCarriers()

  const refreshSales = () => {
    setSales(getSales())
  }

  const filteredSales = sales.filter(sale => {
    const agent = getAgentById(sale.agentId)
    const carrier = getCarrierById(sale.carrierId)

    const matchesSearch =
      sale.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent?.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAgent = !filterAgent || sale.agentId === filterAgent
    const matchesCarrier = !filterCarrier || sale.carrierId === filterCarrier
    const matchesPaid =
      filterPaid === '' ||
      (filterPaid === 'paid' && sale.isPaid) ||
      (filterPaid === 'unpaid' && !sale.isPaid)

    return matchesSearch && matchesAgent && matchesCarrier && matchesPaid
  }).sort((a, b) => new Date(b.saleDate) - new Date(a.saleDate))

  const handleTogglePaid = (saleId, currentStatus) => {
    const newStatus = !currentStatus
    updateSalePaidStatus(saleId, newStatus)

    // Send notification to agent if marked as paid
    if (newStatus) {
      const sale = sales.find(s => s.id === saleId)
      if (sale) {
        addNotification({
          recipientAgentId: sale.agentId,
          type: 'paid_status_changed',
          message: `Your sale to ${sale.clientName} has been marked as paid.`,
          link: '/agent/sales'
        })
      }
    }

    refreshSales()
  }

  const exportToCSV = () => {
    const headers = ['Client', 'Agent', 'Carrier', 'Monthly Premium', 'Annual Premium', 'Commission', 'Tier', 'Sale Date', 'Paid', 'Paid Date']
    const rows = filteredSales.map(sale => {
      const agent = getAgentById(sale.agentId)
      const carrier = getCarrierById(sale.carrierId)
      const tier = getCommissionTierById(sale.commissionTierIdSnapshot)
      return [
        sale.clientName,
        agent?.name || 'Unknown',
        carrier?.name || 'Unknown',
        sale.monthlyPremium,
        sale.monthlyPremium * 12,
        sale.commission,
        tier?.name || 'Unknown',
        sale.saleDate,
        sale.isPaid ? 'Yes' : 'No',
        sale.paidDate || ''
      ]
    })

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sales-export-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Calculate summary stats
  const totalPremium = filteredSales.reduce((sum, s) => sum + (s.monthlyPremium * 12), 0)
  const totalCommission = filteredSales.reduce((sum, s) => sum + s.commission, 0)
  const paidCommission = filteredSales.filter(s => s.isPaid).reduce((sum, s) => sum + s.commission, 0)
  const unpaidCommission = filteredSales.filter(s => !s.isPaid).reduce((sum, s) => sum + s.commission, 0)

  return (
    <div className="admin-sales">
      <div className="page-header">
        <div>
          <h1>All Sales</h1>
          <p>View and manage all agent sales. Toggle paid status to track commission payouts.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={exportToCSV}>
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="sales-summary">
        <div className="summary-card">
          <div className="summary-icon" style={{ background: 'rgba(27, 94, 32, 0.1)', color: 'var(--primary)' }}>
            <DollarSign size={20} />
          </div>
          <div className="summary-content">
            <span className="summary-value">${totalPremium.toLocaleString()}</span>
            <span className="summary-label">Total Annual Premium</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon" style={{ background: 'rgba(212, 168, 83, 0.1)', color: 'var(--accent)' }}>
            <DollarSign size={20} />
          </div>
          <div className="summary-content">
            <span className="summary-value">${totalCommission.toLocaleString()}</span>
            <span className="summary-label">Total Commission</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
            <Check size={20} />
          </div>
          <div className="summary-content">
            <span className="summary-value">${paidCommission.toLocaleString()}</span>
            <span className="summary-label">Paid Out</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }}>
            <X size={20} />
          </div>
          <div className="summary-content">
            <span className="summary-value">${unpaidCommission.toLocaleString()}</span>
            <span className="summary-label">Outstanding</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sales-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by client or agent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className={`btn btn-outline filter-btn ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filters
          {(filterAgent || filterCarrier || filterPaid) && (
            <span className="filter-count">
              {[filterAgent, filterCarrier, filterPaid].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Agent</label>
            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
            >
              <option value="">All Agents</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Carrier</label>
            <select
              value={filterCarrier}
              onChange={(e) => setFilterCarrier(e.target.value)}
            >
              <option value="">All Carriers</option>
              {carriers.map(carrier => (
                <option key={carrier.id} value={carrier.id}>{carrier.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Payment Status</label>
            <select
              value={filterPaid}
              onChange={(e) => setFilterPaid(e.target.value)}
            >
              <option value="">All</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => {
              setFilterAgent('')
              setFilterCarrier('')
              setFilterPaid('')
            }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Sales Table */}
      <div className="sales-table-container">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Agent</th>
              <th>Carrier</th>
              <th>Monthly Premium</th>
              <th>Commission</th>
              <th>Tier Rate</th>
              <th>Sale Date</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map(sale => {
              const agent = getAgentById(sale.agentId)
              const carrier = getCarrierById(sale.carrierId)
              const tier = getCommissionTierById(sale.commissionTierIdSnapshot)

              return (
                <tr key={sale.id}>
                  <td>
                    <div className="client-info">
                      <span className="client-name">{sale.clientName}</span>
                      {sale.clientPhone && (
                        <span className="client-phone">{sale.clientPhone}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="agent-cell">
                      <div className="avatar avatar-sm" style={{ background: 'var(--primary)' }}>
                        {agent?.avatar}
                      </div>
                      <span>{agent?.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="carrier-name">{carrier?.name}</span>
                  </td>
                  <td>
                    <span className="premium-amount">${sale.monthlyPremium.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="commission-amount">${sale.commission.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="tier-badge">
                      {(sale.agentMultiplierSnapshot * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td>
                    <span className="sale-date">
                      {new Date(sale.saleDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`paid-toggle ${sale.isPaid ? 'paid' : 'unpaid'}`}
                      onClick={() => handleTogglePaid(sale.id, sale.isPaid)}
                      title={sale.isPaid ? `Paid on ${sale.paidDate}` : 'Mark as paid'}
                    >
                      {sale.isPaid ? (
                        <>
                          <Check size={14} />
                          <span>Paid</span>
                        </>
                      ) : (
                        <>
                          <X size={14} />
                          <span>Unpaid</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {filteredSales.length === 0 && (
        <div className="empty-state">
          <DollarSign size={48} />
          <h3>No sales found</h3>
          <p>Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  )
}

export default AdminSales
