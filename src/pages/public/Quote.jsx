import { useState, useEffect, useMemo } from 'react'
import { Shield, CheckCircle, Phone, Lock, Calculator, DollarSign, TrendingUp, Clock, AlertCircle, ArrowRight, Heart, Users, Sparkles, Leaf, TreeDeciduous, Home, Building2, Castle, Crown, Coins } from 'lucide-react'
import './Quote.css'

// Premium calculation logic (simplified mock)
function calculatePremium(age, gender, smoker, coverageAmount, coverageType) {
  if (!age || !coverageAmount) return null

  const ageNum = parseInt(age)
  const coverage = parseInt(coverageAmount)

  // Base rates per $1000 of coverage (annual)
  let baseRate = 0.15 // $0.15 per $1000

  // Age factor (increases exponentially)
  const ageFactor = 1 + Math.pow((ageNum - 25) / 50, 2)

  // Gender factor
  const genderFactor = gender === 'male' ? 1.1 : 1

  // Smoker factor
  const smokerFactor = smoker === 'yes' ? 2.5 : 1

  // Coverage type factor
  const typeFactors = {
    'term-10': 0.8,
    'term-20': 1,
    'term-30': 1.3,
    'whole': 4,
    'universal': 3.5,
    'final-expense': 5,
    'not-sure': 1
  }
  const typeFactor = typeFactors[coverageType] || 1

  // Calculate annual premium
  const annualPremium = (coverage / 1000) * baseRate * ageFactor * genderFactor * smokerFactor * typeFactor

  // Monthly premium (with slight rounding up)
  const monthlyPremium = Math.ceil(annualPremium / 12 * 100) / 100

  return {
    monthly: Math.max(15, monthlyPremium),
    annual: Math.max(180, Math.ceil(annualPremium))
  }
}

function Quote() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    smoker: '',
    coverageAmount: '500000',
    coverageType: 'term-20',
    healthConditions: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [showCalculator, setShowCalculator] = useState(true)

  // Calculate premium in real-time
  const estimatedPremium = useMemo(() => {
    return calculatePremium(
      formData.age,
      formData.gender,
      formData.smoker,
      formData.coverageAmount,
      formData.coverageType
    )
  }, [formData.age, formData.gender, formData.smoker, formData.coverageAmount, formData.coverageType])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const coverageOptions = [
    { value: '25000', label: '$25,000', Icon: Leaf },
    { value: '50000', label: '$50,000', Icon: Coins },
    { value: '100000', label: '$100,000', Icon: TreeDeciduous },
    { value: '250000', label: '$250,000', Icon: Home },
    { value: '500000', label: '$500,000', Icon: Building2 },
    { value: '750000', label: '$750,000', Icon: Castle },
    { value: '1000000', label: '$1,000,000', Icon: Crown },
  ]

  const coverageTypes = [
    { value: 'term-10', label: '10-Year Term', desc: 'Affordable temporary coverage' },
    { value: 'term-20', label: '20-Year Term', desc: 'Most popular choice', popular: true },
    { value: 'term-30', label: '30-Year Term', desc: 'Extended protection' },
    { value: 'whole', label: 'Whole Life', desc: 'Lifetime coverage + cash value' },
    { value: 'universal', label: 'Universal Life', desc: 'Flexible premiums' },
    { value: 'final-expense', label: 'Final Expense', desc: 'End-of-life costs' },
  ]

  if (submitted) {
    return (
      <div className="quote-page">
        <section className="quote-success">
          <div className="container">
            <div className="success-content animate-fade-up">
              <div className="success-confetti"></div>
              <div className="success-icon">
                <CheckCircle size={64} />
              </div>
              <h1>You're One Step Closer to Protection!</h1>
              <p>
                Your quote request has been submitted successfully. One of our licensed
                agents will contact you within 24 hours with personalized coverage options.
              </p>

              {estimatedPremium && (
                <div className="success-estimate glass-card">
                  <div className="estimate-badge">Estimated Monthly Premium</div>
                  <div className="estimate-amount">
                    <span className="currency">$</span>
                    <span className="value">{estimatedPremium.monthly.toFixed(2)}</span>
                    <span className="period">/mo</span>
                  </div>
                  <p className="estimate-note">Based on the information you provided</p>
                </div>
              )}

              <div className="success-details">
                <div className="detail-item">
                  <strong>Name:</strong> {formData.firstName} {formData.lastName}
                </div>
                <div className="detail-item">
                  <strong>Email:</strong> {formData.email}
                </div>
                <div className="detail-item">
                  <strong>Coverage:</strong> ${parseInt(formData.coverageAmount).toLocaleString()}
                </div>
              </div>

              <div className="success-next-steps">
                <h3>What Happens Next?</h3>
                <div className="next-steps-grid">
                  <div className="next-step">
                    <div className="step-icon">1</div>
                    <span>Agent reviews your info</span>
                  </div>
                  <div className="next-step">
                    <div className="step-icon">2</div>
                    <span>Personalized quotes prepared</span>
                  </div>
                  <div className="next-step">
                    <div className="step-icon">3</div>
                    <span>Agent calls within 24 hours</span>
                  </div>
                </div>
              </div>

              <p className="success-note">
                In the meantime, feel free to call us at <strong>(800) 555-LIFE</strong> if you have any questions.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="quote-page">
      {/* Hero */}
      <section className="quote-hero">
        <div className="quote-hero-bg"></div>
        <div className="container">
          <div className="quote-hero-content animate-fade-up">
            <span className="hero-badge">
              <Calculator size={16} />
              Free Instant Quote
            </span>
            <h1>See Your Rate in Real-Time</h1>
            <p>
              Our smart calculator shows you estimated premiums as you fill out the form.
              No waiting, no surprises—just transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="quote-form-section">
        <div className="container">
          <div className="quote-grid">
            <div className="quote-form-wrapper animate-fade-up">
              {/* Progress */}
              <div className="form-progress">
                <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                  <span className="step-number">{step > 1 ? <CheckCircle size={18} /> : '1'}</span>
                  <span className="step-label">Personal Info</span>
                </div>
                <div className={`progress-line ${step > 1 ? 'active' : ''}`}></div>
                <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                  <span className="step-number">{step > 2 ? <CheckCircle size={18} /> : '2'}</span>
                  <span className="step-label">Coverage Needs</span>
                </div>
                <div className={`progress-line ${step > 2 ? 'active' : ''}`}></div>
                <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                  <span className="step-number">3</span>
                  <span className="step-label">Health Info</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <div className="form-step animate-fade-up">
                    <h2>Tell Us About Yourself</h2>
                    <p>We need some basic information to provide an accurate quote.</p>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="John"
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
                          placeholder="Smith"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="(555) 555-5555"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Age *</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="35"
                          min="18"
                          max="85"
                          required
                        />
                        <span className="form-hint">Ages 18-85 eligible</span>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Gender *</label>
                        <div className="toggle-group">
                          <button
                            type="button"
                            className={`toggle-btn ${formData.gender === 'male' ? 'active' : ''}`}
                            onClick={() => setFormData({...formData, gender: 'male'})}
                          >
                            Male
                          </button>
                          <button
                            type="button"
                            className={`toggle-btn ${formData.gender === 'female' ? 'active' : ''}`}
                            onClick={() => setFormData({...formData, gender: 'female'})}
                          >
                            Female
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={nextStep}
                        disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.age || !formData.gender}
                      >
                        Continue
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Coverage Needs */}
                {step === 2 && (
                  <div className="form-step animate-fade-up">
                    <h2>Choose Your Coverage</h2>
                    <p>Select the coverage amount and type that fits your needs.</p>

                    <div className="form-group">
                      <label className="form-label">Coverage Amount *</label>
                      <div className="coverage-grid">
                        {coverageOptions.map(option => (
                          <button
                            key={option.value}
                            type="button"
                            className={`coverage-option ${formData.coverageAmount === option.value ? 'active' : ''}`}
                            onClick={() => setFormData({...formData, coverageAmount: option.value})}
                          >
                            <span className="coverage-icon"><option.Icon size={24} /></span>
                            <span className="coverage-label">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Type of Coverage *</label>
                      <div className="type-grid">
                        {coverageTypes.map(type => (
                          <button
                            key={type.value}
                            type="button"
                            className={`type-option ${formData.coverageType === type.value ? 'active' : ''}`}
                            onClick={() => setFormData({...formData, coverageType: type.value})}
                          >
                            {type.popular && <span className="popular-badge">Most Popular</span>}
                            <span className="type-label">{type.label}</span>
                            <span className="type-desc">{type.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="button" className="btn btn-outline" onClick={prevStep}>
                        Back
                      </button>
                      <button type="button" className="btn btn-primary btn-lg" onClick={nextStep}>
                        Continue
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Health Info */}
                {step === 3 && (
                  <div className="form-step animate-fade-up">
                    <h2>Almost There!</h2>
                    <p>Just a few more details to finalize your quote.</p>

                    <div className="form-group">
                      <label className="form-label">Do you use tobacco products? *</label>
                      <div className="toggle-group tobacco-toggle">
                        <button
                          type="button"
                          className={`toggle-btn ${formData.smoker === 'no' ? 'active success' : ''}`}
                          onClick={() => setFormData({...formData, smoker: 'no'})}
                        >
                          <CheckCircle size={18} />
                          No
                        </button>
                        <button
                          type="button"
                          className={`toggle-btn ${formData.smoker === 'yes' ? 'active warning' : ''}`}
                          onClick={() => setFormData({...formData, smoker: 'yes'})}
                        >
                          Yes
                        </button>
                      </div>
                      {formData.smoker === 'yes' && (
                        <div className="form-notice warning">
                          <AlertCircle size={16} />
                          <span>Tobacco use affects rates, but coverage is still available!</span>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Any major health conditions? (Optional)</label>
                      <textarea
                        name="healthConditions"
                        value={formData.healthConditions}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="List any conditions like diabetes, heart disease, etc. This helps us find the best rates for you."
                        rows={4}
                      />
                    </div>

                    <div className="form-disclaimer glass-card">
                      <Lock size={18} />
                      <div>
                        <strong>Your Privacy is Protected</strong>
                        <span>
                          Your information is secure and will never be shared without your consent.
                          By submitting, you agree to be contacted about life insurance options.
                        </span>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="button" className="btn btn-outline" onClick={prevStep}>
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn btn-accent btn-lg pulse-animation"
                        disabled={!formData.smoker}
                      >
                        <Sparkles size={20} />
                        Get My Free Quote
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Sidebar - Premium Calculator */}
            <div className="quote-sidebar">
              <div className="calculator-card glass-card animate-fade-up">
                <div className="calculator-header">
                  <div className="calculator-icon">
                    <Calculator size={24} />
                  </div>
                  <div>
                    <h3>Live Quote Estimate</h3>
                    <span>Updates as you fill out the form</span>
                  </div>
                </div>

                {estimatedPremium ? (
                  <div className="calculator-body">
                    <div className="premium-display">
                      <div className="premium-label">Estimated Monthly Premium</div>
                      <div className="premium-amount">
                        <span className="currency">$</span>
                        <span className="value">{estimatedPremium.monthly.toFixed(2)}</span>
                        <span className="period">/mo</span>
                      </div>
                      <div className="premium-annual">
                        or ${estimatedPremium.annual.toLocaleString()}/year
                      </div>
                    </div>

                    <div className="coverage-summary">
                      <div className="summary-item">
                        <span className="label">Coverage Amount</span>
                        <span className="value">${parseInt(formData.coverageAmount).toLocaleString()}</span>
                      </div>
                      <div className="summary-item">
                        <span className="label">Coverage Type</span>
                        <span className="value">{coverageTypes.find(t => t.value === formData.coverageType)?.label || 'Term Life'}</span>
                      </div>
                      {formData.age && (
                        <div className="summary-item">
                          <span className="label">Your Age</span>
                          <span className="value">{formData.age} years old</span>
                        </div>
                      )}
                    </div>

                    <div className="calculator-note">
                      <AlertCircle size={14} />
                      <span>This is an estimate. Final rates may vary based on health evaluation.</span>
                    </div>
                  </div>
                ) : (
                  <div className="calculator-empty">
                    <DollarSign size={32} />
                    <p>Enter your age to see estimated rates</p>
                  </div>
                )}
              </div>

              <div className="sidebar-card why-card">
                <div className="sidebar-icon">
                  <Shield size={24} />
                </div>
                <h3>Why Full Life Financial?</h3>
                <ul>
                  <li>
                    <CheckCircle size={16} />
                    Access to 30+ top-rated carriers
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    Licensed agents in your state
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    No medical exam options
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    Fast 24-hour approval
                  </li>
                  <li>
                    <CheckCircle size={16} />
                    Competitive rates guaranteed
                  </li>
                </ul>
              </div>

              <div className="sidebar-card contact-card">
                <h4>Prefer to Talk?</h4>
                <p>Speak with a licensed agent now</p>
                <a href="tel:8005555433" className="phone-link">
                  <Phone size={20} />
                  (800) 555-LIFE
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-badge">
              <Clock size={24} />
              <span>2-Minute Application</span>
            </div>
            <div className="trust-badge">
              <Shield size={24} />
              <span>A+ Rated Carriers</span>
            </div>
            <div className="trust-badge">
              <Heart size={24} />
              <span>10,000+ Families Protected</span>
            </div>
            <div className="trust-badge">
              <Users size={24} />
              <span>Licensed in 50 States</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Quote
