import { TrendingUp, TrendingDown, DollarSign, Users, Target, Award, Download } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line, ComposedChart
} from 'recharts'
import {
  monthlyPerformance, productDistribution, leadSources, agentPerformance,
  goals, agents, getAgentStats, sales, leads
} from '../../data/mockData'
import { exportAgents, exportSales, exportLeads, exportToCSV } from '../../utils/exportToExcel'
import './AdminAnalytics.css'

function AdminAnalytics() {
  // Weekly performance data
  const weeklyData = [
    { day: 'Mon', calls: 85, meetings: 12, quotes: 8, sales: 3 },
    { day: 'Tue', calls: 92, meetings: 15, quotes: 10, sales: 4 },
    { day: 'Wed', calls: 78, meetings: 10, quotes: 6, sales: 2 },
    { day: 'Thu', calls: 95, meetings: 18, quotes: 12, sales: 5 },
    { day: 'Fri', calls: 88, meetings: 14, quotes: 9, sales: 4 }
  ]

  // Conversion funnel
  const funnelData = [
    { stage: 'Leads', value: 100, fill: '#1B5E20' },
    { stage: 'Contacted', value: 75, fill: '#4CAF50' },
    { stage: 'Qualified', value: 50, fill: '#81C784' },
    { stage: 'Quoted', value: 35, fill: '#D4A853' },
    { stage: 'Closed', value: 22, fill: '#B8923F' }
  ]

  // Territory performance
  const territoryData = [
    { territory: 'Alabama', revenue: 15200, sales: 8, agents: 1 },
    { territory: 'Florida', revenue: 12800, sales: 6, agents: 2 },
    { territory: 'Georgia', revenue: 18500, sales: 10, agents: 2 }
  ]

  return (
    <div className="admin-analytics">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Comprehensive performance metrics and insights for your team.</p>
        </div>
        <div className="header-actions">
          <div className="export-dropdown">
            <button className="btn btn-outline">
              <Download size={18} />
              Export Reports
            </button>
            <div className="dropdown-menu">
              <button onClick={() => exportAgents(agents, getAgentStats)}>Agent Performance</button>
              <button onClick={() => exportSales(sales, agents)}>Sales Report</button>
              <button onClick={() => exportLeads(leads, agents)}>Leads Report</button>
              <button onClick={() => exportToCSV(monthlyPerformance, 'monthly_performance', [
                { key: 'month', label: 'Month' },
                { key: 'sales', label: 'Sales' },
                { key: 'revenue', label: 'Revenue ($)' },
                { key: 'leads', label: 'Leads' }
              ])}>Monthly Performance</button>
            </div>
          </div>
        </div>
      </div>

      {/* Goals Progress */}
      <div className="goals-section">
        <h2 className="section-title">Monthly Goals Progress</h2>
        <div className="goals-grid">
          <div className="goal-card">
            <div className="goal-header">
              <div className="goal-icon" style={{ background: 'rgba(27, 94, 32, 0.1)', color: 'var(--primary)' }}>
                <Target size={20} />
              </div>
              <span className="goal-label">Sales Target</span>
            </div>
            <div className="goal-values">
              <span className="current">{goals.monthly.sales.current}</span>
              <span className="separator">/</span>
              <span className="target">{goals.monthly.sales.target}</span>
            </div>
            <div className="goal-progress">
              <div
                className="goal-bar"
                style={{
                  width: `${(goals.monthly.sales.current / goals.monthly.sales.target) * 100}%`,
                  background: goals.monthly.sales.current >= goals.monthly.sales.target * 0.8 ? 'var(--success)' : 'var(--warning)'
                }}
              />
            </div>
            <span className="goal-percentage">
              {Math.round((goals.monthly.sales.current / goals.monthly.sales.target) * 100)}% Complete
            </span>
          </div>

          <div className="goal-card">
            <div className="goal-header">
              <div className="goal-icon" style={{ background: 'rgba(212, 168, 83, 0.1)', color: 'var(--accent)' }}>
                <DollarSign size={20} />
              </div>
              <span className="goal-label">Revenue Target</span>
            </div>
            <div className="goal-values">
              <span className="current">${(goals.monthly.revenue.current / 1000).toFixed(0)}k</span>
              <span className="separator">/</span>
              <span className="target">${(goals.monthly.revenue.target / 1000).toFixed(0)}k</span>
            </div>
            <div className="goal-progress">
              <div
                className="goal-bar"
                style={{
                  width: `${(goals.monthly.revenue.current / goals.monthly.revenue.target) * 100}%`,
                  background: 'var(--accent)'
                }}
              />
            </div>
            <span className="goal-percentage">
              {Math.round((goals.monthly.revenue.current / goals.monthly.revenue.target) * 100)}% Complete
            </span>
          </div>

          <div className="goal-card">
            <div className="goal-header">
              <div className="goal-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
                <Users size={20} />
              </div>
              <span className="goal-label">Leads Target</span>
            </div>
            <div className="goal-values">
              <span className="current">{goals.monthly.leads.current}</span>
              <span className="separator">/</span>
              <span className="target">{goals.monthly.leads.target}</span>
            </div>
            <div className="goal-progress">
              <div
                className="goal-bar"
                style={{
                  width: `${(goals.monthly.leads.current / goals.monthly.leads.target) * 100}%`,
                  background: 'var(--info)'
                }}
              />
            </div>
            <span className="goal-percentage">
              {Math.round((goals.monthly.leads.current / goals.monthly.leads.target) * 100)}% Complete
            </span>
          </div>

          <div className="goal-card">
            <div className="goal-header">
              <div className="goal-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                <Award size={20} />
              </div>
              <span className="goal-label">Calls Target</span>
            </div>
            <div className="goal-values">
              <span className="current">{goals.monthly.calls.current}</span>
              <span className="separator">/</span>
              <span className="target">{goals.monthly.calls.target}</span>
            </div>
            <div className="goal-progress">
              <div
                className="goal-bar"
                style={{
                  width: `${(goals.monthly.calls.current / goals.monthly.calls.target) * 100}%`,
                  background: 'var(--success)'
                }}
              />
            </div>
            <span className="goal-percentage">
              {Math.round((goals.monthly.calls.current / goals.monthly.calls.target) * 100)}% Complete
            </span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="charts-row">
        <div className="chart-card wide">
          <div className="chart-header">
            <h3>Revenue & Sales Trend</h3>
            <select className="chart-filter">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="chart-body" style={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis yAxisId="left" stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB' }} />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="revenue" fill="url(#colorRevenue)" stroke="#1B5E20" name="Revenue ($)" />
                <Bar yAxisId="right" dataKey="sales" fill="#D4A853" radius={[4, 4, 0, 0]} name="Sales" />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1B5E20" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="charts-row two-col">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Weekly Activity</h3>
          </div>
          <div className="chart-body" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB' }} />
                <Legend />
                <Bar dataKey="calls" fill="#1B5E20" name="Calls" radius={[2, 2, 0, 0]} />
                <Bar dataKey="meetings" fill="#4CAF50" name="Meetings" radius={[2, 2, 0, 0]} />
                <Bar dataKey="quotes" fill="#81C784" name="Quotes" radius={[2, 2, 0, 0]} />
                <Bar dataKey="sales" fill="#D4A853" name="Sales" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Conversion Funnel</h3>
          </div>
          <div className="chart-body" style={{ height: 300 }}>
            <div className="funnel-chart">
              {funnelData.map((item, index) => (
                <div key={item.stage} className="funnel-item">
                  <div
                    className="funnel-bar"
                    style={{
                      width: `${item.value}%`,
                      background: item.fill
                    }}
                  >
                    <span className="funnel-value">{item.value}%</span>
                  </div>
                  <span className="funnel-label">{item.stage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div className="charts-row two-col">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Territory Performance</h3>
          </div>
          <div className="chart-body" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={territoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                <YAxis type="category" dataKey="territory" stroke="#9CA3AF" fontSize={12} width={80} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB' }} formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#1B5E20" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Lead Sources</h3>
          </div>
          <div className="chart-body" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {leadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB' }} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span style={{ color: '#4B5563', fontSize: 12 }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Agent Performance Table */}
      <div className="data-table">
        <div className="table-header">
          <h3>Agent Performance Breakdown</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Territory</th>
              <th>Sales</th>
              <th>Revenue</th>
              <th>Close Rate</th>
              <th>Calls</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => {
              const stats = getAgentStats(agent.id)
              const performance = agentPerformance.find(p => p.name.startsWith(agent.name.split(' ')[0]))
              return (
                <tr key={agent.id}>
                  <td>
                    <div className="agent-cell">
                      <div className="avatar" style={{ background: `hsl(${agent.id.charCodeAt(6) * 30}, 60%, 45%)` }}>
                        {agent.avatar}
                      </div>
                      <span>{agent.name}</span>
                    </div>
                  </td>
                  <td>{agent.territory}</td>
                  <td><strong>{stats.totalSales}</strong></td>
                  <td className="text-success">${stats.totalRevenue.toLocaleString()}</td>
                  <td>{stats.closeRate}%</td>
                  <td>{performance?.calls || 0}</td>
                  <td>
                    <div className="performance-indicator">
                      {stats.closeRate >= 25 ? (
                        <span className="indicator good"><TrendingUp size={14} /> Above Avg</span>
                      ) : stats.closeRate >= 20 ? (
                        <span className="indicator average">On Track</span>
                      ) : (
                        <span className="indicator needs-improvement"><TrendingDown size={14} /> Needs Focus</span>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminAnalytics
