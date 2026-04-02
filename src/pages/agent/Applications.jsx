import { useState } from 'react'
import { Eye, Mail, Phone, Calendar, FileText, User, Shield, CheckCircle, Clock, X, AlertCircle } from 'lucide-react'
import { getAgentPolicyApplications, agents } from '../../data/mockData'
import './AgentApplications.css'

function AgentApplications() {
  // Using first agent for demo
  const agent = agents[0]
  const [applications] = useState(getAgentPolicyApplications(agent.id))
  const [selectedApp, setSelectedApp] = useState(null)

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return { label: 'Pending Review', color: 'warning', icon: Clock }
      case 'under_review':
        return { label: 'Under Review', color: 'info', icon: Eye }
      case 'documents_needed':
        return { label: 'Documents Needed', color: 'accent', icon: FileText }
      case 'approved':
        return { label: 'Approved', color: 'success', icon: CheckCircle }
      case 'declined':
        return { label: 'Declined', color: 'error', icon: X }
      default:
        return { label: status, color: 'gray', icon: AlertCircle }
    }
  }

  const totalCoverage = applications.reduce((sum, app) => sum + app.coverageAmount, 0)
  const pendingCount = applications.filter(a => a.status === 'pending' || a.status === 'under_review').length
  const approvedCount = applications.filter(a => a.status === 'approved').length

  return (
    <div className="agent-applications">
      <div className="page-header">
        <h1>My Applications</h1>
        <p>Policy applications assigned to you for follow-up and processing.</p>
      </div>

      {/* Stats */}
      <div className="app-stats">
        <div className="stat-card">
          <div className="stat-icon total">
            <FileText size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{applications.length}</span>
            <span className="stat-label">Total Assigned</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{pendingCount}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon approved">
            <CheckCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{approvedCount}</span>
            <span className="stat-label">Approved</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon coverage">
            <Shield size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">${(totalCoverage / 1000).toFixed(0)}K</span>
            <span className="stat-label">Total Coverage</span>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} />
          <h3>No applications assigned</h3>
          <p>When policy applications are assigned to you, they will appear here.</p>
        </div>
      ) : (
        <div className="applications-grid">
          {applications.map(app => {
            const statusBadge = getStatusBadge(app.status)
            const StatusIcon = statusBadge.icon
            return (
              <div key={app.id} className="application-card" onClick={() => setSelectedApp(app)}>
                <div className="card-header">
                  <div className="applicant-info">
                    <div className="avatar" style={{ background: `hsl(${app.id.charCodeAt(4) * 30}, 60%, 45%)` }}>
                      {app.firstName[0]}{app.lastName[0]}
                    </div>
                    <div>
                      <h3>{app.firstName} {app.lastName}</h3>
                      <span className="product-type">{app.productType}</span>
                    </div>
                  </div>
                  <span className={`status-badge ${statusBadge.color}`}>
                    <StatusIcon size={14} />
                    {statusBadge.label}
                  </span>
                </div>

                <div className="card-details">
                  <div className="detail-row">
                    <span className="detail-label">Coverage</span>
                    <span className="detail-value">${app.coverageAmount.toLocaleString()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Monthly</span>
                    <span className="detail-value">${app.monthlyBudget}/mo</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Applied</span>
                    <span className="detail-value">{new Date(app.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="card-actions">
                  <a href={`tel:${app.phone}`} className="action-btn" onClick={(e) => e.stopPropagation()}>
                    <Phone size={16} />
                    Call
                  </a>
                  <a href={`mailto:${app.email}`} className="action-btn" onClick={(e) => e.stopPropagation()}>
                    <Mail size={16} />
                    Email
                  </a>
                  <button className="action-btn view" onClick={() => setSelectedApp(app)}>
                    <Eye size={16} />
                    Details
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

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
                  <span className="policy-value">{selectedApp.healthStatus}</span>
                </div>
                <div className="policy-item">
                  <span className="policy-label">Smoker</span>
                  <span className="policy-value">{selectedApp.smoker ? 'Yes' : 'No'}</span>
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

export default AgentApplications
