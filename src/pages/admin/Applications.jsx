import { useState } from 'react'
import { Search, Download, Eye, Mail, Phone, Calendar, FileText, User, Briefcase, CheckCircle, Clock, MessageSquare, X } from 'lucide-react'
import { getApplications, updateApplicationStatus } from '../../data/mockData'
import { exportApplications } from '../../utils/exportToExcel'
import './AdminApplications.css'

function AdminApplications() {
  const [applications, setApplications] = useState(getApplications())
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedApp, setSelectedApp] = useState(null)

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return { label: 'New', color: 'info' }
      case 'reviewed':
        return { label: 'Reviewed', color: 'warning' }
      case 'contacted':
        return { label: 'Contacted', color: 'accent' }
      case 'interview':
        return { label: 'Interview', color: 'success' }
      case 'rejected':
        return { label: 'Rejected', color: 'error' }
      default:
        return { label: status, color: 'gray' }
    }
  }

  const getExperienceLabel = (exp) => {
    switch (exp) {
      case 'none': return 'No experience'
      case '1-2': return '1-2 years'
      case '3-5': return '3-5 years'
      case '5+': return '5+ years'
      default: return 'Not specified'
    }
  }

  const getLicensedLabel = (licensed) => {
    switch (licensed) {
      case 'yes': return 'Licensed'
      case 'no': return 'Not licensed (willing)'
      case 'in-progress': return 'In progress'
      default: return 'Not specified'
    }
  }

  const handleStatusChange = (appId, newStatus) => {
    updateApplicationStatus(appId, newStatus)
    setApplications(getApplications())
    if (selectedApp?.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus })
    }
  }

  return (
    <div className="admin-applications">
      <div className="page-header">
        <div>
          <h1>Applications</h1>
          <p>Review and manage job applications from potential agents.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => exportApplications(applications)}>
            <Download size={18} />
            Export All
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="app-stats">
        <div className="stat-card">
          <div className="stat-icon new">
            <User size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{applications.filter(a => a.status === 'new').length}</span>
            <span className="stat-label">New Applications</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon reviewed">
            <Eye size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{applications.filter(a => a.status === 'reviewed').length}</span>
            <span className="stat-label">Under Review</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon interview">
            <Calendar size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{applications.filter(a => a.status === 'interview').length}</span>
            <span className="stat-label">Interview Scheduled</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon total">
            <Briefcase size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{applications.length}</span>
            <span className="stat-label">Total Applications</span>
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
          <option value="new">New</option>
          <option value="reviewed">Reviewed</option>
          <option value="contacted">Contacted</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="data-table">
        <table className="table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Contact</th>
              <th>Experience</th>
              <th>License</th>
              <th>Resume</th>
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
                    <span className="contact-info">
                      <Phone size={14} />
                      {app.phone}
                    </span>
                  </td>
                  <td>{getExperienceLabel(app.experience)}</td>
                  <td>
                    <span className={`license-badge ${app.licensed === 'yes' ? 'licensed' : ''}`}>
                      {getLicensedLabel(app.licensed)}
                    </span>
                  </td>
                  <td>
                    {app.resumeName ? (
                      <span className="resume-badge">
                        <FileText size={14} />
                        Resume
                      </span>
                    ) : (
                      <span className="no-resume">None</span>
                    )}
                  </td>
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
            <User size={48} />
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
              </div>
            </div>

            <div className="modal-section">
              <h4>Qualifications</h4>
              <div className="qual-grid">
                <div className="qual-item">
                  <span className="qual-label">Sales Experience</span>
                  <span className="qual-value">{getExperienceLabel(selectedApp.experience)}</span>
                </div>
                <div className="qual-item">
                  <span className="qual-label">Insurance License</span>
                  <span className="qual-value">{getLicensedLabel(selectedApp.licensed)}</span>
                </div>
              </div>
            </div>

            {selectedApp.message && (
              <div className="modal-section">
                <h4>Personal Statement</h4>
                <div className="message-box">
                  <MessageSquare size={16} />
                  <p>{selectedApp.message}</p>
                </div>
              </div>
            )}

            {selectedApp.resumeName && (
              <div className="modal-section">
                <h4>Resume</h4>
                <div className="resume-preview">
                  <FileText size={24} />
                  <div className="resume-info">
                    <span className="resume-name">{selectedApp.resumeName}</span>
                    <span className="resume-action">Click to download</span>
                  </div>
                </div>
              </div>
            )}

            <div className="modal-section">
              <h4>Update Status</h4>
              <div className="status-actions">
                <button
                  className={`status-btn ${selectedApp.status === 'reviewed' ? 'active' : ''}`}
                  onClick={() => handleStatusChange(selectedApp.id, 'reviewed')}
                >
                  <Eye size={16} />
                  Mark Reviewed
                </button>
                <button
                  className={`status-btn ${selectedApp.status === 'contacted' ? 'active' : ''}`}
                  onClick={() => handleStatusChange(selectedApp.id, 'contacted')}
                >
                  <Phone size={16} />
                  Contacted
                </button>
                <button
                  className={`status-btn success ${selectedApp.status === 'interview' ? 'active' : ''}`}
                  onClick={() => handleStatusChange(selectedApp.id, 'interview')}
                >
                  <Calendar size={16} />
                  Schedule Interview
                </button>
                <button
                  className={`status-btn danger ${selectedApp.status === 'rejected' ? 'active' : ''}`}
                  onClick={() => handleStatusChange(selectedApp.id, 'rejected')}
                >
                  <X size={16} />
                  Reject
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

export default AdminApplications
