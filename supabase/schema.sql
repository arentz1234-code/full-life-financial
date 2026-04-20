-- Full Life Financial Database Schema
-- Run this in Supabase SQL Editor after creating your project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- COMMISSION TIERS
-- ============================================
CREATE TABLE commission_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  base_multiplier DECIMAL(4,2) NOT NULL CHECK (base_multiplier >= 0 AND base_multiplier <= 1),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by_admin_id UUID,
  archived_at TIMESTAMPTZ
);

-- Insert default tiers
INSERT INTO commission_tiers (name, base_multiplier, notes) VALUES
  ('New Hire', 0.50, 'Starting tier for new agents in training period'),
  ('Buys Own Leads', 0.60, 'Agents who purchase their own leads receive higher commission'),
  ('Senior Agent', 0.70, 'Agents with 2+ years experience and consistent performance'),
  ('Top Producer', 0.80, 'Elite agents with proven track record of high production');

-- ============================================
-- CARRIERS
-- ============================================
CREATE TABLE carriers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  commission_rate DECIMAL(4,2) NOT NULL CHECK (commission_rate >= 0),
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  archived_at TIMESTAMPTZ
);

-- Insert default carriers
INSERT INTO carriers (name, commission_rate, notes) VALUES
  ('Mutual of Omaha', 1.10, 'Primary final expense carrier'),
  ('AIG', 1.15, 'Term and whole life products'),
  ('Transamerica', 1.20, 'Universal life specialty'),
  ('Foresters Financial', 1.05, 'Final expense and small whole life'),
  ('Liberty Bankers', 1.25, 'High commission final expense');

-- ============================================
-- USERS (Admins and Agents)
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID UNIQUE, -- Links to Supabase Auth
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'agent')),
  avatar VARCHAR(10),
  territory VARCHAR(100),
  hire_date DATE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  commission_tier_id UUID REFERENCES commission_tiers(id),
  -- Gamification fields
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  xp_to_next_level INTEGER DEFAULT 1000,
  streak INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AGENT TIER HISTORY
-- ============================================
CREATE TABLE agent_tier_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES users(id),
  previous_tier_id UUID REFERENCES commission_tiers(id),
  new_tier_id UUID NOT NULL REFERENCES commission_tiers(id),
  changed_by_admin_id UUID REFERENCES users(id),
  reason TEXT,
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SALES
-- ============================================
CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES users(id),
  carrier_id UUID NOT NULL REFERENCES carriers(id),
  client_name VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50),
  client_email VARCHAR(255),
  monthly_premium DECIMAL(10,2) NOT NULL,
  coverage_amount DECIMAL(12,2),
  notes TEXT,
  sale_date DATE NOT NULL,
  -- Commission snapshot (frozen at time of sale)
  agent_multiplier_snapshot DECIMAL(4,2) NOT NULL,
  carrier_rate_snapshot DECIMAL(4,2) NOT NULL,
  commission_tier_id_snapshot UUID,
  commission DECIMAL(10,2) NOT NULL,
  -- Payment tracking
  is_paid BOOLEAN DEFAULT false,
  paid_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_agent_id UUID NOT NULL REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR(255),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AGENT GOALS
-- ============================================
CREATE TABLE agent_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES users(id),
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL,
  target_commission_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agent_id, month, year)
);

-- ============================================
-- CONTESTS
-- ============================================
CREATE TABLE contests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  prize_description TEXT,
  metric VARCHAR(50) NOT NULL, -- 'total_premium', 'policy_count', etc.
  is_active BOOLEAN DEFAULT true,
  winner_agent_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AUDIT LOG
-- ============================================
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  changed_by_admin_id UUID REFERENCES users(id),
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  field_changed VARCHAR(100) NOT NULL,
  old_value TEXT,
  new_value TEXT,
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LEADS (optional, for future)
-- ============================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  age INTEGER,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'hot', 'warm', 'cold', 'converted', 'lost')),
  source VARCHAR(100),
  product_interest VARCHAR(100),
  estimated_value DECIMAL(10,2),
  assigned_to UUID REFERENCES users(id),
  notes TEXT,
  location_city VARCHAR(100),
  location_state VARCHAR(50),
  location_lat DECIMAL(10,7),
  location_lng DECIMAL(10,7),
  last_contact TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE commission_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE carriers ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tier_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE contests ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public read for tiers and carriers (all authenticated users)
CREATE POLICY "Anyone can read tiers" ON commission_tiers FOR SELECT USING (true);
CREATE POLICY "Anyone can read carriers" ON carriers FOR SELECT USING (true);
CREATE POLICY "Anyone can read contests" ON contests FOR SELECT USING (true);

-- Admins can do everything
CREATE POLICY "Admins full access to tiers" ON commission_tiers FOR ALL
  USING (EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins full access to carriers" ON carriers FOR ALL
  USING (EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins full access to users" ON users FOR ALL
  USING (EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins full access to sales" ON sales FOR ALL
  USING (EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'admin'));

-- Agents can read their own data
CREATE POLICY "Agents read own profile" ON users FOR SELECT
  USING (auth_user_id = auth.uid());

CREATE POLICY "Agents read own sales" ON sales FOR SELECT
  USING (agent_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Agents insert own sales" ON sales FOR INSERT
  WITH CHECK (agent_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Agents read own notifications" ON notifications FOR SELECT
  USING (recipient_agent_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Agents update own notifications" ON notifications FOR UPDATE
  USING (recipient_agent_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Agents manage own goals" ON agent_goals FOR ALL
  USING (agent_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_sales_agent_id ON sales(agent_id);
CREATE INDEX idx_sales_sale_date ON sales(sale_date);
CREATE INDEX idx_sales_is_paid ON sales(is_paid);
CREATE INDEX idx_notifications_recipient ON notifications(recipient_agent_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_auth_user_id ON users(auth_user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
