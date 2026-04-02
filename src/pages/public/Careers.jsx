import { useState, useRef } from 'react'
import { DollarSign, Clock, GraduationCap, Users, TrendingUp, Heart, CheckCircle, ArrowRight, Upload, FileText, X } from 'lucide-react'
import { addApplication } from '../../data/mockData'
import './Careers.css'

function Careers() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    licensed: '',
    message: ''
  })
  const [resumeFile, setResumeFile] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef(null)

  const benefits = [
    {
      icon: DollarSign,
      title: 'Unlimited Earning Potential',
      description: 'Competitive commission structure with no cap on earnings. Top performers earn $100K+ annually.'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Set your own hours and work-life balance. Build your business on your terms.'
    },
    {
      icon: GraduationCap,
      title: 'Comprehensive Training',
      description: 'Full licensing support, sales training, and ongoing professional development.'
    },
    {
      icon: Users,
      title: 'Supportive Team Culture',
      description: 'Join a team that celebrates success and supports your growth every step of the way.'
    },
    {
      icon: TrendingUp,
      title: 'Career Advancement',
      description: 'Clear path to management and leadership roles. Grow your own team.'
    },
    {
      icon: Heart,
      title: 'Meaningful Work',
      description: 'Help families protect their futures. Make a real difference in people\'s lives.'
    }
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document')
        return
      }
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      setResumeFile(file)
    }
  }

  const removeFile = () => {
    setResumeFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Create application object
    const application = {
      ...formData,
      resumeName: resumeFile?.name || null,
      resumeData: resumeFile // In a real app, this would be uploaded to a server
    }

    // Add to applications store
    addApplication(application)

    setSubmitted(true)
  }

  return (
    <div className="careers-page">
      {/* Hero */}
      <section className="careers-hero">
        <div className="container">
          <span className="section-label">Join Our Team</span>
          <h1>Build Your Future With Us</h1>
          <p>
            Are you driven, personable, and looking for a rewarding career?
            Join Full Life Financial and help families while building your own success.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Join Us?</span>
            <h2>The Full Life Advantage</h2>
            <p>We invest in our agents because your success is our success.</p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">
                  <benefit.icon size={28} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="requirements-section">
        <div className="container">
          <div className="requirements-grid">
            <div className="requirements-content">
              <span className="section-label">Ideal Candidates</span>
              <h2>What We Look For</h2>
              <p>
                We don't just hire salespeople—we build careers. The right candidate
                brings the drive, and we provide everything else.
              </p>

              <ul className="requirements-list">
                <li>
                  <CheckCircle size={20} />
                  <div>
                    <strong>Self-Motivated</strong>
                    <span>You take initiative and don't need constant supervision</span>
                  </div>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <div>
                    <strong>People-Person</strong>
                    <span>You genuinely enjoy helping others and building relationships</span>
                  </div>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <div>
                    <strong>Coachable</strong>
                    <span>You're open to learning and implementing feedback</span>
                  </div>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <div>
                    <strong>Resilient</strong>
                    <span>You see rejection as a stepping stone, not a roadblock</span>
                  </div>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <div>
                    <strong>Ethical</strong>
                    <span>You believe in doing right by the client, always</span>
                  </div>
                </li>
              </ul>

              <p className="note">
                <strong>No experience required!</strong> We provide full training and licensing support.
              </p>
            </div>

            <div className="earnings-card">
              <h3>Earning Potential</h3>
              <div className="earning-tiers">
                <div className="tier">
                  <span className="tier-label">Year 1</span>
                  <span className="tier-value">$50K - $75K</span>
                </div>
                <div className="tier">
                  <span className="tier-label">Year 2-3</span>
                  <span className="tier-value">$75K - $100K</span>
                </div>
                <div className="tier featured">
                  <span className="tier-label">Top Performers</span>
                  <span className="tier-value">$150K+</span>
                </div>
              </div>
              <p>Plus bonuses, trips, and incentives!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="application-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Apply Now</span>
            <h2>Start Your Journey</h2>
            <p>Fill out the form below and a member of our team will reach out within 48 hours.</p>
          </div>

          {submitted ? (
            <div className="application-success">
              <CheckCircle size={48} />
              <h3>Application Received!</h3>
              <p>
                Thank you for your interest in joining Full Life Financial.
                Our recruiting team will review your application and contact you within 48 hours.
              </p>
            </div>
          ) : (
            <form className="application-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Sales Experience</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select...</option>
                    <option value="none">No prior sales experience</option>
                    <option value="1-2">1-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Currently Licensed?</label>
                  <select
                    name="licensed"
                    value={formData.licensed}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes, I have my insurance license</option>
                    <option value="no">No, but I'm willing to get licensed</option>
                    <option value="in-progress">Currently working on it</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Why do you want to join Full Life Financial?</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  rows={4}
                  placeholder="Tell us about yourself and why you'd be a great fit..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Resume (Optional)</label>
                <div className="file-upload-area">
                  {resumeFile ? (
                    <div className="file-preview">
                      <div className="file-info">
                        <FileText size={24} />
                        <div>
                          <span className="file-name">{resumeFile.name}</span>
                          <span className="file-size">{(resumeFile.size / 1024).toFixed(1)} KB</span>
                        </div>
                      </div>
                      <button type="button" className="remove-file" onClick={removeFile}>
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="upload-prompt" onClick={() => fileInputRef.current?.click()}>
                      <Upload size={32} />
                      <span className="upload-text">Click to upload your resume</span>
                      <span className="upload-hint">PDF or Word document, max 5MB</span>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="file-input"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg">
                Submit Application
                <ArrowRight size={20} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

export default Careers
