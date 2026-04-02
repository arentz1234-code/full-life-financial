import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Menu, X } from 'lucide-react'
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
            <img src="/logo.svg" alt="Full Life Financial" className="logo-img" />
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
                <img src="/logo.svg" alt="Full Life Financial" className="logo-img footer-logo-img" />
                <div className="logo-text">
                  <span className="logo-name">Full Life</span>
                  <span className="logo-tagline">Financial</span>
                </div>
              </Link>
              <p>Protecting families and securing futures since 2015. We're committed to helping you find the right life insurance coverage for your unique needs.</p>
              <div className="social-links">
                <a href="https://facebook.com/fulllifefinancial" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
                <a href="https://instagram.com/fulllifefinancial" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
                <a href="https://linkedin.com/company/fulllifefinancial" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
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
