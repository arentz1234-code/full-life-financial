import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Shield, Heart, Users, Clock, CheckCircle, ArrowRight, Star, Phone, AlertTriangle, Home as HomeIcon, GraduationCap, Wallet, Award, BadgeCheck, ShieldCheck, Lock } from 'lucide-react'
import { testimonials, products } from '../../data/mockData'
import './Home.css'

// Animated counter component
function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let startTime
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-video-container">
          <video autoPlay muted loop playsInline className="hero-video">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay"></div>
        </div>
        <div className="hero-bg"></div>
        <div className="hero-particles"></div>
        <div className="container">
          <div className="hero-content animate-fade-up">
            <div className="hero-badge">
              <Shield size={16} />
              Trusted by 10,000+ Families Across the Southeast
            </div>
            <h1>
              <span className="hero-highlight">They're Counting On You.</span>
              <br />
              Don't Let Them Down.
            </h1>
            <p className="hero-subtitle">
              What happens to your family if something happens to you tomorrow?
              Life insurance isn't about you—it's about the people you love.
              <strong> Protect them now.</strong>
            </p>
            <div className="hero-cta">
              <Link to="/quote" className="btn btn-accent btn-lg pulse-animation">
                Get Your Free Quote Now
                <ArrowRight size={20} />
              </Link>
              <a href="tel:8005555433" className="btn btn-white btn-lg">
                <Phone size={20} />
                (800) 555-LIFE
              </a>
            </div>
            <div className="hero-trust">
              <div className="trust-item">
                <CheckCircle size={18} />
                <span>No Medical Exam Options</span>
              </div>
              <div className="trust-item">
                <CheckCircle size={18} />
                <span>Coverage in 24 Hours</span>
              </div>
              <div className="trust-item">
                <CheckCircle size={18} />
                <span>From Just $15/month</span>
              </div>
            </div>
          </div>
          <div className="hero-image animate-fade-up delay-200">
            <div className="hero-card glass-card">
              <div className="hero-card-icon">
                <img src="/logo.svg" alt="Full Life Financial" />
              </div>
              <div className="hero-card-content">
                <span className="hero-card-label">Protection Starting At</span>
                <span className="hero-card-value">$15<span className="per-month">/mo</span></span>
                <span className="hero-card-note">for $500,000 coverage</span>
              </div>
              <Link to="/quote" className="btn btn-primary btn-sm">Calculate Your Rate</Link>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll to learn more</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="trust-signals">
        <div className="container">
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="badge-icon">
                <ShieldCheck size={28} />
              </div>
              <div className="badge-text">
                <span className="badge-title">A+ Rated Carriers</span>
                <span className="badge-subtitle">Top-tier insurance partners</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon bbb">
                <Award size={28} />
              </div>
              <div className="badge-text">
                <span className="badge-title">BBB Accredited</span>
                <span className="badge-subtitle">A+ Rating since 2015</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">
                <BadgeCheck size={28} />
              </div>
              <div className="badge-text">
                <span className="badge-title">Licensed & Insured</span>
                <span className="badge-subtitle">All 50 states</span>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">
                <Lock size={28} />
              </div>
              <div className="badge-text">
                <span className="badge-title">Secure & Private</span>
                <span className="badge-subtitle">256-bit encryption</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fear/Urgency Section */}
      <section className="urgency-section">
        <div className="container">
          <div className="urgency-banner glass-card">
            <AlertTriangle size={48} className="urgency-icon" />
            <div className="urgency-content">
              <h2>Every 37 Seconds, Someone Dies Without Life Insurance</h2>
              <p>
                Their families are left with <strong>funeral costs averaging $12,000</strong>,
                unpaid mortgages, and years of lost income. Don't make your loved ones
                a statistic. The time to act is <strong>now</strong>—while you still can.
              </p>
            </div>
            <Link to="/quote" className="btn btn-accent">Protect My Family</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item animate-on-scroll">
              <span className="stat-number">
                <AnimatedCounter end={10000} suffix="+" />
              </span>
              <span className="stat-label">Families Protected</span>
            </div>
            <div className="stat-item animate-on-scroll">
              <span className="stat-number">
                <AnimatedCounter end={500} prefix="$" suffix="M+" />
              </span>
              <span className="stat-label">Coverage Provided</span>
            </div>
            <div className="stat-item animate-on-scroll">
              <span className="stat-number">
                <AnimatedCounter end={98} suffix="%" />
              </span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
            <div className="stat-item animate-on-scroll">
              <span className="stat-number">
                <AnimatedCounter end={24} suffix=" hrs" />
              </span>
              <span className="stat-label">Average Approval Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Life Insurance Section - Emotional Appeals */}
      <section className="why-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-label">Why Life Insurance Matters</span>
            <h2>Because Love Means Planning Ahead</h2>
            <p>You work hard every day to provide for your family. But what happens when you can't?</p>
          </div>

          <div className="scenarios-grid">
            <div className="scenario-card animate-on-scroll glass-card">
              <div className="scenario-icon">
                <HomeIcon size={32} />
              </div>
              <h3>Keep Your Family Home</h3>
              <p className="scenario-question">What if they had to sell the house you worked so hard for?</p>
              <p>
                The average mortgage is $250,000. Without you, could your family keep up with payments?
                Life insurance ensures they never have to choose between grief and homelessness.
              </p>
              <div className="scenario-stat">
                <span className="stat-number">67%</span>
                <span>of families sell their home after losing a primary earner without insurance</span>
              </div>
            </div>

            <div className="scenario-card animate-on-scroll glass-card">
              <div className="scenario-icon">
                <GraduationCap size={32} />
              </div>
              <h3>Fund Their Dreams</h3>
              <p className="scenario-question">Would your children's college dreams die with you?</p>
              <p>
                The average cost of college is now $35,000/year. Your children deserve the future
                you've always wanted for them—even if you're not there to see it.
              </p>
              <div className="scenario-stat">
                <span className="stat-number">$140K</span>
                <span>average 4-year college cost you can secure today</span>
              </div>
            </div>

            <div className="scenario-card animate-on-scroll glass-card">
              <div className="scenario-icon">
                <Wallet size={32} />
              </div>
              <h3>Replace Your Income</h3>
              <p className="scenario-question">How long could they survive without your paycheck?</p>
              <p>
                Most families have less than 3 months of savings. Life insurance replaces
                years of income, giving your family time to heal without financial panic.
              </p>
              <div className="scenario-stat">
                <span className="stat-number">10x</span>
                <span>your annual income is the recommended coverage amount</span>
              </div>
            </div>

            <div className="scenario-card animate-on-scroll glass-card featured">
              <div className="scenario-icon">
                <Heart size={32} />
              </div>
              <h3>Leave a Legacy of Love</h3>
              <p className="scenario-question">What will they remember about you?</p>
              <p>
                Life insurance isn't just money—it's your final act of love. It says
                "I thought about you. I planned for you. I protected you, even now."
              </p>
              <div className="scenario-stat">
                <span className="stat-number">Peace</span>
                <span>of mind for you today, security for them tomorrow</span>
              </div>
            </div>
          </div>

          <div className="why-cta animate-on-scroll">
            <div className="cta-box glass-card">
              <div className="cta-text">
                <h3>The Cost of Waiting</h3>
                <p>
                  Every year you delay, your premiums increase by an average of <strong>8-10%</strong>.
                  A healthy 35-year-old pays half what a 45-year-old pays for the same coverage.
                </p>
              </div>
              <Link to="/quote" className="btn btn-primary btn-lg">Lock In Your Rate Today</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="products-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-label">Our Coverage Options</span>
            <h2>Protection Tailored to Your Life</h2>
            <p>From young families to retirees, we have the right coverage for every stage of life.</p>
          </div>

          <div className="products-grid">
            {products.slice(0, 4).map((product, index) => (
              <div key={product.id} className={`product-card animate-on-scroll glass-card`} style={{ animationDelay: `${index * 100}ms` }}>
                <div className="product-badge">{product.startingAt}</div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <ul className="product-features">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="product-ideal">
                  <strong>Best for:</strong> {product.idealFor}
                </div>
                <Link to="/quote" className="btn btn-outline">Get Quote</Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/products" className="btn btn-primary btn-lg">
              Compare All Products
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Social Proof */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-label">Real Stories, Real Families</span>
            <h2>Hear From People Like You</h2>
          </div>

          <div className="testimonials-carousel">
            <div className="testimonial-main glass-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">{testimonials[activeTestimonial].text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="author-info">
                  <span className="author-name">{testimonials[activeTestimonial].name}</span>
                  <span className="author-location">{testimonials[activeTestimonial].location}</span>
                </div>
                <div className="testimonial-rating">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={18} fill="var(--accent)" color="var(--accent)" />
                  ))}
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className={`testimonial-card animate-on-scroll ${index === activeTestimonial ? 'active' : ''}`}>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--accent)" color="var(--accent)" />
                  ))}
                </div>
                <p className="testimonial-excerpt">"{testimonial.text.substring(0, 100)}..."</p>
                <div className="testimonial-footer">
                  <span className="author-name">{testimonial.name}</span>
                  <span className="testimonial-product">{testimonial.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <h2>Your Family's Future Starts With One Decision</h2>
            <p>
              Right now, you have the power to protect everyone you love.
              In 2 minutes, you can secure peace of mind that lasts a lifetime.
            </p>
            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>Free, no-obligation quote</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>No medical exam options</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>Coverage in as little as 24 hours</span>
              </div>
            </div>
            <div className="cta-buttons">
              <Link to="/quote" className="btn btn-accent btn-lg pulse-animation">
                Get My Free Quote
                <ArrowRight size={20} />
              </Link>
              <a href="tel:8005555433" className="btn btn-outline-white btn-lg">
                <Phone size={20} />
                Call (800) 555-LIFE
              </a>
            </div>
            <p className="cta-note">
              <Clock size={16} />
              Average quote takes less than 2 minutes
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
