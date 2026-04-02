// Mock Data for Full Life Financial

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

// Closed Sales
export const sales = [
  {
    id: 'sale-001',
    clientName: 'John Smith',
    agentId: 'agent-001',
    productType: 'Term Life - 20 Year',
    premium: 150,
    coverageAmount: 500000,
    commission: 1800,
    closeDate: '2024-03-25',
    status: 'active',
    location: { lat: 33.5186, lng: -86.8104, city: 'Birmingham', state: 'AL' }
  },
  {
    id: 'sale-002',
    clientName: 'Maria Rodriguez',
    agentId: 'agent-001',
    productType: 'Whole Life',
    premium: 280,
    coverageAmount: 250000,
    commission: 3360,
    closeDate: '2024-03-22',
    status: 'active',
    location: { lat: 34.7304, lng: -86.5861, city: 'Huntsville', state: 'AL' }
  },
  {
    id: 'sale-003',
    clientName: 'Kevin Moore',
    agentId: 'agent-002',
    productType: 'Term Life - 30 Year',
    premium: 200,
    coverageAmount: 750000,
    commission: 2400,
    closeDate: '2024-03-24',
    status: 'active',
    location: { lat: 33.7490, lng: -84.3880, city: 'Atlanta', state: 'GA' }
  },
  {
    id: 'sale-004',
    clientName: 'Susan Taylor',
    agentId: 'agent-002',
    productType: 'Universal Life',
    premium: 350,
    coverageAmount: 400000,
    commission: 4200,
    closeDate: '2024-03-20',
    status: 'active',
    location: { lat: 32.0809, lng: -81.0912, city: 'Savannah', state: 'GA' }
  },
  {
    id: 'sale-005',
    clientName: 'Barbara Jackson',
    agentId: 'agent-003',
    productType: 'Final Expense',
    premium: 75,
    coverageAmount: 25000,
    commission: 900,
    closeDate: '2024-03-23',
    status: 'active',
    location: { lat: 25.7617, lng: -80.1918, city: 'Miami', state: 'FL' }
  },
  {
    id: 'sale-006',
    clientName: 'Richard White',
    agentId: 'agent-003',
    productType: 'Term Life - 10 Year',
    premium: 95,
    coverageAmount: 300000,
    commission: 1140,
    closeDate: '2024-03-21',
    status: 'active',
    location: { lat: 26.1224, lng: -80.1373, city: 'Fort Lauderdale', state: 'FL' }
  },
  {
    id: 'sale-007',
    clientName: 'Linda Martinez',
    agentId: 'agent-004',
    productType: 'Whole Life',
    premium: 225,
    coverageAmount: 200000,
    commission: 2700,
    closeDate: '2024-03-19',
    status: 'active',
    location: { lat: 33.9519, lng: -84.5470, city: 'Marietta', state: 'GA' }
  },
  {
    id: 'sale-008',
    clientName: 'William Harris',
    agentId: 'agent-005',
    productType: 'Term Life - 20 Year',
    premium: 125,
    coverageAmount: 400000,
    commission: 1500,
    closeDate: '2024-03-18',
    status: 'active',
    location: { lat: 28.5383, lng: -81.3792, city: 'Orlando', state: 'FL' }
  }
];

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
