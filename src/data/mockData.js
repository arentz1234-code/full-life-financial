// Mock Data for Full Life Financial

// Commission Tiers - add via admin panel
export const commissionTiers = [];

// Carriers - add via admin panel
export const carriers = [];

// Agent Tier History (tracks all tier assignments)
export const agentTierHistory = [];

// Commission Audit Log
export const commissionAuditLog = [];

// Contests
export const contests = [];

// Agent Goals
export const agentGoals = [];

// Notifications
export const notifications = [];

// Admin user - update with your info
export const adminUser = {
  id: 'admin-001',
  name: 'Admin',
  email: 'admin@fulllifefinancial.com',
  password: 'admin123',
  role: 'admin',
  avatar: 'AD',
  title: 'Administrator'
};

// Sales Agents - demo agent for testing
export const agents = [
  {
    id: 'agent-001',
    name: 'Demo Agent',
    email: 'agent@demo.com',
    password: 'demo123',
    phone: '(555) 123-4567',
    territory: 'Alabama',
    commissionTierId: 'tier-001',
    avatar: 'DA',
    status: 'active',
    level: 1,
    badges: [],
    streak: 0,
    hireDate: '2024-01-01'
  }
];

// Badge definitions - icon names map to Lucide icons
export const badges = {
  'first-sale': { name: 'First Sale', icon: 'target', description: 'Closed your first policy', color: '#10B981' },
  'closer': { name: 'The Closer', icon: 'briefcase', description: 'Close rate above 30%', color: '#3B82F6' },
  '10k-club': { name: '10K Club', icon: 'gem', description: 'Sold $10,000+ in a single month', color: '#8B5CF6' },
  'streak-7': { name: 'Week Warrior', icon: 'flame', description: '7 day activity streak', color: '#EF4444' },
  'quick-closer': { name: 'Quick Closer', icon: 'zap', description: 'Closed a deal in under 3 days', color: '#F59E0B' },
  'referral-king': { name: 'Referral King', icon: 'crown', description: '5+ referral sales', color: '#D4A853' },
  'fast-learner': { name: 'Fast Learner', icon: 'book-open', description: 'Completed training in record time', color: '#06B6D4' },
  'quick-start': { name: 'Quick Start', icon: 'rocket', description: 'First sale within 30 days', color: '#EC4899' }
};

// Leads
export const leads = [];

// Closed Sales (with commission snapshots)
// Start with empty sales - agents will log new sales
export const sales = [];

// Activity Log
export const activities = [];

// Monthly Performance Data
export const monthlyPerformance = [];

// Agent Performance Data
export const agentPerformance = [];

// Product Distribution - populated from actual sales
export const productDistribution = [];

// Lead Sources - populated from actual leads
export const leadSources = [];

// Goals - set via admin panel
export const goals = {
  monthly: {
    sales: { target: 0, current: 0 },
    revenue: { target: 0, current: 0 },
    leads: { target: 0, current: 0 },
    calls: { target: 0, current: 0 }
  },
  quarterly: {
    sales: { target: 0, current: 0 },
    revenue: { target: 0, current: 0 }
  }
};

// Testimonials - add real customer testimonials
export const testimonials = [];

// Insurance Products - configure your product offerings
export const products = [];

// Career Benefits - configure career page content
export const careerBenefits = [];

// Helper function to get agent stats
export const getAgentStats = (agentId) => {
  const agentSales = sales.filter(s => s.agentId === agentId);
  const agentLeads = leads.filter(l => l.assignedTo === agentId);

  return {
    totalSales: agentSales.length,
    totalRevenue: agentSales.reduce((sum, s) => sum + s.commission, 0),
    activeLeads: agentLeads.length,
    hotLeads: agentLeads.filter(l => l.status === 'hot').length,
    closeRate: agentLeads.length > 0 ? Math.round((agentSales.length / agentLeads.length) * 100) : 0
  };
};

// Helper function to get all stats
export const getAllStats = () => {
  return {
    totalAgents: agents.length,
    totalLeads: leads.length,
    totalSales: sales.length,
    totalRevenue: sales.reduce((sum, s) => sum + s.commission, 0),
    avgCloseRate: Math.round((sales.length / leads.length) * 100),
    hotLeads: leads.filter(l => l.status === 'hot').length
  };
};

// Insurance Policy Applications (customer applications for life insurance)
export const policyApplications = [];

let policyApplicationsStore = [...policyApplications];

export const getPolicyApplications = () => policyApplicationsStore;

export const updatePolicyApplicationStatus = (id, status) => {
  policyApplicationsStore = policyApplicationsStore.map(app =>
    app.id === id ? { ...app, status } : app
  );
};

export const assignPolicyApplicationAgent = (id, agentId) => {
  policyApplicationsStore = policyApplicationsStore.map(app =>
    app.id === id ? { ...app, assignedAgent: agentId } : app
  );
};

export const getAgentPolicyApplications = (agentId) => {
  return policyApplicationsStore.filter(app => app.assignedAgent === agentId);
};

// Job Applications (start fresh)
export const applications = [];

// Application storage functions (in a real app, this would be API calls)
let applicationsStore = [...applications];

export const getApplications = () => applicationsStore;

export const addApplication = (application) => {
  const newApp = {
    ...application,
    id: `app-${String(applicationsStore.length + 1).padStart(3, '0')}`,
    submittedAt: new Date().toISOString(),
    status: 'new'
  };
  applicationsStore = [...applicationsStore, newApp];
  return newApp;
};

export const updateApplicationStatus = (id, status) => {
  applicationsStore = applicationsStore.map(app =>
    app.id === id ? { ...app, status } : app
  );
};

// Commission Tiers Store
let commissionTiersStore = [...commissionTiers];

export const getCommissionTiers = () => commissionTiersStore.filter(t => !t.archivedAt);

export const getAllCommissionTiers = () => commissionTiersStore;

export const getCommissionTierById = (id) => commissionTiersStore.find(t => t.id === id);

export const addCommissionTier = (tier) => {
  const newTier = {
    ...tier,
    id: `tier-${String(commissionTiersStore.length + 1).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
    archivedAt: null
  };
  commissionTiersStore = [...commissionTiersStore, newTier];
  return newTier;
};

export const updateCommissionTier = (id, updates) => {
  commissionTiersStore = commissionTiersStore.map(t =>
    t.id === id ? { ...t, ...updates } : t
  );
  return commissionTiersStore.find(t => t.id === id);
};

export const archiveCommissionTier = (id) => {
  commissionTiersStore = commissionTiersStore.map(t =>
    t.id === id ? { ...t, archivedAt: new Date().toISOString() } : t
  );
};

// Carriers Store
let carriersStore = [...carriers];

export const getCarriers = () => carriersStore.filter(c => c.isActive && !c.archivedAt);

export const getAllCarriers = () => carriersStore;

export const getCarrierById = (id) => carriersStore.find(c => c.id === id);

export const addCarrier = (carrier) => {
  const newCarrier = {
    ...carrier,
    id: `carrier-${String(carriersStore.length + 1).padStart(3, '0')}`,
    isActive: true,
    createdAt: new Date().toISOString(),
    archivedAt: null
  };
  carriersStore = [...carriersStore, newCarrier];
  return newCarrier;
};

export const updateCarrier = (id, updates) => {
  carriersStore = carriersStore.map(c =>
    c.id === id ? { ...c, ...updates } : c
  );
  return carriersStore.find(c => c.id === id);
};

export const archiveCarrier = (id) => {
  carriersStore = carriersStore.map(c =>
    c.id === id ? { ...c, archivedAt: new Date().toISOString(), isActive: false } : c
  );
};

// Agent Tier History Store
let agentTierHistoryStore = [...agentTierHistory];

export const getAgentTierHistory = (agentId) =>
  agentTierHistoryStore.filter(h => h.agentId === agentId).sort((a, b) =>
    new Date(b.changedAt) - new Date(a.changedAt)
  );

export const addAgentTierHistory = (entry) => {
  const newEntry = {
    ...entry,
    id: `history-${String(agentTierHistoryStore.length + 1).padStart(3, '0')}`,
    changedAt: new Date().toISOString()
  };
  agentTierHistoryStore = [...agentTierHistoryStore, newEntry];
  return newEntry;
};

// Audit Log Store
let auditLogStore = [...commissionAuditLog];

export const getAuditLog = () => auditLogStore.sort((a, b) =>
  new Date(b.changedAt) - new Date(a.changedAt)
);

export const addAuditLogEntry = (entry) => {
  const newEntry = {
    ...entry,
    id: `audit-${String(auditLogStore.length + 1).padStart(3, '0')}`,
    changedAt: new Date().toISOString()
  };
  auditLogStore = [...auditLogStore, newEntry];
  return newEntry;
};

// Agents Store (for tier assignment updates)
let agentsStore = [...agents];

export const getAgents = () => agentsStore.filter(a => a.status === 'active');

export const getAllAgentsWithTiers = () => agentsStore;

export const getAgentById = (id) => agentsStore.find(a => a.id === id);

export const addAgent = (agent) => {
  const initials = agent.name.split(' ').map(n => n[0]).join('').toUpperCase();
  const newAgent = {
    id: `agent-${String(agentsStore.length + 1).padStart(3, '0')}`,
    name: agent.name,
    email: agent.email,
    phone: agent.phone || '',
    territory: agent.territory,
    commissionTierId: agent.commissionTierId,
    avatar: initials,
    status: 'active',
    level: 1,
    badges: [],
    streak: 0,
    hireDate: new Date().toISOString().split('T')[0]
  };
  agentsStore = [...agentsStore, newAgent];
  return newAgent;
};

export const updateAgentTier = (agentId, newTierId, adminId, reason = '') => {
  const agent = agentsStore.find(a => a.id === agentId);
  if (!agent) return null;

  const previousTierId = agent.commissionTierId;

  // Update agent
  agentsStore = agentsStore.map(a =>
    a.id === agentId ? { ...a, commissionTierId: newTierId } : a
  );

  // Add to tier history
  addAgentTierHistory({
    agentId,
    previousTierId,
    newTierId,
    changedByAdminId: adminId,
    reason
  });

  // Add to audit log
  addAuditLogEntry({
    changedByAdminId: adminId,
    entityType: 'agent_tier_assignment',
    entityId: agentId,
    fieldChanged: 'commission_tier_id',
    oldValue: previousTierId,
    newValue: newTierId
  });

  return agentsStore.find(a => a.id === agentId);
};

// Sales Store
let salesStore = [...sales];

export const getSales = () => salesStore;

export const getSalesByAgent = (agentId) => salesStore.filter(s => s.agentId === agentId);

export const addSale = (sale) => {
  const agent = getAgentById(sale.agentId);
  const carrier = getCarrierById(sale.carrierId);
  const tier = getCommissionTierById(agent?.commissionTierId);

  // Calculate commission: annual_premium × carrier_rate × agent_multiplier
  const annualPremium = sale.monthlyPremium * 12;
  const carrierPayout = annualPremium * (carrier?.commissionRate || 1);
  const agentCommission = carrierPayout * (tier?.baseMultiplier || 0.5);

  const newSale = {
    ...sale,
    id: `sale-${String(salesStore.length + 1).padStart(3, '0')}`,
    isPaid: false,
    paidDate: null,
    agentMultiplierSnapshot: tier?.baseMultiplier || 0.5,
    carrierRateSnapshot: carrier?.commissionRate || 1,
    commissionTierIdSnapshot: agent?.commissionTierId || 'tier-001',
    commission: Math.round(agentCommission * 100) / 100,
    createdAt: new Date().toISOString()
  };

  salesStore = [...salesStore, newSale];
  return newSale;
};

export const updateSalePaidStatus = (saleId, isPaid) => {
  salesStore = salesStore.map(s =>
    s.id === saleId ? {
      ...s,
      isPaid,
      paidDate: isPaid ? new Date().toISOString().split('T')[0] : null
    } : s
  );
  return salesStore.find(s => s.id === saleId);
};

// Contests Store
let contestsStore = [...contests];

export const getActiveContests = () => contestsStore.filter(c => c.isActive);

export const getAllContests = () => contestsStore;

export const addContest = (contest) => {
  const newContest = {
    ...contest,
    id: `contest-${String(contestsStore.length + 1).padStart(3, '0')}`,
    isActive: true,
    winnerAgentId: null,
    createdAt: new Date().toISOString()
  };
  contestsStore = [...contestsStore, newContest];
  return newContest;
};

export const updateContest = (id, updates) => {
  contestsStore = contestsStore.map(c =>
    c.id === id ? { ...c, ...updates } : c
  );
  return contestsStore.find(c => c.id === id);
};

// Goals Store
let goalsStore = [...agentGoals];

export const getAgentGoal = (agentId, month, year) =>
  goalsStore.find(g => g.agentId === agentId && g.month === month && g.year === year);

export const setAgentGoal = (agentId, month, year, targetCommissionAmount) => {
  const existing = getAgentGoal(agentId, month, year);
  if (existing) {
    goalsStore = goalsStore.map(g =>
      g.id === existing.id ? { ...g, targetCommissionAmount } : g
    );
    return goalsStore.find(g => g.id === existing.id);
  } else {
    const newGoal = {
      id: `goal-${String(goalsStore.length + 1).padStart(3, '0')}`,
      agentId,
      month,
      year,
      targetCommissionAmount,
      createdAt: new Date().toISOString()
    };
    goalsStore = [...goalsStore, newGoal];
    return newGoal;
  }
};

// Notifications Store
let notificationsStore = [...notifications];

export const getNotifications = (agentId) =>
  notificationsStore.filter(n => n.recipientAgentId === agentId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

export const getUnreadNotificationCount = (agentId) =>
  notificationsStore.filter(n => n.recipientAgentId === agentId && !n.isRead).length;

export const addNotification = (notification) => {
  const newNotification = {
    ...notification,
    id: `notif-${String(notificationsStore.length + 1).padStart(3, '0')}`,
    isRead: false,
    createdAt: new Date().toISOString()
  };
  notificationsStore = [...notificationsStore, newNotification];
  return newNotification;
};

export const markNotificationRead = (notificationId) => {
  notificationsStore = notificationsStore.map(n =>
    n.id === notificationId ? { ...n, isRead: true } : n
  );
};

export const markAllNotificationsRead = (agentId) => {
  notificationsStore = notificationsStore.map(n =>
    n.recipientAgentId === agentId ? { ...n, isRead: true } : n
  );
};

// Helper: Get agent's tier info
export const getAgentTierInfo = (agentId) => {
  const agent = getAgentById(agentId);
  if (!agent) return null;
  const tier = getCommissionTierById(agent.commissionTierId);
  return tier;
};

// Helper: Calculate commission for a potential sale
export const calculateCommission = (monthlyPremium, carrierId, agentId) => {
  const carrier = getCarrierById(carrierId);
  const agent = getAgentById(agentId);
  const tier = getCommissionTierById(agent?.commissionTierId);

  const annualPremium = monthlyPremium * 12;
  const carrierPayout = annualPremium * (carrier?.commissionRate || 1);
  const agentCommission = carrierPayout * (tier?.baseMultiplier || 0.5);
  const adminOverride = carrierPayout - agentCommission;

  return {
    annualPremium,
    carrierPayout: Math.round(carrierPayout * 100) / 100,
    agentCommission: Math.round(agentCommission * 100) / 100,
    adminOverride: Math.round(adminOverride * 100) / 100,
    tierName: tier?.name || 'Unknown',
    tierMultiplier: tier?.baseMultiplier || 0.5,
    carrierRate: carrier?.commissionRate || 1,
    carrierName: carrier?.name || 'Unknown'
  };
};

// Helper: Get agents count per tier
export const getAgentCountByTier = (tierId) =>
  agentsStore.filter(a => a.commissionTierId === tierId && a.status === 'active').length;
