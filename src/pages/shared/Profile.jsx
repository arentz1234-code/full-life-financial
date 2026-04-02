import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Camera, Save, ArrowLeft } from 'lucide-react'
import { adminUser, agents } from '../../data/mockData'
import './Profile.css'

function Profile() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const currentUser = isAdmin ? adminUser : agents[0]

  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone || '(555) 123-4567',
    address: currentUser.territory || 'Atlanta, GA',
    bio: currentUser.bio || 'Dedicated professional committed to helping families secure their financial future.'
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would save to a backend
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="profile-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>
        <h1>My Profile</h1>
        <p>Manage your personal information and preferences</p>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-avatar-section">
            <div className="profile-avatar" style={{ background: isAdmin ? 'var(--accent)' : 'var(--primary)' }}>
              {currentUser.avatar}
            </div>
            <button className="avatar-upload-btn">
              <Camera size={16} />
              Change Photo
            </button>
          </div>

          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-value">{isAdmin ? '12' : currentUser.level}</span>
              <span className="stat-label">{isAdmin ? 'Team Members' : 'Level'}</span>
            </div>
            <div className="profile-stat">
              <span className="stat-value">{isAdmin ? '$2.4M' : `$${(currentUser.sales / 1000).toFixed(0)}K`}</span>
              <span className="stat-label">{isAdmin ? 'Team Sales' : 'Total Sales'}</span>
            </div>
            <div className="profile-stat">
              <span className="stat-value">{isAdmin ? '98%' : `#${currentUser.rank}`}</span>
              <span className="stat-label">{isAdmin ? 'Team Rating' : 'Rank'}</span>
            </div>
          </div>
        </div>

        <div className="profile-form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Personal Information</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <User size={16} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <Mail size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Phone size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <MapPin size={16} />
                    Location
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Bio</label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <Save size={18} />
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
