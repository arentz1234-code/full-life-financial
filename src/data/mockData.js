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
export const agentTierHistory = [
  {
    id: 'history-001',
    agentId: 'agent-001',
    previousTierId: 'tier-001',
    newTierId: 'tier-003',
    changedByAdminId: 'admin-001',
    changedAt: '2024-02-01T10:00:00',
    reason: 'Promoted after excellent Q4 performance'
  },
  {
    id: 'history-002',
    agentId: 'agent-002',
    previousTierId: 'tier-001',
    newTierId: 'tier-002',
    changedByAdminId: 'admin-001',
    changedAt: '2024-01-15T14:30:00',
    reason: 'Agent now purchasing own leads'
  }
];

// Commission Audit Log
export const commissionAuditLog = [
  {
    id: 'audit-001',
    changedByAdminId: 'admin-001',
    entityType: 'tier',
    entityId: 'tier-003',
    fieldChanged: 'baseMultiplier',
    oldValue: '0.65',
    newValue: '0.70',
    changedAt: '2024-02-15T09:00:00'
  },
  {
    id: 'audit-002',
    changedByAdminId: 'admin-001',
    entityType: 'agent_tier_assignment',
    entityId: 'agent-001',
    fieldChanged: 'commission_tier_id',
    oldValue: 'tier-001',
    newValue: 'tier-003',
    changedAt: '2024-02-01T10:00:00'
  },
  {
    id: 'audit-003',
    changedByAdminId: 'admin-001',
    entityType: 'carrier',
    entityId: 'carrier-005',
    fieldChanged: 'commissionRate',
    oldValue: '1.20',
    newValue: '1.25',
    changedAt: '2024-03-01T11:30:00'
  }
];

// Contests
export const contests = [
  {
    id: 'contest-001',
    name: 'March Madness',
    description: 'Highest total premium wins a weekend getaway!',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    prizeDescription: '$500 travel voucher',
    metric: 'total_premium',
    isActive: true,
    winnerAgentId: null,
    createdAt: '2024-02-25T10:00:00'
  },
  {
    id: 'contest-002',
    name: 'Policy Sprint',
    description: 'Most policies written this week wins!',
    startDate: '2024-03-25',
    endDate: '2024-03-31',
    prizeDescription: '$200 bonus',
    metric: 'policy_count',
    isActive: true,
    winnerAgentId: null,
    createdAt: '2024-03-24T09:00:00'
  }
];

// Agent Goals
export const agentGoals = [
  {
    id: 'goal-001',
    agentId: 'agent-001',
    month: 3,
    year: 2024,
    targetCommissionAmount: 8000,
    createdAt: '2024-03-01T08:00:00'
  },
  {
    id: 'goal-002',
    agentId: 'agent-002',
    month: 3,
    year: 2024,
    targetCommissionAmount: 6000,
    createdAt: '2024-03-01T09:00:00'
  }
];

// Notifications
export const notifications = [
  {
    id: 'notif-001',
    recipientAgentId: 'agent-001',
    type: 'tier_changed',
    message: 'Your commission tier was updated to Senior Agent by Drew Arrington.',
    link: '/agent/profile',
    isRead: true,
    createdAt: '2024-02-01T10:00:00'
  },
  {
    id: 'notif-002',
    recipientAgentId: 'agent-001',
    type: 'lead_assigned',
    message: 'New lead assigned: Robert Williams',
    link: '/agent/leads',
    isRead: false,
    createdAt: '2024-03-25T09:00:00'
  },
  {
    id: 'notif-003',
    recipientAgentId: 'agent-002',
    type: 'contest_started',
    message: 'New contest started: March Madness! Win a $500 travel voucher.',
    link: '/agent',
    isRead: false,
    createdAt: '2024-03-01T08:00:00'
  },
  {
    id: 'notif-004',
    recipientAgentId: 'agent-001',
    type: 'paid_status_changed',
    message: 'Your sale to John Smith has been marked as paid.',
    link: '/agent/sales',
    isRead: false,
    createdAt: '2024-03-26T14:00:00'
  }
];

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

// Sales Agents
export const agents = [
  {
    id: 'agent-001',
    name: 'Sarah Mitchell',
    email: 'sarah@fulllifefinancial.com',
    password: 'agent123',
    role: 'agent',
    avatar: 'SM',
    phone: '(205) 555-0142',
    territory: 'Alabama',
    hireDate: '2023-03-15',
    status: 'active',
    commissionTierId: 'tier-003',
    level: 5,
    xp: 4750,
    xpToNextLevel: 5000,
    badges: ['first-sale', 'closer', '10k-club', 'streak-7'],
    streak: 12,
    rank: 1
  },
  {
    id: 'agent-002',
    name: 'Marcus Johnson',
    email: 'marcus@fulllifefinancial.com',
    password: 'agent123',
    role: 'agent',
    avatar: 'MJ',
    phone: '(404) 555-0198',
    territory: 'Georgia',
    hireDate: '2023-06-01',
    status: 'active',
    commissionTierId: 'tier-002',
    level: 4,
    xp: 3200,
    xpToNextLevel: 4000,
    badges: ['first-sale', 'quick-closer', 'referral-king'],
    streak: 5,
    rank: 2
  },
  {
    id: 'agent-003',
    name: 'Jennifer Cruz',
    email: 'jennifer@fulllifefinancial.com',
    password: 'agent123',
    role: 'agent',
    avatar: 'JC',
    phone: '(305) 555-0167',
    territory: 'Florida',
    hireDate: '2023-09-10',
    status: 'active',
    commissionTierId: 'tier-002',
    level: 3,
    xp: 2100,
    xpToNextLevel: 3000,
    badges: ['first-sale', 'fast-learner'],
    streak: 3,
    rank: 3
  },
  {
    id: 'agent-004',
    name: 'David Thompson',
    email: 'david@fulllifefinancial.com',
    password: 'agent123',
    role: 'agent',
    avatar: 'DT',
    phone: '(770) 555-0234',
    territory: 'Georgia',
    hireDate: '2024-01-08',
    status: 'active',
    commissionTierId: 'tier-001',
    level: 2,
    xp: 1450,
    xpToNextLevel: 2000,
    badges: ['first-sale'],
    streak: 8,
    rank: 4
  },
  {
    id: 'agent-005',
    name: 'Amanda Rivera',
    email: 'amanda@fulllifefinancial.com',
    password: 'agent123',
    role: 'agent',
    avatar: 'AR',
    phone: '(813) 555-0189',
    territory: 'Florida',
    hireDate: '2024-02-20',
    status: 'active',
    commissionTierId: 'tier-001',
    level: 2,
    xp: 980,
    xpToNextLevel: 2000,
    badges: ['first-sale', 'quick-start'],
    streak: 2,
    rank: 5
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
export const leads = [
  {
    id: 'lead-001',
    name: 'Robert Williams',
    email: 'robert.w@email.com',
    phone: '(205) 555-0123',
    age: 42,
    status: 'hot',
    source: 'Website',
    productInterest: 'Term Life',
    estimatedValue: 1200,
    assignedTo: 'agent-001',
    createdAt: '2024-03-20',
    lastContact: '2024-03-25',
    notes: 'Very interested, has two kids. Wants 20-year term.',
    location: { lat: 33.5186, lng: -86.8104, city: 'Birmingham', state: 'AL' }
  },
  {
    id: 'lead-002',
    name: 'Michelle Davis',
    email: 'michelle.d@email.com',
    phone: '(404) 555-0187',
    age: 35,
    status: 'warm',
    source: 'Referral',
    productInterest: 'Whole Life',
    estimatedValue: 2500,
    assignedTo: 'agent-002',
    createdAt: '2024-03-18',
    lastContact: '2024-03-24',
    notes: 'Referred by her brother. Looking for long-term investment.',
    location: { lat: 33.7490, lng: -84.3880, city: 'Atlanta', state: 'GA' }
  },
  {
    id: 'lead-003',
    name: 'James Anderson',
    email: 'james.a@email.com',
    phone: '(305) 555-0156',
    age: 55,
    status: 'hot',
    source: 'Cold Call',
    productInterest: 'Final Expense',
    estimatedValue: 800,
    assignedTo: 'agent-003',
    createdAt: '2024-03-22',
    lastContact: '2024-03-26',
    notes: 'Wants to ensure family is covered. Ready to sign.',
    location: { lat: 25.7617, lng: -80.1918, city: 'Miami', state: 'FL' }
  },
  {
    id: 'lead-004',
    name: 'Patricia Brown',
    email: 'patricia.b@email.com',
    phone: '(770) 555-0134',
    age: 38,
    status: 'cold',
    source: 'Website',
    productInterest: 'Universal Life',
    estimatedValue: 3000,
    assignedTo: 'agent-004',
    createdAt: '2024-03-15',
    lastContact: '2024-03-19',
    notes: 'Initial interest but hard to reach. Follow up needed.',
    location: { lat: 33.9519, lng: -84.5470, city: 'Marietta', state: 'GA' }
  },
  {
    id: 'lead-005',
    name: 'Thomas Garcia',
    email: 'thomas.g@email.com',
    phone: '(813) 555-0145',
    age: 29,
    status: 'warm',
    source: 'Social Media',
    productInterest: 'Term Life',
    estimatedValue: 900,
    assignedTo: 'agent-005',
    createdAt: '2024-03-21',
    lastContact: '2024-03-25',
    notes: 'Young professional, just got married. Budget conscious.',
    location: { lat: 27.9506, lng: -82.4572, city: 'Tampa', state: 'FL' }
  },
  {
    id: 'lead-006',
    name: 'Elizabeth Martin',
    email: 'elizabeth.m@email.com',
    phone: '(256) 555-0178',
    age: 48,
    status: 'hot',
    source: 'Referral',
    productInterest: 'Whole Life',
    estimatedValue: 2200,
    assignedTo: 'agent-001',
    createdAt: '2024-03-23',
    lastContact: '2024-03-26',
    notes: 'Business owner, wants policy for estate planning.',
    location: { lat: 34.7304, lng: -86.5861, city: 'Huntsville', state: 'AL' }
  },
  {
    id: 'lead-007',
    name: 'Christopher Lee',
    email: 'chris.lee@email.com',
    phone: '(404) 555-0192',
    age: 33,
    status: 'warm',
    source: 'Website',
    productInterest: 'Term Life',
    estimatedValue: 1100,
    assignedTo: 'agent-002',
    createdAt: '2024-03-24',
    lastContact: '2024-03-26',
    notes: 'Has existing policy, looking to upgrade coverage.',
    location: { lat: 33.8823, lng: -84.4661, city: 'Sandy Springs', state: 'GA' }
  },
  {
    id: 'lead-008',
    name: 'Nancy Wilson',
    email: 'nancy.w@email.com',
    phone: '(850) 555-0123',
    age: 52,
    status: 'cold',
    source: 'Trade Show',
    productInterest: 'Final Expense',
    estimatedValue: 750,
    assignedTo: 'agent-003',
    createdAt: '2024-03-10',
    lastContact: '2024-03-14',
    notes: 'Met at local expo. Needs follow-up.',
    location: { lat: 30.4383, lng: -84.2807, city: 'Tallahassee', state: 'FL' }
  }
];

// Closed Sales (with commission snapshots)
// Start with empty sales - agents will log new sales
export const sales = [];

// Activity Log
export const activities = [
  { id: 1, agentId: 'agent-001', type: 'call', description: 'Called Robert Williams', timestamp: '2024-03-26T09:30:00' },
  { id: 2, agentId: 'agent-001', type: 'meeting', description: 'Meeting with Elizabeth Martin', timestamp: '2024-03-26T11:00:00' },
  { id: 3, agentId: 'agent-002', type: 'quote', description: 'Sent quote to Michelle Davis', timestamp: '2024-03-26T10:15:00' },
  { id: 4, agentId: 'agent-002', type: 'call', description: 'Follow-up call with Christopher Lee', timestamp: '2024-03-26T14:00:00' },
  { id: 5, agentId: 'agent-003', type: 'close', description: 'Closed deal with James Anderson', timestamp: '2024-03-26T15:30:00' },
  { id: 6, agentId: 'agent-004', type: 'call', description: 'Cold call to new prospect', timestamp: '2024-03-26T09:00:00' },
  { id: 7, agentId: 'agent-005', type: 'email', description: 'Sent follow-up email to Thomas Garcia', timestamp: '2024-03-26T13:00:00' }
];

// Monthly Performance Data
export const monthlyPerformance = [
  { month: 'Oct', sales: 12, revenue: 18500, leads: 45 },
  { month: 'Nov', sales: 15, revenue: 22000, leads: 52 },
  { month: 'Dec', sales: 18, revenue: 28500, leads: 48 },
  { month: 'Jan', sales: 14, revenue: 21000, leads: 55 },
  { month: 'Feb', sales: 20, revenue: 32000, leads: 60 },
  { month: 'Mar', sales: 22, revenue: 35000, leads: 65 }
];

// Agent Performance Data
export const agentPerformance = [
  { name: 'Sarah M.', sales: 8, revenue: 12500, closeRate: 35, calls: 120 },
  { name: 'Marcus J.', sales: 6, revenue: 9800, closeRate: 28, calls: 95 },
  { name: 'Jennifer C.', sales: 4, revenue: 6200, closeRate: 24, calls: 85 },
  { name: 'David T.', sales: 3, revenue: 4500, closeRate: 20, calls: 70 },
  { name: 'Amanda R.', sales: 2, revenue: 2800, closeRate: 18, calls: 55 }
];

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
export const policyApplications = [
  {
    id: 'pol-001',
    firstName: 'Robert',
    lastName: 'Williams',
    email: 'robert.w@email.com',
    phone: '(205) 555-0123',
    age: 42,
    productType: 'Term Life - 20 Year',
    coverageAmount: 500000,
    monthlyBudget: 150,
    healthStatus: 'good',
    smoker: false,
    assignedAgent: 'agent-001',
    submittedAt: '2024-03-25T10:30:00',
    status: 'pending',
    notes: 'Has two kids, wants coverage until they finish college'
  },
  {
    id: 'pol-002',
    firstName: 'Michelle',
    lastName: 'Davis',
    email: 'michelle.d@email.com',
    phone: '(404) 555-0187',
    age: 35,
    productType: 'Whole Life',
    coverageAmount: 250000,
    monthlyBudget: 280,
    healthStatus: 'excellent',
    smoker: false,
    assignedAgent: 'agent-002',
    submittedAt: '2024-03-24T14:15:00',
    status: 'under_review',
    notes: 'Looking for long-term investment + protection'
  },
  {
    id: 'pol-003',
    firstName: 'James',
    lastName: 'Anderson',
    email: 'james.a@email.com',
    phone: '(305) 555-0156',
    age: 55,
    productType: 'Final Expense',
    coverageAmount: 25000,
    monthlyBudget: 75,
    healthStatus: 'fair',
    smoker: false,
    assignedAgent: 'agent-003',
    submittedAt: '2024-03-23T09:00:00',
    status: 'approved',
    notes: 'Wants to cover funeral expenses for family'
  },
  {
    id: 'pol-004',
    firstName: 'Patricia',
    lastName: 'Brown',
    email: 'patricia.b@email.com',
    phone: '(770) 555-0134',
    age: 38,
    productType: 'Universal Life',
    coverageAmount: 400000,
    monthlyBudget: 350,
    healthStatus: 'good',
    smoker: false,
    assignedAgent: 'agent-004',
    submittedAt: '2024-03-22T16:45:00',
    status: 'pending',
    notes: 'Interested in flexible premium options'
  },
  {
    id: 'pol-005',
    firstName: 'Thomas',
    lastName: 'Garcia',
    email: 'thomas.g@email.com',
    phone: '(813) 555-0145',
    age: 29,
    productType: 'Term Life - 30 Year',
    coverageAmount: 750000,
    monthlyBudget: 100,
    healthStatus: 'excellent',
    smoker: false,
    assignedAgent: 'agent-005',
    submittedAt: '2024-03-21T11:30:00',
    status: 'documents_needed',
    notes: 'Just got married, budget conscious'
  },
  {
    id: 'pol-006',
    firstName: 'Elizabeth',
    lastName: 'Martin',
    email: 'elizabeth.m@email.com',
    phone: '(256) 555-0178',
    age: 48,
    productType: 'Whole Life',
    coverageAmount: 500000,
    monthlyBudget: 400,
    healthStatus: 'good',
    smoker: false,
    assignedAgent: 'agent-001',
    submittedAt: '2024-03-20T13:00:00',
    status: 'approved',
    notes: 'Business owner, estate planning purposes'
  }
];

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

// Job Applications (mock data for demo)
export const applications = [
  {
    id: 'app-001',
    firstName: 'Michael',
    lastName: 'Roberts',
    email: 'michael.roberts@email.com',
    phone: '(205) 555-0198',
    experience: '3-5',
    licensed: 'yes',
    message: 'I have 4 years of experience in automotive sales and recently obtained my life insurance license. I am eager to transition to a career where I can help families plan for their future.',
    submittedAt: '2024-03-25T14:30:00',
    status: 'new',
    resumeName: 'michael_roberts_resume.pdf',
    resumeData: null
  },
  {
    id: 'app-002',
    firstName: 'Jennifer',
    lastName: 'Adams',
    email: 'jennifer.adams@email.com',
    phone: '(404) 555-0167',
    experience: 'none',
    licensed: 'no',
    message: 'I am a recent college graduate with a degree in Business Administration. I am highly motivated and looking for a career with growth potential. I am willing to obtain my license.',
    submittedAt: '2024-03-24T09:15:00',
    status: 'reviewed',
    resumeName: 'jennifer_adams_cv.pdf',
    resumeData: null
  },
  {
    id: 'app-003',
    firstName: 'David',
    lastName: 'Chen',
    email: 'david.chen@email.com',
    phone: '(305) 555-0145',
    experience: '1-2',
    licensed: 'in-progress',
    message: 'Currently working on my insurance license. I have experience in retail management and am excited about the opportunity to build a career in financial services.',
    submittedAt: '2024-03-23T16:45:00',
    status: 'contacted',
    resumeName: null,
    resumeData: null
  },
  {
    id: 'app-004',
    firstName: 'Sarah',
    lastName: 'Martinez',
    email: 'sarah.martinez@email.com',
    phone: '(770) 555-0189',
    experience: '5+',
    licensed: 'yes',
    message: 'Senior sales professional with 8 years in financial services. Looking for a company with strong values and growth opportunities. I have a proven track record of exceeding targets.',
    submittedAt: '2024-03-22T11:20:00',
    status: 'interview',
    resumeName: 'sarah_martinez_resume.pdf',
    resumeData: null
  }
];

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
