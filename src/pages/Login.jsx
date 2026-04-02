import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, User, Lock } from 'lucide-react'
import { adminUser, agents } from '../data/mockData'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    // Check admin
    if (email === adminUser.email && password === adminUser.password) {
      navigate('/admin')
      return
    }

    // Check agents
    const agent = agents.find(a => a.email === email && a.password === password)
    if (agent) {
      navigate('/agent')
      return
    }

    setError('Invalid email or password')
  }

  const loginAsAdmin = () => {
    setEmail(adminUser.email)
    setPassword(adminUser.password)
  }

  const loginAsAgent = (agentIndex = 0) => {
    setEmail(agents[agentIndex].email)
    setPassword(agents[agentIndex].password)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <Link to="/" className="logo">
            <img src="/logo.svg" alt="Full Life Financial" className="logo-img" />
            <div className="logo-text">
              <span className="logo-name">Full Life</span>
              <span className="logo-tagline">Financial</span>
            </div>
          </Link>

          <div className="branding-content">
            <h1>Agent Portal</h1>
            <p>
              Access your dashboard to manage leads, track sales, and monitor your performance.
            </p>
          </div>

          <div className="branding-footer">
            <Link to="/">Back to Website</Link>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-wrapper">
          <div className="login-form-container">
            <h2>Sign In</h2>
            <p>Enter your credentials to access your account</p>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="input-icon-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-icon-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg login-btn">
                Sign In
              </button>
            </form>

            {/* Quick Login Buttons */}
            <div className="quick-login">
              <p className="quick-login-label">Demo Quick Login:</p>

              <div className="quick-login-section">
                <span className="section-label">Admin</span>
                <button
                  type="button"
                  className="quick-login-btn admin"
                  onClick={loginAsAdmin}
                >
                  <div className="avatar">DA</div>
                  <div className="user-info">
                    <span className="name">{adminUser.name}</span>
                    <span className="role">Sales Manager</span>
                  </div>
                </button>
              </div>

              <div className="quick-login-section">
                <span className="section-label">Agents</span>
                <div className="agents-grid">
                  {agents.slice(0, 3).map((agent, index) => (
                    <button
                      key={agent.id}
                      type="button"
                      className="quick-login-btn"
                      onClick={() => loginAsAgent(index)}
                    >
                      <div className="avatar">{agent.avatar}</div>
                      <div className="user-info">
                        <span className="name">{agent.name}</span>
                        <span className="role">{agent.territory}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
