import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, Target, TrendingUp, Flame, Award, ArrowUp, Crown, Medal, Trophy, Plus, Calendar, Sparkles, ChevronRight } from 'lucide-react'
import {
  agents,
  getSalesByAgent,
  getAgentGoal,
  setAgentGoal,
  getActiveContests,
  getAgentTierInfo,
  getSales
} from '../../data/mockData'
import './AgentDashboard.css'

function AgentDashboard() {
  const agent = agents[0]
  const agentSales = getSalesByAgent(agent.id)
  const tierInfo = getAgentTierInfo(agent.id)
  const contests = getActiveContests()

  const [leaderboardPeriod, setLeaderboardPeriod] = useState('month')
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [goalAmount, setGoalAmount] = useState('')

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const currentGoal = getAgentGoal(agent.id, currentMonth, currentYear)

  // Calculate leaderboard data
  const getLeaderboardData = () => {
    const allSales = getSales()
    const now = new Date()

    // Filter sales based on period
    const periodStart = new Date()
    if (leaderboardPeriod === 'week') {
      periodStart.setDate(now.getDate() - 7)
    } else if (leaderboardPeriod === 'month') {
      periodStart.setDate(1)
    } else {
      periodStart.setMonth(0, 1) // YTD
    }

    // Group sales by agent and calculate totals
    const agentTotals = agents.map(a => {
      const agentSalesInPeriod = allSales.filter(s =>
        s.agentId === a.id && new Date(s.saleDate) >= periodStart
      )
      return {
        ...a,
        totalPremium: agentSalesInPeriod.reduce((sum, s) => sum + s.monthlyPremium, 0),
        totalCommission: agentSalesInPeriod.reduce((sum, s) => sum + s.commission, 0),
        policyCount: agentSalesInPeriod.length
      }
    }).sort((a, b) => b.totalPremium - a.totalPremium)

    return agentTotals
  }

  const leaderboard = getLeaderboardData()
  const myRank = leaderboard.findIndex(a => a.id === agent.id) + 1
  const myStats = leaderboard.find(a => a.id === agent.id)

  // Calculate goal progress
  const currentMonthCommission = agentSales
    .filter(s => {
      const saleDate = new Date(s.saleDate)
      return saleDate.getMonth() + 1 === currentMonth && saleDate.getFullYear() === currentYear
    })
    .reduce((sum, s) => sum + s.commission, 0)

  const goalProgress = currentGoal
    ? Math.min((currentMonthCommission / currentGoal.targetCommissionAmount) * 100, 100)
    : 0

  const handleSetGoal = () => {
    if (goalAmount && parseFloat(goalAmount) > 0) {
      setAgentGoal(agent.id, currentMonth, currentYear, parseFloat(goalAmount))
      setShowGoalModal(false)
      setGoalAmount('')
    }
  }

  // Calculate sales needed to hit goal
  const calculateRoadmap = () => {
    if (!currentGoal) return null
    const remaining = currentGoal.targetCommissionAmount - currentMonthCommission
    if (remaining <= 0) return { remaining: 0, salesNeeded: 0, perWeek: 0 }

    const avgCommissionPerSale = agentSales.length > 0
      ? agentSales.reduce((sum, s) => sum + s.commission, 0) / agentSales.length
      : 500

    const salesNeeded = Math.ceil(remaining / avgCommissionPerSale)
    const daysLeft = new Date(currentYear, currentMonth, 0).getDate() - new Date().getDate()
    const weeksLeft = Math.max(1, Math.ceil(daysLeft / 7))

    return {
      remaining,
      salesNeeded,
      perWeek: Math.ceil(salesNeeded / weeksLeft)
    }
  }

  const roadmap = calculateRoadmap()

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown size={16} />
    if (rank === 2) return <Medal size={16} />
    if (rank === 3) return <Award size={16} />
    return null
  }

  const getRankClass = (rank) => {
    if (rank === 1) return 'gold'
    if (rank === 2) return 'silver'
    if (rank === 3) return 'bronze'
    return ''
  }

  return (
    <div className="agent-dashboard">
      {/* Welcome + Log Sale */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h1>Welcome back, {agent.name.split(' ')[0]}!</h1>
          <p>
            You're ranked <strong>#{myRank}</strong> this {leaderboardPeriod}
            {agent.streak > 0 && (
              <span className="streak-inline">
                <Flame size={14} /> {agent.streak}-day streak
              </span>
            )}
          </p>
        </div>
        <Link to="/agent/sales" className="btn btn-primary btn-lg log-sale-cta">
          <Plus size={20} />
          Log a Sale
        </Link>
      </div>

      {/* Active Contest Banner */}
      {contests.length > 0 && (
        <div className="contest-banner">
          <div className="contest-icon">
            <Trophy size={24} />
          </div>
          <div className="contest-info">
            <span className="contest-label">Active Contest</span>
            <span className="contest-name">{contests[0].name}</span>
            <span className="contest-prize">{contests[0].prizeDescription}</span>
          </div>
          <div className="contest-dates">
            Ends {new Date(contests[0].endDate).toLocaleDateString()}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Leaderboard */}
        <div className="leaderboard-card">
          <div className="card-header">
            <div className="header-title">
              <Trophy size={20} className="trophy-icon" />
              <h3>Leaderboard</h3>
            </div>
            <div className="period-toggle">
              <button
                className={leaderboardPeriod === 'week' ? 'active' : ''}
                onClick={() => setLeaderboardPeriod('week')}
              >
                Week
              </button>
              <button
                className={leaderboardPeriod === 'month' ? 'active' : ''}
                onClick={() => setLeaderboardPeriod('month')}
              >
                Month
              </button>
              <button
                className={leaderboardPeriod === 'ytd' ? 'active' : ''}
                onClick={() => setLeaderboardPeriod('ytd')}
              >
                YTD
              </button>
            </div>
          </div>

          <div className="leaderboard-list">
            {leaderboard.map((a, idx) => (
              <div
                key={a.id}
                className={`leaderboard-item ${a.id === agent.id ? 'is-me' : ''} ${getRankClass(idx + 1)}`}
              >
                <div className="rank">
                  {getRankIcon(idx + 1) || <span>{idx + 1}</span>}
                </div>
                <div className="avatar" style={{ background: `hsl(${a.id.charCodeAt(6) * 30}, 60%, 45%)` }}>
                  {a.avatar}
                </div>
                <div className="agent-info">
                  <span className="agent-name">{a.name} {a.id === agent.id && '(You)'}</span>
                  <span className="agent-stats">{a.policyCount} policies</span>
                </div>
                <div className="agent-premium">
                  <span className="premium-value">${a.totalPremium.toLocaleString()}</span>
                  <span className="premium-label">premium</span>
                </div>
              </div>
            ))}
          </div>

          <Link to="/agent/leaderboard" className="view-full-link">
            View Full Leaderboard <ChevronRight size={16} />
          </Link>
        </div>

        {/* Stats + Goal Section */}
        <div className="stats-section">
          {/* Commission Counter */}
          <div className="commission-card">
            <div className="commission-header">
              <DollarSign size={24} />
              <span>My Commission</span>
            </div>
            <div className="commission-value">
              ${currentMonthCommission.toLocaleString()}
            </div>
            <div className="commission-period">
              <Calendar size={14} />
              {new Date().toLocaleString('default', { month: 'long' })} {currentYear}
            </div>
            {tierInfo && (
              <div className="tier-info">
                <Sparkles size={14} />
                {tierInfo.name} ({(tierInfo.baseMultiplier * 100).toFixed(0)}% rate)
              </div>
            )}
          </div>

          {/* Goal Progress */}
          <div className="goal-card">
            <div className="goal-header">
              <Target size={20} />
              <h3>Monthly Goal</h3>
              <button className="edit-goal-btn" onClick={() => setShowGoalModal(true)}>
                {currentGoal ? 'Edit' : 'Set Goal'}
              </button>
            </div>

            {currentGoal ? (
              <>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${goalProgress}%` }}
                    />
                  </div>
                  <div className="progress-labels">
                    <span>${currentMonthCommission.toLocaleString()}</span>
                    <span>${currentGoal.targetCommissionAmount.toLocaleString()}</span>
                  </div>
                </div>

                {roadmap && roadmap.remaining > 0 ? (
                  <div className="roadmap">
                    <div className="roadmap-item">
                      <span className="roadmap-value">${roadmap.remaining.toLocaleString()}</span>
                      <span className="roadmap-label">remaining</span>
                    </div>
                    <div className="roadmap-item">
                      <span className="roadmap-value">{roadmap.salesNeeded}</span>
                      <span className="roadmap-label">sales needed</span>
                    </div>
                    <div className="roadmap-item">
                      <span className="roadmap-value">{roadmap.perWeek}</span>
                      <span className="roadmap-label">per week</span>
                    </div>
                  </div>
                ) : roadmap && roadmap.remaining <= 0 ? (
                  <div className="goal-achieved">
                    <Award size={20} />
                    <span>Goal achieved! Great work!</span>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="no-goal">
                <p>Set a monthly commission goal to track your progress.</p>
                <button className="btn btn-primary btn-sm" onClick={() => setShowGoalModal(true)}>
                  Set Goal
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="quick-stats-row">
            <div className="quick-stat">
              <TrendingUp size={18} />
              <div>
                <span className="stat-value">{myStats?.policyCount || 0}</span>
                <span className="stat-label">Policies This {leaderboardPeriod === 'month' ? 'Month' : leaderboardPeriod === 'week' ? 'Week' : 'Year'}</span>
              </div>
            </div>
            <div className="quick-stat">
              <ArrowUp size={18} />
              <div>
                <span className="stat-value">${(myStats?.totalCommission || 0).toLocaleString()}</span>
                <span className="stat-label">Commission Earned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="modal-overlay" onClick={() => setShowGoalModal(false)}>
          <div className="modal-content goal-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Set Monthly Goal</h2>
            <p>How much commission do you want to earn this month?</p>

            <div className="form-group">
              <label className="form-label">Target Commission</label>
              <div className="input-with-prefix">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g., 5000"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            {currentGoal && (
              <p className="current-goal-note">
                Current goal: ${currentGoal.targetCommissionAmount.toLocaleString()}
              </p>
            )}

            <div className="form-actions">
              <button className="btn btn-outline" onClick={() => setShowGoalModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSetGoal}>
                Save Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgentDashboard
