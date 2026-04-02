import { Users, DollarSign, Target, TrendingUp, ArrowUp, ArrowDown, Trophy, Medal, Award, Flame, Zap, Star, Crown, Clock, Calendar, Download } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts'
import { agents, sales, leads, monthlyPerformance, productDistribution, leadSources, getAllStats, getAgentStats, badges } from '../../data/mockData'
import { exportSales, exportLeads, exportAgents } from '../../utils/exportToExcel'
import './AdminDashboard.css'

function AdminDashboard() {
  const stats = getAllStats()

  const topAgents = agents
    .map(agent => ({
      ...agent,
      stats: getAgentStats(agent.id)
    }))
    .sort((a, b) => b.stats.totalRevenue - a.stats.totalRevenue)

  const recentSales = sales.slice(0, 5)

  // Get rank icon and color
  const getRankDisplay = (index) => {
    switch (index) {
      case 0:
        return { icon: Crown, color: '#D4A853', bg: 'linear-gradient(135deg, #D4A853, #B8923F)', label: '1st' }
      case 1:
        return { icon: Medal, color: '#9CA3AF', bg: 'linear-gradient(135deg, #9CA3AF, #6B7280)', label: '2nd' }
      case 2:
        return { icon: Award, color: '#CD7F32', bg: 'linear-gradient(135deg, #CD7F32, #A0522D)', label: '3rd' }
      default:
        return { icon: Star, color: '#1B5E20', bg: 'var(--primary)', label: `${index + 1}th` }
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Drew! Here's what's happening with your team.</p>
        </div>
        <div className="header-actions">
          <div className="export-dropdown">
            <button className="btn btn-outline">
              <Download size={18} />
              Export Data
            </button>
            <div className="dropdown-menu">
              <button onClick={() => exportAgents(agents, getAgentStats)}>Export Agents</button>
              <button onClick={() => exportSales(sales, agents)}>Export Sales</button>
              <button onClick={() => exportLeads(leads, agents)}>Export Leads</button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: 'rgba(27, 94, 32, 0.1)', color: 'var(--primary)' }}>
              <Users size={22} />
            </div>
          </div>
          <div className="stat-value">{stats.totalAgents}</div>
          <div className="stat-label">Active Agents</div>
          <div className="stat-change positive">
            <ArrowUp size={14} />
            +2 this month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: 'rgba(212, 168, 83, 0.1)', color: 'var(--accent)' }}>
              <DollarSign size={22} />
            </div>
          </div>
          <div className="stat-value">${stats.totalRevenue.toLocaleString()}</div>
          <div className="stat-label">Total Revenue (MTD)</div>
          <div className="stat-change positive">
            <ArrowUp size={14} />
            +15% vs last month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
              <Target size={22} />
            </div>
          </div>
          <div className="stat-value">{stats.totalLeads}</div>
          <div className="stat-label">Active Leads</div>
          <div className="stat-change positive">
            <ArrowUp size={14} />
            +8 this week
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
              <TrendingUp size={22} />
            </div>
          </div>
          <div className="stat-value">{stats.avgCloseRate}%</div>
          <div className="stat-label">Close Rate</div>
          <div className="stat-change positive">
            <ArrowUp size={14} />
            +3% vs last month
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="leaderboard-section">
        <div className="leaderboard-header">
          <div className="leaderboard-title">
            <Trophy size={24} className="trophy-icon" />
            <div>
              <h2>Agent Leaderboard</h2>
              <span>This Month's Top Performers</span>
            </div>
          </div>
          <div className="leaderboard-period">
            <Calendar size={16} />
            <span>March 2024</span>
          </div>
        </div>

        <div className="leaderboard-podium">
          {/* Second Place */}
          <div className="podium-item second">
            <div className="podium-avatar">
              <div className="avatar-ring silver">
                <div className="avatar" style={{ background: 'var(--primary)' }}>
                  {topAgents[1]?.avatar}
                </div>
              </div>
              <div className="rank-badge silver">
                <Medal size={14} />
              </div>
            </div>
            <h4>{topAgents[1]?.name}</h4>
            <span className="territory">{topAgents[1]?.territory}</span>
            <div className="podium-stats">
              <span className="revenue">${topAgents[1]?.stats.totalRevenue.toLocaleString()}</span>
              <span className="sales">{topAgents[1]?.stats.totalSales} sales</span>
            </div>
            <div className="podium-bar" style={{ height: '120px' }}>2</div>
          </div>

          {/* First Place */}
          <div className="podium-item first">
            <div className="podium-crown">
              <Crown size={28} />
            </div>
            <div className="podium-avatar">
              <div className="avatar-ring gold">
                <div className="avatar" style={{ background: 'var(--accent)' }}>
                  {topAgents[0]?.avatar}
                </div>
              </div>
              <div className="rank-badge gold">
                <Crown size={14} />
              </div>
            </div>
            <h4>{topAgents[0]?.name}</h4>
            <span className="territory">{topAgents[0]?.territory}</span>
            <div className="podium-stats">
              <span className="revenue">${topAgents[0]?.stats.totalRevenue.toLocaleString()}</span>
              <span className="sales">{topAgents[0]?.stats.totalSales} sales</span>
            </div>
            <div className="streak-badge">
              <Flame size={14} />
              <span>5 Day Streak</span>
            </div>
            <div className="podium-bar gold" style={{ height: '160px' }}>1</div>
          </div>

          {/* Third Place */}
          <div className="podium-item third">
            <div className="podium-avatar">
              <div className="avatar-ring bronze">
                <div className="avatar" style={{ background: 'var(--primary)' }}>
                  {topAgents[2]?.avatar}
                </div>
              </div>
              <div className="rank-badge bronze">
                <Award size={14} />
              </div>
            </div>
            <h4>{topAgents[2]?.name}</h4>
            <span className="territory">{topAgents[2]?.territory}</span>
            <div className="podium-stats">
              <span className="revenue">${topAgents[2]?.stats.totalRevenue.toLocaleString()}</span>
              <span className="sales">{topAgents[2]?.stats.totalSales} sales</span>
            </div>
            <div className="podium-bar" style={{ height: '100px' }}>3</div>
          </div>
        </div>

        {/* Rest of Rankings */}
        <div className="rankings-list">
          {topAgents.slice(3).map((agent, idx) => {
            const rank = getRankDisplay(idx + 3)
            const RankIcon = rank.icon
            return (
              <div key={agent.id} className="ranking-item">
                <div className="ranking-position">
                  <span className="position-number">{idx + 4}</span>
                </div>
                <div className="ranking-avatar">
                  <div className="avatar" style={{ background: 'var(--primary)' }}>
                    {agent.avatar}
                  </div>
                </div>
                <div className="ranking-info">
                  <h4>{agent.name}</h4>
                  <span>{agent.territory}</span>
                </div>
                <div className="ranking-badges">
                  {agent.level >= 3 && (
                    <span className="mini-badge" title="Level 3+">
                      <Zap size={12} />
                    </span>
                  )}
                </div>
                <div className="ranking-stats">
                  <span className="stat-value">${agent.stats.totalRevenue.toLocaleString()}</span>
                  <span className="stat-label">{agent.stats.totalSales} sales</span>
                </div>
                <div className="ranking-progress">
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-primary"
                      style={{ width: `${agent.stats.closeRate}%` }}
                    />
                  </div>
                  <span>{agent.stats.closeRate}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Revenue Trend</h3>
            <select className="chart-filter">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="chart-body" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1B5E20"
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1B5E20" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Product Mix</h3>
          </div>
          <div className="chart-body" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {productDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Share']}
                  contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span style={{ color: '#4B5563', fontSize: 12 }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Agent Performance Comparison</h3>
          </div>
          <div className="chart-body" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topAgents.slice(0, 5).map(a => ({
                name: a.name.split(' ')[0],
                revenue: a.stats.totalRevenue,
                sales: a.stats.totalSales * 100
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB' }} />
                <Bar dataKey="revenue" fill="#1B5E20" radius={[4, 4, 0, 0]} name="Revenue ($)" />
                <Bar dataKey="sales" fill="#D4A853" radius={[4, 4, 0, 0]} name="Sales (x100)" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Lead Sources</h3>
          </div>
          <div className="chart-body" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSources}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {leadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Share']}
                  contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="tables-grid single">
        <div className="data-table">
          <div className="table-header">
            <h3 className="table-title">Recent Sales</h3>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Agent</th>
                <th>Product</th>
                <th>Commission</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => {
                const agent = agents.find(a => a.id === sale.agentId)
                return (
                  <tr key={sale.id}>
                    <td>
                      <strong>{sale.clientName}</strong>
                    </td>
                    <td>
                      <div className="agent-cell">
                        <div className="avatar small" style={{ background: 'var(--primary)' }}>
                          {agent?.avatar}
                        </div>
                        <span>{agent?.name}</span>
                      </div>
                    </td>
                    <td>{sale.productType}</td>
                    <td className="text-success">${sale.commission.toLocaleString()}</td>
                    <td>{new Date(sale.closeDate).toLocaleDateString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
