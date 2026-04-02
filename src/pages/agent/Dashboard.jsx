import { DollarSign, Target, TrendingUp, Flame, Award, ArrowUp, Clock, CheckCircle, Briefcase, Gem, Zap, Crown, BookOpen, Rocket } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { agents, leads, sales, getAgentStats, badges as badgeDefinitions, activities } from '../../data/mockData'
import './AgentDashboard.css'

// Map icon names to Lucide components
const iconMap = {
  target: Target,
  briefcase: Briefcase,
  gem: Gem,
  flame: Flame,
  zap: Zap,
  crown: Crown,
  'book-open': BookOpen,
  rocket: Rocket
}

// Badge icon component
function BadgeIcon({ badge, size = 24 }) {
  const IconComponent = iconMap[badge.icon]
  if (!IconComponent) return null
  return <IconComponent size={size} style={{ color: badge.color }} />
}

function AgentDashboard() {
  // Using first agent for demo
  const agent = agents[0]
  const stats = getAgentStats(agent.id)
  const agentLeads = leads.filter(l => l.assignedTo === agent.id)
  const agentSales = sales.filter(s => s.agentId === agent.id)
  const agentActivities = activities.filter(a => a.agentId === agent.id)

  // Weekly performance
  const weeklyData = [
    { day: 'Mon', calls: 15, quotes: 3 },
    { day: 'Tue', calls: 22, quotes: 5 },
    { day: 'Wed', calls: 18, quotes: 2 },
    { day: 'Thu', calls: 25, quotes: 6 },
    { day: 'Fri', calls: 20, quotes: 4 }
  ]

  // Goals progress
  const goals = {
    sales: { current: stats.totalSales, target: 10 },
    revenue: { current: stats.totalRevenue, target: 15000 },
    calls: { current: 100, target: 150 }
  }

  return (
    <div className="agent-dashboard">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>Welcome back, {agent.name.split(' ')[0]}!</h1>
          <p>You're on a {agent.streak}-day streak. Keep it up!</p>
        </div>
        <div className="streak-badge">
          <Flame size={24} />
          <span>{agent.streak}</span>
        </div>
      </div>

      {/* Level Progress */}
      <div className="level-card">
        <div className="level-info">
          <div className="level-badge">
            <Award size={20} />
            <span>Level {agent.level}</span>
          </div>
          <div className="xp-info">
            <span className="xp-current">{agent.xp.toLocaleString()} XP</span>
            <span className="xp-divider">/</span>
            <span className="xp-target">{agent.xpToNextLevel.toLocaleString()} XP</span>
          </div>
        </div>
        <div className="level-progress">
          <div
            className="level-bar"
            style={{ width: `${(agent.xp / agent.xpToNextLevel) * 100}%` }}
          />
        </div>
        <span className="level-message">
          {agent.xpToNextLevel - agent.xp} XP until Level {agent.level + 1}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: 'rgba(212, 168, 83, 0.1)', color: 'var(--accent)' }}>
              <DollarSign size={22} />
            </div>
          </div>
          <div className="stat-value">${stats.totalRevenue.toLocaleString()}</div>
          <div className="stat-label">Commission (MTD)</div>
          <div className="stat-change positive">
            <ArrowUp size={14} />
            +$1,200 this week
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: 'rgba(27, 94, 32, 0.1)', color: 'var(--primary)' }}>
              <Target size={22} />
            </div>
          </div>
          <div className="stat-value">{stats.activeLeads}</div>
          <div className="stat-label">Active Leads</div>
          <div className="stat-change positive">
            <ArrowUp size={14} />
            +2 new today
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
              <CheckCircle size={22} />
            </div>
          </div>
          <div className="stat-value">{stats.totalSales}</div>
          <div className="stat-label">Policies Sold</div>
          <div className="stat-change positive">
            <ArrowUp size={14} />
            On track for bonus
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
              <TrendingUp size={22} />
            </div>
          </div>
          <div className="stat-value">{stats.closeRate}%</div>
          <div className="stat-label">Close Rate</div>
          <div className="stat-change positive">
            <ArrowUp size={14} />
            +5% vs last month
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Goals Progress */}
        <div className="card goals-card">
          <h3>Monthly Goals</h3>
          <div className="goals-list">
            <div className="goal-item">
              <div className="goal-info">
                <span className="goal-label">Sales</span>
                <span className="goal-values">{goals.sales.current} / {goals.sales.target}</span>
              </div>
              <div className="goal-progress">
                <div
                  className="goal-bar"
                  style={{
                    width: `${Math.min((goals.sales.current / goals.sales.target) * 100, 100)}%`,
                    background: goals.sales.current >= goals.sales.target ? 'var(--success)' : 'var(--primary)'
                  }}
                />
              </div>
            </div>
            <div className="goal-item">
              <div className="goal-info">
                <span className="goal-label">Revenue</span>
                <span className="goal-values">${(goals.revenue.current / 1000).toFixed(1)}k / ${(goals.revenue.target / 1000).toFixed(1)}k</span>
              </div>
              <div className="goal-progress">
                <div
                  className="goal-bar"
                  style={{
                    width: `${Math.min((goals.revenue.current / goals.revenue.target) * 100, 100)}%`,
                    background: 'var(--accent)'
                  }}
                />
              </div>
            </div>
            <div className="goal-item">
              <div className="goal-info">
                <span className="goal-label">Calls</span>
                <span className="goal-values">{goals.calls.current} / {goals.calls.target}</span>
              </div>
              <div className="goal-progress">
                <div
                  className="goal-bar"
                  style={{
                    width: `${Math.min((goals.calls.current / goals.calls.target) * 100, 100)}%`,
                    background: 'var(--info)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="card chart-card">
          <h3>This Week's Activity</h3>
          <div className="chart-body" style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB' }} />
                <Bar dataKey="calls" fill="#1B5E20" name="Calls" radius={[4, 4, 0, 0]} />
                <Bar dataKey="quotes" fill="#D4A853" name="Quotes" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="bottom-grid">
        {/* Hot Leads */}
        <div className="card">
          <div className="card-header">
            <h3>Hot Leads</h3>
            <span className="badge badge-error">{stats.hotLeads} Hot</span>
          </div>
          <div className="leads-list">
            {agentLeads.filter(l => l.status === 'hot').map(lead => (
              <div key={lead.id} className="lead-item">
                <div className="lead-info">
                  <span className="lead-name">{lead.name}</span>
                  <span className="lead-product">{lead.productInterest}</span>
                </div>
                <div className="lead-value">${lead.estimatedValue.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="activity-list">
            {agentActivities.slice(0, 5).map(activity => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {activity.type === 'call' && '📞'}
                  {activity.type === 'meeting' && '📅'}
                  {activity.type === 'quote' && '📝'}
                  {activity.type === 'close' && '🎉'}
                  {activity.type === 'email' && '📧'}
                </div>
                <div className="activity-content">
                  <span className="activity-desc">{activity.description}</span>
                  <span className="activity-time">
                    <Clock size={12} />
                    {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="card">
          <div className="card-header">
            <h3>Your Badges</h3>
            <span className="badge badge-gold">{agent.badges.length} Earned</span>
          </div>
          <div className="badges-grid">
            {agent.badges.map(badgeId => {
              const badge = badgeDefinitions[badgeId]
              return badge ? (
                <div key={badgeId} className="badge-card" style={{ borderColor: badge.color }}>
                  <span className="badge-emoji">
                    <BadgeIcon badge={badge} size={28} />
                  </span>
                  <span className="badge-name">{badge.name}</span>
                </div>
              ) : null
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentDashboard
