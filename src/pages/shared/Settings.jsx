import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Lock, Bell, Shield, Eye, EyeOff, Save, Check } from 'lucide-react'
import './Settings.css'

function Settings() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [saved, setSaved] = useState(false)

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    salesNotifications: true,
    leadAlerts: true,
    weeklyReport: true,
    marketingEmails: false
  })

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true
  })

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    })
  }

  const handleSecurityChange = (key) => {
    setSecurity({
      ...security,
      [key]: !security[key]
    })
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>
        <h1>Account Settings</h1>
        <p>Manage your security and notification preferences</p>
      </div>

      <div className="settings-content">
        {/* Password Section */}
        <div className="settings-section">
          <div className="section-header">
            <Lock size={20} />
            <div>
              <h3>Change Password</h3>
              <p>Update your password to keep your account secure</p>
            </div>
          </div>

          <div className="section-content">
            <div className="form-group">
              <label>Current Password</label>
              <div className="password-input">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>
              <div className="password-input">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
              />
            </div>

            <button className="btn btn-outline" onClick={handleSave}>
              Update Password
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="settings-section">
          <div className="section-header">
            <Bell size={20} />
            <div>
              <h3>Notification Preferences</h3>
              <p>Choose what notifications you want to receive</p>
            </div>
          </div>

          <div className="section-content">
            <div className="toggle-group">
              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">Email Alerts</span>
                  <span className="toggle-description">Receive important updates via email</span>
                </div>
                <button
                  className={`toggle-switch ${notifications.emailAlerts ? 'active' : ''}`}
                  onClick={() => handleNotificationChange('emailAlerts')}
                >
                  <span className="toggle-knob"></span>
                </button>
              </div>

              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">Sales Notifications</span>
                  <span className="toggle-description">Get notified when a sale is completed</span>
                </div>
                <button
                  className={`toggle-switch ${notifications.salesNotifications ? 'active' : ''}`}
                  onClick={() => handleNotificationChange('salesNotifications')}
                >
                  <span className="toggle-knob"></span>
                </button>
              </div>

              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">Lead Alerts</span>
                  <span className="toggle-description">Receive alerts for new leads</span>
                </div>
                <button
                  className={`toggle-switch ${notifications.leadAlerts ? 'active' : ''}`}
                  onClick={() => handleNotificationChange('leadAlerts')}
                >
                  <span className="toggle-knob"></span>
                </button>
              </div>

              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">Weekly Report</span>
                  <span className="toggle-description">Get a weekly summary of your performance</span>
                </div>
                <button
                  className={`toggle-switch ${notifications.weeklyReport ? 'active' : ''}`}
                  onClick={() => handleNotificationChange('weeklyReport')}
                >
                  <span className="toggle-knob"></span>
                </button>
              </div>

              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">Marketing Emails</span>
                  <span className="toggle-description">Receive tips and promotional content</span>
                </div>
                <button
                  className={`toggle-switch ${notifications.marketingEmails ? 'active' : ''}`}
                  onClick={() => handleNotificationChange('marketingEmails')}
                >
                  <span className="toggle-knob"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="settings-section">
          <div className="section-header">
            <Shield size={20} />
            <div>
              <h3>Security Settings</h3>
              <p>Enhance your account security</p>
            </div>
          </div>

          <div className="section-content">
            <div className="toggle-group">
              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">Two-Factor Authentication</span>
                  <span className="toggle-description">Add an extra layer of security to your account</span>
                </div>
                <button
                  className={`toggle-switch ${security.twoFactor ? 'active' : ''}`}
                  onClick={() => handleSecurityChange('twoFactor')}
                >
                  <span className="toggle-knob"></span>
                </button>
              </div>

              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-label">Login Alerts</span>
                  <span className="toggle-description">Get notified of new login attempts</span>
                </div>
                <button
                  className={`toggle-switch ${security.loginAlerts ? 'active' : ''}`}
                  onClick={() => handleSecurityChange('loginAlerts')}
                >
                  <span className="toggle-knob"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save All Button */}
        <div className="settings-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            {saved ? <Check size={18} /> : <Save size={18} />}
            {saved ? 'Changes Saved!' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
