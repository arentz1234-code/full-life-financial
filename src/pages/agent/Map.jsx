import { useState } from 'react'
import { MapPin, Target, CheckCircle, Filter, Flame, Thermometer, Snowflake, DollarSign, Phone, Mail } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { agents, leads, sales } from '../../data/mockData'
import './AgentMap.css'

// Custom SVG marker icons - more graphic and fun
const createGraphicIcon = (type) => {
  let svg = ''

  switch (type) {
    case 'hot':
      svg = `
        <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C8.954 0 0 8.954 0 20c0 14 20 28 20 28s20-14 20-28C40 8.954 31.046 0 20 0z" fill="#EF4444"/>
          <path d="M20 4C11.163 4 4 11.163 4 20c0 11 16 22 16 22s16-11 16-22c0-8.837-7.163-16-16-16z" fill="#FCA5A5"/>
          <circle cx="20" cy="18" r="10" fill="#FEE2E2"/>
          <path d="M20 10c-1.5 0-3 2-3 5s1.5 6 3 8c1.5-2 3-5 3-8s-1.5-5-3-5z" fill="#EF4444"/>
          <path d="M17 14c-.5 1-1 2.5-1 4 0 2 1 4 2 5.5-1.5-1-2.5-3-2.5-5s.5-3.5 1.5-4.5z" fill="#F87171"/>
          <path d="M23 14c.5 1 1 2.5 1 4 0 2-1 4-2 5.5 1.5-1 2.5-3 2.5-5s-.5-3.5-1.5-4.5z" fill="#F87171"/>
        </svg>`
      break
    case 'warm':
      svg = `
        <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C8.954 0 0 8.954 0 20c0 14 20 28 20 28s20-14 20-28C40 8.954 31.046 0 20 0z" fill="#F59E0B"/>
          <path d="M20 4C11.163 4 4 11.163 4 20c0 11 16 22 16 22s16-11 16-22c0-8.837-7.163-16-16-16z" fill="#FCD34D"/>
          <circle cx="20" cy="18" r="10" fill="#FEF3C7"/>
          <rect x="18" y="10" width="4" height="12" rx="2" fill="#F59E0B"/>
          <circle cx="20" cy="24" r="2" fill="#F59E0B"/>
        </svg>`
      break
    case 'cold':
      svg = `
        <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C8.954 0 0 8.954 0 20c0 14 20 28 20 28s20-14 20-28C40 8.954 31.046 0 20 0z" fill="#3B82F6"/>
          <path d="M20 4C11.163 4 4 11.163 4 20c0 11 16 22 16 22s16-11 16-22c0-8.837-7.163-16-16-16z" fill="#60A5FA"/>
          <circle cx="20" cy="18" r="10" fill="#DBEAFE"/>
          <path d="M20 10v16M12 18h16M14 12l12 12M26 12L14 24" stroke="#3B82F6" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      break
    case 'sale':
      svg = `
        <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C8.954 0 0 8.954 0 20c0 14 20 28 20 28s20-14 20-28C40 8.954 31.046 0 20 0z" fill="#10B981"/>
          <path d="M20 4C11.163 4 4 11.163 4 20c0 11 16 22 16 22s16-11 16-22c0-8.837-7.163-16-16-16z" fill="#34D399"/>
          <circle cx="20" cy="18" r="10" fill="#D1FAE5"/>
          <path d="M14 18l4 4 8-8" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
      break
    default:
      svg = `
        <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C8.954 0 0 8.954 0 20c0 14 20 28 20 28s20-14 20-28C40 8.954 31.046 0 20 0z" fill="#6B7280"/>
          <circle cx="20" cy="18" r="8" fill="white"/>
        </svg>`
  }

  return new L.DivIcon({
    className: 'custom-graphic-marker',
    html: svg,
    iconSize: [40, 48],
    iconAnchor: [20, 48],
    popupAnchor: [0, -48],
  })
}

const hotIcon = createGraphicIcon('hot')
const warmIcon = createGraphicIcon('warm')
const coldIcon = createGraphicIcon('cold')
const saleIcon = createGraphicIcon('sale')

function AgentMap() {
  const agent = agents[0]
  const agentLeads = leads.filter(l => l.assignedTo === agent.id)
  const agentSales = sales.filter(s => s.agentId === agent.id)

  const [showLeads, setShowLeads] = useState(true)
  const [showSales, setShowSales] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Center on Southeast US (Alabama, Florida, Georgia)
  const center = [32.5, -84.5]

  const filteredLeads = agentLeads.filter(lead => {
    if (!showLeads) return false
    if (selectedStatus === 'all') return true
    return lead.status === selectedStatus
  })

  const getLeadIcon = (status) => {
    switch (status) {
      case 'hot': return hotIcon
      case 'warm': return warmIcon
      case 'cold': return coldIcon
      default: return hotIcon
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'hot': return { label: 'HOT LEAD', icon: Flame, color: '#EF4444' }
      case 'warm': return { label: 'WARM LEAD', icon: Thermometer, color: '#F59E0B' }
      case 'cold': return { label: 'COLD LEAD', icon: Snowflake, color: '#3B82F6' }
      default: return { label: 'LEAD', icon: Target, color: '#6B7280' }
    }
  }

  return (
    <div className="agent-map">
      <div className="page-header">
        <div>
          <h1>Territory Map</h1>
          <p>View your leads and sales across the Southeast.</p>
        </div>
      </div>

      {/* Map Stats */}
      <div className="map-stats">
        <div className="stat-item hot">
          <div className="stat-icon-wrapper">
            <Flame size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{agentLeads.filter(l => l.status === 'hot').length}</span>
            <span className="stat-text">Hot Leads</span>
          </div>
        </div>
        <div className="stat-item warm">
          <div className="stat-icon-wrapper">
            <Thermometer size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{agentLeads.filter(l => l.status === 'warm').length}</span>
            <span className="stat-text">Warm Leads</span>
          </div>
        </div>
        <div className="stat-item cold">
          <div className="stat-icon-wrapper">
            <Snowflake size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{agentLeads.filter(l => l.status === 'cold').length}</span>
            <span className="stat-text">Cold Leads</span>
          </div>
        </div>
        <div className="stat-item sale">
          <div className="stat-icon-wrapper">
            <DollarSign size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{agentSales.length}</span>
            <span className="stat-text">Closed Sales</span>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="map-controls">
        <div className="control-group">
          <label className={`toggle-chip ${showLeads ? 'active' : ''}`}>
            <input
              type="checkbox"
              checked={showLeads}
              onChange={(e) => setShowLeads(e.target.checked)}
            />
            <Target size={16} />
            <span>Leads</span>
          </label>
          <label className={`toggle-chip ${showSales ? 'active sale' : ''}`}>
            <input
              type="checkbox"
              checked={showSales}
              onChange={(e) => setShowSales(e.target.checked)}
            />
            <CheckCircle size={16} />
            <span>Sales</span>
          </label>
        </div>
        <select
          className="status-filter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Lead Statuses</option>
          <option value="hot">Hot Only</option>
          <option value="warm">Warm Only</option>
          <option value="cold">Cold Only</option>
        </select>
      </div>

      {/* Map Container */}
      <div className="map-container">
        <MapContainer
          center={center}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Lead Markers */}
          {filteredLeads.map(lead => {
            const statusInfo = getStatusLabel(lead.status)
            const StatusIcon = statusInfo.icon
            return (
              <Marker
                key={lead.id}
                position={[lead.location.lat, lead.location.lng]}
                icon={getLeadIcon(lead.status)}
              >
                <Popup>
                  <div className="map-popup">
                    <div className="popup-header" style={{ borderColor: statusInfo.color }}>
                      <StatusIcon size={18} style={{ color: statusInfo.color }} />
                      <span className="status-tag" style={{ background: statusInfo.color }}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <h4>{lead.name}</h4>
                    <p className="popup-location">
                      <MapPin size={14} />
                      {lead.location.city}, {lead.location.state}
                    </p>
                    <div className="popup-details">
                      <div className="detail-row">
                        <span className="label">Interest:</span>
                        <span className="value">{lead.productInterest}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Est. Value:</span>
                        <span className="value highlight">${lead.estimatedValue.toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="popup-notes">{lead.notes}</p>
                    <div className="popup-actions">
                      <button className="popup-btn">
                        <Phone size={14} /> Call
                      </button>
                      <button className="popup-btn">
                        <Mail size={14} /> Email
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
          })}

          {/* Sales Markers */}
          {showSales && agentSales.map(sale => (
            <Marker
              key={sale.id}
              position={[sale.location.lat, sale.location.lng]}
              icon={saleIcon}
            >
              <Popup>
                <div className="map-popup">
                  <div className="popup-header sale" style={{ borderColor: '#10B981' }}>
                    <CheckCircle size={18} style={{ color: '#10B981' }} />
                    <span className="status-tag" style={{ background: '#10B981' }}>
                      CLOSED SALE
                    </span>
                  </div>
                  <h4>{sale.clientName}</h4>
                  <p className="popup-location">
                    <MapPin size={14} />
                    {sale.location.city}, {sale.location.state}
                  </p>
                  <div className="popup-details">
                    <div className="detail-row">
                      <span className="label">Product:</span>
                      <span className="value">{sale.productType}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Commission:</span>
                      <span className="value highlight">${sale.commission.toLocaleString()}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Closed:</span>
                      <span className="value">{new Date(sale.closeDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="map-legend">
        <h4>Map Legend</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-icon hot">
              <Flame size={16} />
            </div>
            <div className="legend-text">
              <span className="legend-title">Hot Lead</span>
              <span className="legend-desc">Ready to buy</span>
            </div>
          </div>
          <div className="legend-item">
            <div className="legend-icon warm">
              <Thermometer size={16} />
            </div>
            <div className="legend-text">
              <span className="legend-title">Warm Lead</span>
              <span className="legend-desc">Interested</span>
            </div>
          </div>
          <div className="legend-item">
            <div className="legend-icon cold">
              <Snowflake size={16} />
            </div>
            <div className="legend-text">
              <span className="legend-title">Cold Lead</span>
              <span className="legend-desc">Needs nurturing</span>
            </div>
          </div>
          <div className="legend-item">
            <div className="legend-icon sale">
              <CheckCircle size={16} />
            </div>
            <div className="legend-text">
              <span className="legend-title">Closed Sale</span>
              <span className="legend-desc">Won deal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentMap
