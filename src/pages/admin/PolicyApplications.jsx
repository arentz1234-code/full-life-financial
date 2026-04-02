import { useState } from 'react'
import { Search, Download, Eye, Mail, Phone, Calendar, FileText, User, Shield, CheckCircle, Clock, AlertCircle, X, DollarSign } from 'lucide-react'
import { getPolicyApplications, updatePolicyApplicationStatus, agents } from '../../data/mockData'
import './AdminPolicyApplications.css'

function PolicyApplications() {
  const [applications, setApplications] = useState(getPolicyApplications())
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedApp, setSelectedApp] = useState(null)

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.productType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return { label: 'Pending Review', color: 'warning' }
      case 'under_review':
        return { label: 'Under Review', color: 'info' }
      case 'documents_needed':
        return { label: 'Documents Needed', color: 'accent' }
      case 'approved':
        return { label: 'Approved', color: 'success' }
      case 'declined':
        return { label: 'Declined', color: 'error' }
      default:
        return { label: status, color: 'gray' }
    }
  }

  const getAgentName = (agentId) => {
    const agent = agents.find(a => a.id === agentId)
    return agent ? agent.name : 'Unassigned'
  }

  const handleStatusChange = (appId, newStatus) => {
    updatePolicyApplicationStatus(appId, newStatus)
    setApplications(getPolicyApplications())
    if (selectedApp?.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus })
    }
  }

  const totalCoverage = applications.reduce((sum, app) => sum + app.coverageAmount, 0)
  const totalMonthlyPremium = applications.reduce((sum, app) => sum + app.monthlyBudget, 0)

  return (
    <div className="policy-applications">
      <div className="page-header">
        <div>
          <h1>Policy Applications</h1>
          <p>Review and manage life insurance applications from customers.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <Download size={18} />
            Export All
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="app-stats">
        <div className="stat-card">
          <div className="stat-icon pending">
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{applications.filter(a => a.status === 'pending').length}</span>
            <span className="stat-label">Pending Review</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon review">
            <Eye size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{applications.filter(a => a.status === 'under_review').length}</span>
            <span className="stat-label">Under Review</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon approved">
            <CheckCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{applications.filter(a => a.status === 'approved').length}</span>
            <span className="stat-label">Approved</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon coverage">
            <Shield size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">${(totalCoverage / 1000000).toFixed(1)}M</span>
            <span className="stat-label">Total Coverage</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="under_review">Under Review</option>
          <option value="documents_needed">Documents Needed</option>
          <option value="approved">Approved</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="data-table">
        <table className="table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Product</th>
              <th>Coverage</th>
              <th>Premium</th>
              <th>Agent</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map(app => {
              const statusBadge = getStatusBadge(app.status)
              return (
                <tr key={app.id}>
                  <td>
                    <div className="applicant-cell">
                      <div className="avatar" style={{ background: `hsl(${app.id.charCodeAt(4) * 30}, 60%, 45%)` }}>
                        {app.firstName[0]}{app.lastName[0]}
                      </div>
                      <div className="applicant-info">
                        <strong>{app.firstName} {app.lastName}</strong>
                        <span>{app.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="product-badge">
                      <Shield size={14} />
                      {app.productType}
                    </span>
                  </td>
                  <td>
                    <strong>${app.coverageAmount.toLocaleString()}</strong>
                  </td>
                  <td>${app.monthlyBudget}/mo</td>
                  <td>{getAgentName(app.assignedAgent)}</td>
                  <td>{new Date(app.submittedAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>
                  </td>
                  <td>
                    <button className="view-btn" onClick={() => setSelectedApp(app)}>
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filteredApplications.length === 0 && (
          <div className="empty-state">
            <FileText size={48} />
            <h3>No applications found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedApp(null)}>
              <X size={20} />
            </button>

            <div className="modal-header">
              <div className="avatar avatar-lg" style={{ background: `hsl(${selectedApp.id.charCodeAt(4) * 30}, 60%, 45%)` }}>
                {selectedApp.firstName[0]}{selectedApp.lastName[0]}
              </div>
              <div className="modal-header-info">
                <h2>{selectedApp.firstName} {selectedApp.lastName}</h2>
                <span className={`status-badge ${getStatusBadge(selectedApp.status).color}`}>
                  {getStatusBadge(selectedApp.status).label}
                </span>
              </div>
            </div>

            <div className="modal-section">
              <h4>Contact Information</h4>
              <div className="info-grid">
                <div className="info-item">
                  <Mail size={16} />
                  <span>{selectedApp.email}</span>
                </div>
                <div className="info-item">
                  <Phone size={16} />
                  <span>{selectedApp.phone}</span>
                </div>
                <div className="info-item">
                  <Calendar size={16} />
                  <span>Applied: {new Date(selectedApp.submittedAt).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <User size={16} />
                  <span>Age: {selectedApp.age}</span>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h4>Policy Details</h4>
              <div className="policy-grid">
                <div className="policy-item">
                  <span className="policy-label">Product Type</span>
                  <span className="policy-value">{selectedApp.productType}</span>
                </div>
                <div className="policy-item">
                  <span className="policy-label">Coverage Amount</span>
                  <span className="policy-value">${selectedApp.coverageAmount.toLocaleString()}</span>
                </div>
                <div className="policy-item">
                  <span className="policy-label">Monthly Budget</span>
                  <span className="policy-value">${selectedApp.monthlyBudget}/month</span>
                </div>
                <div className="policy-item">
                  <span className="policy-label">Health Status</span>
                  <span className="policy-value health-status">{selectedApp.healthStatus}</span>
                </div>
                <div className="policy-item">
                  <span className="policy-label">Smoker</span>
                  <span className="policy-value">{selectedApp.smoker ? 'Yes' : 'No'}</span>
                </div>
                <div className="policy-item">
                  <span className="policy-label">Assigned Agent</span>
                  <span className="policy-value">{getAgentName(selectedApp.assignedAgent)}</span>
                </div>
              </div>
            </div>

            {selectedApp.notes && (
              <div className="modal-section">
                <h4>Notes</h4>
                <div className="notes-box">
                  <p>{selectedApp.notes}</p>
                </div>
              </div>
            )}

            <div className="modal-section">
              <h4>Update Status</h4>
              <div className="status-actions">
                <button
                  className={`status-btn ${selectedApp.status === 'under_review' ? 'active' : ''}`}
                  onClick={() => handleStatusChange(selectedApp.id, 'under_review')}
                >
                  <Eye size={16} />
                  Under Review
                </button>
                <button
                  className={`status-btn ${selectedApp.status === 'documents_needed' ? 'active' : ''}`}
                  onClick={() => handleStatusChange(selectedApp.id, 'documents_needed')}
                >
                  <FileText size={16} />
                  Request Docs
                </button>
                <button
                  className={`status-btn success ${selectedApp.status === 'approved' ? 'active' : ''}`}
                  onClick={() => handleStatusChange(selectedApp.id, 'approved')}
                >
                  <CheckCircle size={16} />
                  Approve
                </button>
                <button
                  className={`status-btn danger ${selectedApp.status === 'declined' ? 'active' : ''}`}
                  onClick={() => handleStatusChange(selectedApp.id, 'declined')}
                >
                  <X size={16} />
                  Decline
                </button>
              </div>
            </div>

            <div className="modal-actions">
              <a href={`mailto:${selectedApp.email}`} className="btn btn-outline">
                <Mail size={18} />
                Send Email
              </a>
              <a href={`tel:${selectedApp.phone}`} className="btn btn-primary">
                <Phone size={18} />
                Call Applicant
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PolicyApplications
