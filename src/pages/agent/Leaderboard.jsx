import { Trophy, Medal, Award, TrendingUp, Flame, Crown, Target, Briefcase, Gem, Zap, BookOpen, Rocket, Phone, DollarSign } from 'lucide-react'
import { agents, getAgentStats, badges as badgeDefinitions } from '../../data/mockData'
import './AgentLeaderboard.css'

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
function BadgeIcon({ badge, size = 16 }) {
  const IconComponent = iconMap[badge.icon]
  if (!IconComponent) return null
  return <IconComponent size={size} style={{ color: badge.color }} />
}

function AgentLeaderboard() {
  const currentAgent = agents[0]

  // Rank agents by revenue
  const rankedAgents = agents
    .map(agent => ({
      ...agent,
      stats: getAgentStats(agent.id)
    }))
    .sort((a, b) => b.stats.totalRevenue - a.stats.totalRevenue)

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown size={24} className="rank-icon gold" />
      case 2: return <Medal size={24} className="rank-icon silver" />
      case 3: return <Medal size={24} className="rank-icon bronze" />
      default: return <span className="rank-number">{rank}</span>
    }
  }

  const getRankClass = (rank) => {
    switch (rank) {
      case 1: return 'gold'
      case 2: return 'silver'
      case 3: return 'bronze'
      default: return ''
    }
  }

  return (
    <div className="agent-leaderboard">
      <div className="page-header">
        <div>
          <h1>Leaderboard</h1>
          <p>See how you stack up against the team this month.</p>
        </div>
      </div>

      {/* Your Rank Card */}
      <div className="your-rank-card">
        <div className="rank-content">
          <div className="rank-position">
            <span className="position-label">Your Rank</span>
            <span className="position-value">#{currentAgent.rank}</span>
          </div>
          <div className="rank-stats">
            <div className="rank-stat">
              <span className="stat-value">${getAgentStats(currentAgent.id).totalRevenue.toLocaleString()}</span>
              <span className="stat-label">Revenue</span>
            </div>
            <div className="rank-stat">
              <span className="stat-value">{getAgentStats(currentAgent.id).totalSales}</span>
              <span className="stat-label">Sales</span>
            </div>
            <div className="rank-stat">
              <span className="stat-value">{currentAgent.streak}</span>
              <span className="stat-label">Day Streak</span>
            </div>
            <div className="rank-stat">
              <span className="stat-value">Level {currentAgent.level}</span>
              <span className="stat-label">Current Level</span>
            </div>
          </div>
        </div>
        <div className="rank-badges">
          {currentAgent.badges.slice(0, 4).map(badgeId => {
            const badge = badgeDefinitions[badgeId]
            return badge ? (
              <span key={badgeId} className="mini-badge" title={badge.name}>
                <BadgeIcon badge={badge} size={18} />
              </span>
            ) : null
          })}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="podium">
        {/* Second Place */}
        <div className="podium-item second">
          <div className="podium-avatar" style={{ background: '#C0C0C0' }}>
            {rankedAgents[1]?.avatar}
          </div>
          <Medal size={28} className="podium-icon silver" />
          <h3>{rankedAgents[1]?.name}</h3>
          <span className="podium-revenue">
            ${rankedAgents[1]?.stats.totalRevenue.toLocaleString()}
          </span>
          <div className="podium-base second"></div>
        </div>

        {/* First Place */}
        <div className="podium-item first">
          <div className="podium-avatar" style={{ background: 'var(--accent)' }}>
            {rankedAgents[0]?.avatar}
          </div>
          <Crown size={32} className="podium-icon gold" />
          <h3>{rankedAgents[0]?.name}</h3>
          <span className="podium-revenue">
            ${rankedAgents[0]?.stats.totalRevenue.toLocaleString()}
          </span>
          <div className="podium-base first"></div>
        </div>

        {/* Third Place */}
        <div className="podium-item third">
          <div className="podium-avatar" style={{ background: '#CD7F32' }}>
            {rankedAgents[2]?.avatar}
          </div>
          <Medal size={24} className="podium-icon bronze" />
          <h3>{rankedAgents[2]?.name}</h3>
          <span className="podium-revenue">
            ${rankedAgents[2]?.stats.totalRevenue.toLocaleString()}
          </span>
          <div className="podium-base third"></div>
        </div>
      </div>

      {/* Full Rankings Table */}
      <div className="rankings-table">
        <div className="table-header">
          <h3>Full Rankings</h3>
        </div>
        <div className="rankings-list">
          {rankedAgents.map((agent, index) => {
            const rank = index + 1
            const isCurrentAgent = agent.id === currentAgent.id
            return (
              <div key={agent.id} className={`ranking-item ${getRankClass(rank)} ${isCurrentAgent ? 'current' : ''}`}>
                <div className="rank-badge">
                  {getRankIcon(rank)}
                </div>
                <div className="agent-info">
                  <div className="avatar" style={{ background: `hsl(${agent.id.charCodeAt(6) * 30}, 60%, 45%)` }}>
                    {agent.avatar}
                  </div>
                  <div className="agent-details">
                    <span className="agent-name">
                      {agent.name}
                      {isCurrentAgent && <span className="you-badge">You</span>}
                    </span>
                    <span className="agent-territory">{agent.territory}</span>
                  </div>
                </div>
                <div className="agent-metrics">
                  <div className="metric">
                    <span className="metric-value">{agent.stats.totalSales}</span>
                    <span className="metric-label">Sales</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">${agent.stats.totalRevenue.toLocaleString()}</span>
                    <span className="metric-label">Revenue</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">{agent.stats.closeRate}%</span>
                    <span className="metric-label">Close Rate</span>
                  </div>
                </div>
                <div className="agent-streak">
                  {agent.streak > 0 && (
                    <div className="streak-badge">
                      <Flame size={14} />
                      {agent.streak}
                    </div>
                  )}
                </div>
                <div className="agent-badges">
                  {agent.badges.slice(0, 3).map(badgeId => {
                    const badge = badgeDefinitions[badgeId]
                    return badge ? (
                      <span key={badgeId} className="badge-icon" title={badge.name}>
                        <BadgeIcon badge={badge} size={14} />
                      </span>
                    ) : null
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="achievements-section">
        <h3>Team Achievements This Month</h3>
        <div className="achievements-grid">
          <div className="achievement-card">
            <span className="achievement-icon calls">
              <Phone size={24} />
            </span>
            <div className="achievement-content">
              <span className="achievement-title">Most Calls</span>
              <span className="achievement-winner">Sarah Mitchell - 120 calls</span>
            </div>
          </div>
          <div className="achievement-card">
            <span className="achievement-icon revenue">
              <DollarSign size={24} />
            </span>
            <div className="achievement-content">
              <span className="achievement-title">Largest Policy</span>
              <span className="achievement-winner">Marcus Johnson - $750K coverage</span>
            </div>
          </div>
          <div className="achievement-card">
            <span className="achievement-icon speed">
              <Zap size={24} />
            </span>
            <div className="achievement-content">
              <span className="achievement-title">Fastest Close</span>
              <span className="achievement-winner">Jennifer Cruz - 2 days</span>
            </div>
          </div>
          <div className="achievement-card">
            <span className="achievement-icon streak">
              <Flame size={24} />
            </span>
            <div className="achievement-content">
              <span className="achievement-title">Longest Streak</span>
              <span className="achievement-winner">Sarah Mitchell - 12 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentLeaderboard
