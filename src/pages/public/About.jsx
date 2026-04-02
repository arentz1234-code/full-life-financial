import { Link } from 'react-router-dom'
import { Shield, Users, Award, Heart, Target, TrendingUp, ArrowRight } from 'lucide-react'
import './About.css'

function About() {
  const stats = [
    { value: '10,000+', label: 'Families Protected' },
    { value: '$500M+', label: 'Coverage Provided' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '15+', label: 'Years Experience' }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Family First',
      description: 'We understand that behind every policy is a family counting on us. That responsibility drives everything we do.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We\'re honest about coverage, costs, and what\'s right for you—even if it means recommending less coverage.'
    },
    {
      icon: Target,
      title: 'Personalized Approach',
      description: 'No two families are alike. We take time to understand your unique situation and recommend the perfect fit.'
    },
    {
      icon: TrendingUp,
      title: 'Long-term Partnership',
      description: 'We\'re not just here for the sale. We review your coverage annually to ensure it still meets your needs.'
    }
  ]

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <span className="section-label">About Us</span>
          <h1>Protecting Families Since 2009</h1>
          <p>
            Full Life Financial was founded with a simple mission: make life insurance
            accessible, affordable, and easy to understand for every family.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <span className="section-label">Our Story</span>
              <h2>Built on Personal Experience</h2>
              <p>
                Full Life Financial was born from a personal experience. When our founder
                lost a family member unexpectedly, he witnessed firsthand the financial
                devastation that follows when families aren't protected.
              </p>
              <p>
                That experience ignited a passion to ensure no family has to face both
                grief and financial hardship. We've dedicated ourselves to making
                life insurance accessible to everyone, regardless of their budget or
                health history.
              </p>
              <p>
                Today, we serve families across Alabama, Florida, and Georgia, working
                with the nation's top insurance carriers to find the perfect coverage
                at the best rates.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <Users size={80} />
                <span>Serving the Southeast</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Values</span>
            <h2>What We Stand For</h2>
            <p>These principles guide every interaction we have with our clients.</p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  <value.icon size={28} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Leadership</span>
            <h2>Meet Our Team</h2>
            <p>Experienced professionals dedicated to protecting your family.</p>
          </div>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">DA</div>
              <h3>Drew Arrington</h3>
              <span className="team-role">Sales Manager</span>
              <p>
                With over 15 years in the insurance industry, Drew leads our team of
                dedicated agents with a focus on client satisfaction and education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-box">
            <div className="cta-content">
              <h2>Ready to Protect Your Family?</h2>
              <p>Join the thousands of families who trust Full Life Financial with their future.</p>
            </div>
            <Link to="/quote" className="btn btn-accent btn-lg">
              Get Your Free Quote
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
