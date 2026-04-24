// Mock Data for Full Life Financial

// Commission Tiers
export const commissionTiers = [
  {
    id: 'tier-001',
    name: 'New Hire',
    baseMultiplier: 0.50,
    notes: 'Starting tier for new agents in training period',
    createdAt: '2024-01-01T00:00:00',
    createdByAdminId: 'admin-001',
    archivedAt: null
  },
  {
    id: 'tier-002',
    name: 'Buys Own Leads',
    baseMultiplier: 0.60,
    notes: 'Agents who purchase their own leads receive higher commission',
    createdAt: '2024-01-01T00:00:00',
    createdByAdminId: 'admin-001',
    archivedAt: null
  },
  {
    id: 'tier-003',
    name: 'Senior Agent',
    baseMultiplier: 0.70,
    notes: 'Agents with 2+ years experience and consistent performance',
    createdAt: '2024-01-01T00:00:00',
    createdByAdminId: 'admin-001',
    archivedAt: null
  },
  {
    id: 'tier-004',
    name: 'Top Producer',
    baseMultiplier: 0.80,
    notes: 'Elite agents with proven track record of high production',
    createdAt: '2024-01-01T00:00:00',
    createdByAdminId: 'admin-001',
    archivedAt: null
  }
];

// Carriers with commission rates
export const carriers = [
  {
    id: 'carrier-001',
    name: 'Mutual of Omaha',
    commissionRate: 1.10,
    notes: 'Primary final expense carrier',
    isActive: true,
    createdAt: '2024-01-01T00:00:00',
    archivedAt: null
  },
  {
    id: 'carrier-002',
    name: 'AIG',
    commissionRate: 1.15,
    notes: 'Term and whole life products',
    isActive: true,
    createdAt: '2024-01-01T00:00:00',
    archivedAt: null
  },
  {
    id: 'carrier-003',
    name: 'Transamerica',
    commissionRate: 1.20,
    notes: 'Universal life specialty',
    isActive: true,
    createdAt: '2024-01-01T00:00:00',
    archivedAt: null
  },
  {
    id: 'carrier-004',
    name: 'Foresters Financial',
    commissionRate: 1.05,
    notes: 'Final expense and small whole life',
    isActive: true,
    createdAt: '2024-01-01T00:00:00',
    archivedAt: null
  },
  {
    id: 'carrier-005',
    name: 'Liberty Bankers',
    commissionRate: 1.25,
    notes: 'High commission final expense',
    isActive: true,
    createdAt: '2024-01-01T00:00:00',
    archivedAt: null
  }
];

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

// Admin user
export const adminUser = {
  id: 'admin-001',
  name: 'Drew Arrington',
  email: 'drew@fulllifefinancial.com',
  password: 'admin123',
  role: 'admin',
  avatar: 'DA',
  title: 'Sales Manager'
};

// Sales Agents - start fresh, add agents via admin panel
export const agents = [];

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

// Product Distribution
export const productDistribution = [
  { name: 'Term Life', value: 45, color: '#1B5E20' },
  { name: 'Whole Life', value: 28, color: '#4CAF50' },
  { name: 'Universal Life', value: 15, color: '#81C784' },
  { name: 'Final Expense', value: 12, color: '#D4A853' }
];

// Lead Sources
export const leadSources = [
  { name: 'Website', value: 35, color: '#1B5E20' },
  { name: 'Referrals', value: 30, color: '#D4A853' },
  { name: 'Cold Calls', value: 20, color: '#4CAF50' },
  { name: 'Social Media', value: 10, color: '#81C784' },
  { name: 'Trade Shows', value: 5, color: '#A5D6A7' }
];

// Goals
export const goals = {
  monthly: {
    sales: { target: 25, current: 22 },
    revenue: { target: 40000, current: 35000 },
    leads: { target: 80, current: 65 },
    calls: { target: 500, current: 425 }
  },
  quarterly: {
    sales: { target: 75, current: 55 },
    revenue: { target: 120000, current: 85500 }
  }
};

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: 'Michael Thompson',
    location: 'Atlanta, GA',
    text: "Full Life Financial made getting life insurance so easy. My agent Marcus was incredibly helpful and found me a policy that fits my budget perfectly. Now I have peace of mind knowing my family is protected.",
    rating: 5,
    product: 'Term Life Insurance'
  },
  {
    id: 2,
    name: 'Sandra Williams',
    location: 'Birmingham, AL',
    text: "I was hesitant about life insurance, but Sarah at Full Life took the time to explain everything. She helped me understand the importance of whole life insurance and how it can be part of my financial plan.",
    rating: 5,
    product: 'Whole Life Insurance'
  },
  {
    id: 3,
    name: 'Robert Chen',
    location: 'Miami, FL',
    text: "After my health scare, I knew I needed to protect my family. Jennifer was compassionate and efficient. She found me coverage even with my medical history. I can't thank Full Life enough.",
    rating: 5,
    product: 'Term Life Insurance'
  },
  {
    id: 4,
    name: 'Patricia Davis',
    location: 'Tampa, FL',
    text: "Planning for end-of-life expenses was difficult, but Full Life Financial made it dignified and simple. My final expense policy gives me and my children peace of mind.",
    rating: 5,
    product: 'Final Expense Insurance'
  }
];

// Insurance Products
export const products = [
  {
    id: 'term-life',
    name: 'Term Life Insurance',
    description: 'Affordable coverage for a specific period (10, 20, or 30 years). Perfect for young families or those with temporary needs.',
    features: [
      'Lowest premiums for highest coverage',
      'Fixed rates for the entire term',
      'Coverage amounts from $100K to $2M+',
      'Convertible to permanent insurance'
    ],
    idealFor: 'Young families, mortgage protection, income replacement',
    startingAt: '$15/month'
  },
  {
    id: 'whole-life',
    name: 'Whole Life Insurance',
    description: 'Permanent coverage that builds cash value over time. Provides lifelong protection with guaranteed benefits.',
    features: [
      'Lifetime coverage guaranteed',
      'Builds tax-deferred cash value',
      'Fixed premiums never increase',
      'Dividend potential with participating policies'
    ],
    idealFor: 'Estate planning, legacy building, long-term financial goals',
    startingAt: '$75/month'
  },
  {
    id: 'universal-life',
    name: 'Universal Life Insurance',
    description: 'Flexible permanent insurance with adjustable premiums and death benefits. Offers investment growth potential.',
    features: [
      'Flexible premium payments',
      'Adjustable death benefit',
      'Cash value accumulation',
      'Interest rate options'
    ],
    idealFor: 'Changing financial situations, wealth accumulation, flexibility needs',
    startingAt: '$100/month'
  },
  {
    id: 'final-expense',
    name: 'Final Expense Insurance',
    description: 'Smaller whole life policies designed to cover funeral costs and final expenses. Simplified underwriting available.',
    features: [
      'No medical exam required',
      'Quick approval process',
      'Coverage from $5K to $50K',
      'Premiums never increase'
    ],
    idealFor: 'Seniors, those with health issues, funeral cost coverage',
    startingAt: '$25/month'
  }
];

// Career Benefits
export const careerBenefits = [
  {
    icon: 'DollarSign',
    title: 'Unlimited Earning Potential',
    description: 'Competitive commission structure with no cap on earnings. Top performers earn $100K+ annually.'
  },
  {
    icon: 'Clock',
    title: 'Flexible Schedule',
    description: 'Set your own hours and work-life balance. Build your business on your terms.'
  },
  {
    icon: 'GraduationCap',
    title: 'Comprehensive Training',
    description: 'Full licensing support, sales training, and ongoing professional development.'
  },
  {
    icon: 'Users',
    title: 'Supportive Team Culture',
    description: 'Join a team that celebrates success and supports your growth every step of the way.'
  },
  {
    icon: 'TrendingUp',
    title: 'Career Advancement',
    description: 'Clear path to management and leadership roles. Grow your own team.'
  },
  {
    icon: 'Heart',
    title: 'Meaningful Work',
    description: 'Help families protect their futures. Make a real difference in people\'s lives.'
  }
];

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
