import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Phone, Mail, MapPin, Menu, X } from 'lucide-react'

// Social media icons as simple SVG components
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
import ChatWidget from '../components/ChatWidget'
import './PublicLayout.css'

function PublicLayout() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="public-layout">
      {/* Header */}
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="Full Life Financial" className="logo-img" />
            <div className="logo-text">
              <span className="logo-name">Full Life</span>
              <span className="logo-tagline">Financial</span>
            </div>
          </Link>

          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
            <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Products</Link>
            <Link to="/careers" className={location.pathname === '/careers' ? 'active' : ''}>Careers</Link>
            <Link to="/quote" className="btn btn-accent">Get Free Quote</Link>
            <Link to="/login" className="btn btn-outline btn-sm mobile-login">Agent Login</Link>
          </nav>

          <div className="header-actions">
            <Link to="/login" className="btn btn-outline btn-sm desktop-login">Agent Login</Link>
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Chat Widget */}
      <ChatWidget />

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="logo">
                <img src="/logo.png" alt="Full Life Financial" className="logo-img footer-logo-img" />
                <div className="logo-text">
                  <span className="logo-name">Full Life</span>
                  <span className="logo-tagline">Financial</span>
                </div>
              </Link>
              <p>Protecting families and securing futures since 2015. We're committed to helping you find the right life insurance coverage for your unique needs.</p>
              <div className="social-links">
                <a href="https://facebook.com/fulllifefinancial" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon /></a>
                <a href="https://instagram.com/fulllifefinancial" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
                <a href="https://linkedin.com/company/fulllifefinancial" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
                <a href="mailto:info@fulllifefinancial.com" aria-label="Email"><Mail size={20} /></a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/products">Our Products</Link>
              <Link to="/quote">Get a Quote</Link>
              <Link to="/careers">Careers</Link>
            </div>

            <div className="footer-links">
              <h4>Products</h4>
              <Link to="/products">Term Life Insurance</Link>
              <Link to="/products">Whole Life Insurance</Link>
              <Link to="/products">Universal Life</Link>
              <Link to="/products">Final Expense</Link>
            </div>

            <div className="footer-contact">
              <h4>Contact Us</h4>
              <div className="contact-item">
                <Phone size={16} />
                <span>(800) 555-LIFE</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>info@fulllifefinancial.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 Financial Way<br />Atlanta, GA 30301</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Full Life Financial. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Licensing</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
