import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Shield, Clock, Heart, DollarSign, X, Check, HelpCircle, ChevronDown } from 'lucide-react'
import { products } from '../../data/mockData'
import './Products.css'

function Products() {
  const [selectedProducts, setSelectedProducts] = useState(['term-life', 'whole-life'])
  const [showCompare, setShowCompare] = useState(false)

  const productIcons = {
    'term-life': Clock,
    'whole-life': Shield,
    'universal-life': DollarSign,
    'final-expense': Heart
  }

  const comparisonData = {
    'term-life': {
      name: 'Term Life',
      duration: '10-30 years',
      cashValue: false,
      fixedPremiums: true,
      medicalExam: 'Usually required',
      bestFor: 'Young families, mortgage protection',
      price: '$15/mo',
      coverage: '$100K - $2M+',
      flexibility: 'Low',
      investment: false
    },
    'whole-life': {
      name: 'Whole Life',
      duration: 'Lifetime',
      cashValue: true,
      fixedPremiums: true,
      medicalExam: 'Usually required',
      bestFor: 'Estate planning, legacy building',
      price: '$75/mo',
      coverage: '$50K - $1M+',
      flexibility: 'Low',
      investment: true
    },
    'universal-life': {
      name: 'Universal Life',
      duration: 'Lifetime',
      cashValue: true,
      fixedPremiums: false,
      medicalExam: 'Usually required',
      bestFor: 'Flexibility seekers, wealth building',
      price: '$100/mo',
      coverage: '$100K - $2M+',
      flexibility: 'High',
      investment: true
    },
    'final-expense': {
      name: 'Final Expense',
      duration: 'Lifetime',
      cashValue: true,
      fixedPremiums: true,
      medicalExam: 'Not required',
      bestFor: 'Seniors, funeral cost coverage',
      price: '$25/mo',
      coverage: '$5K - $50K',
      flexibility: 'Low',
      investment: false
    }
  }

  const toggleProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      if (selectedProducts.length > 1) {
        setSelectedProducts(selectedProducts.filter(p => p !== productId))
      }
    } else if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  return (
    <div className="products-page">
      {/* Hero */}
      <section className="products-hero">
        <div className="container">
          <span className="section-label">Our Products</span>
          <h1>Life Insurance Solutions</h1>
          <p>
            From affordable term life to comprehensive whole life coverage, we have
            the right protection for every stage of life.
          </p>
        </div>
      </section>

      {/* Products List */}
      <section className="products-list">
        <div className="container">
          {products.map((product, index) => {
            const Icon = productIcons[product.id] || Shield
            return (
              <div key={product.id} className={`product-detail ${index % 2 === 1 ? 'reverse' : ''}`}>
                <div className="product-content">
                  <div className="product-icon-wrapper">
                    <Icon size={32} />
                  </div>
                  <h2>{product.name}</h2>
                  <p className="product-description">{product.description}</p>

                  <div className="product-ideal">
                    <strong>Ideal For:</strong> {product.idealFor}
                  </div>

                  <ul className="product-features-list">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>
                        <CheckCircle size={18} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="product-price-badge">
                    Starting at <span>{product.startingAt}</span>
                  </div>

                  <Link to="/quote" className="btn btn-primary">
                    Get a Quote
                    <ArrowRight size={18} />
                  </Link>
                </div>

                <div className="product-visual">
                  <div className="visual-card">
                    <Icon size={64} />
                    <span className="visual-name">{product.name}</span>
                    <span className="visual-price">{product.startingAt}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Interactive Comparison Tool */}
      <section className="comparison-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Compare Coverage</span>
            <h2>Which Policy is Right for You?</h2>
            <p>Select policies to compare side-by-side and find your perfect match.</p>
          </div>

          {/* Product Selector */}
          <div className="product-selector">
            <span className="selector-label">Select policies to compare (up to 3):</span>
            <div className="selector-chips">
              {products.map(product => {
                const Icon = productIcons[product.id]
                const isSelected = selectedProducts.includes(product.id)
                return (
                  <button
                    key={product.id}
                    className={`selector-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleProduct(product.id)}
                  >
                    <Icon size={18} />
                    <span>{product.name.replace(' Insurance', '')}</span>
                    {isSelected && <Check size={16} className="check-icon" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="comparison-cards" style={{ gridTemplateColumns: `repeat(${selectedProducts.length}, 1fr)` }}>
            {selectedProducts.map((productId, index) => {
              const data = comparisonData[productId]
              const Icon = productIcons[productId]
              return (
                <div key={productId} className={`compare-card ${index === 0 ? 'featured' : ''}`}>
                  {index === 0 && <div className="featured-badge">Most Popular</div>}
                  <div className="compare-header">
                    <div className="compare-icon">
                      <Icon size={28} />
                    </div>
                    <h3>{data.name}</h3>
                    <div className="compare-price">
                      <span className="price-value">{data.price}</span>
                      <span className="price-label">starting</span>
                    </div>
                  </div>

                  <div className="compare-features">
                    <div className="feature-row">
                      <span className="feature-label">
                        <HelpCircle size={14} />
                        Coverage
                      </span>
                      <span className="feature-value">{data.coverage}</span>
                    </div>
                    <div className="feature-row">
                      <span className="feature-label">Duration</span>
                      <span className="feature-value">{data.duration}</span>
                    </div>
                    <div className="feature-row">
                      <span className="feature-label">Cash Value</span>
                      <span className={`feature-value ${data.cashValue ? 'yes' : 'no'}`}>
                        {data.cashValue ? <Check size={16} /> : <X size={16} />}
                        {data.cashValue ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="feature-row">
                      <span className="feature-label">Fixed Premiums</span>
                      <span className={`feature-value ${data.fixedPremiums ? 'yes' : ''}`}>
                        {data.fixedPremiums ? <Check size={16} /> : null}
                        {data.fixedPremiums ? 'Yes' : 'Flexible'}
                      </span>
                    </div>
                    <div className="feature-row">
                      <span className="feature-label">Medical Exam</span>
                      <span className={`feature-value ${data.medicalExam === 'Not required' ? 'yes' : ''}`}>
                        {data.medicalExam}
                      </span>
                    </div>
                    <div className="feature-row">
                      <span className="feature-label">Investment Component</span>
                      <span className={`feature-value ${data.investment ? 'yes' : 'no'}`}>
                        {data.investment ? <Check size={16} /> : <X size={16} />}
                        {data.investment ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="feature-row">
                      <span className="feature-label">Flexibility</span>
                      <span className="feature-value">{data.flexibility}</span>
                    </div>
                  </div>

                  <div className="compare-best">
                    <strong>Best for:</strong> {data.bestFor}
                  </div>

                  <Link to="/quote" className={`btn ${index === 0 ? 'btn-primary' : 'btn-outline'}`}>
                    Get {data.name} Quote
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Quick Comparison Table (Mobile Friendly) */}
          <details className="mobile-comparison">
            <summary>
              <ChevronDown size={20} />
              View Full Comparison Table
            </summary>
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    {selectedProducts.map(id => (
                      <th key={id}>{comparisonData[id].name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Coverage Duration</td>
                    {selectedProducts.map(id => (
                      <td key={id}>{comparisonData[id].duration}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Cash Value</td>
                    {selectedProducts.map(id => (
                      <td key={id}>
                        <span className={comparisonData[id].cashValue ? 'yes' : 'no'}>
                          {comparisonData[id].cashValue ? 'Yes' : 'No'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Fixed Premiums</td>
                    {selectedProducts.map(id => (
                      <td key={id}>
                        {comparisonData[id].fixedPremiums ? <span className="yes">Yes</span> : 'Flexible'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Medical Exam</td>
                    {selectedProducts.map(id => (
                      <td key={id}>{comparisonData[id].medicalExam}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Starting Price</td>
                    {selectedProducts.map(id => (
                      <td key={id} className="price">{comparisonData[id].price}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="products-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Not Sure Which to Choose?</h2>
            <p>Our licensed agents will help you find the perfect coverage for your budget and needs. No pressure, just expert advice.</p>
            <Link to="/quote" className="btn btn-accent btn-lg">
              Get a Free Consultation
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products
