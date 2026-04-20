import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using mock data mode.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => !!supabase

// ============================================
// COMMISSION TIERS
// ============================================
export const fetchCommissionTiers = async () => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('commission_tiers')
    .select('*')
    .is('archived_at', null)
    .order('base_multiplier', { ascending: true })
  if (error) throw error
  return data
}

export const createCommissionTier = async (tier) => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('commission_tiers')
    .insert(tier)
    .select()
    .single()
  if (error) throw error
  return data
}

export const updateCommissionTier = async (id, updates) => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('commission_tiers')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// ============================================
// CARRIERS
// ============================================
export const fetchCarriers = async () => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('carriers')
    .select('*')
    .eq('is_active', true)
    .is('archived_at', null)
    .order('name')
  if (error) throw error
  return data
}

export const createCarrier = async (carrier) => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('carriers')
    .insert(carrier)
    .select()
    .single()
  if (error) throw error
  return data
}

export const updateCarrier = async (id, updates) => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('carriers')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// ============================================
// USERS / AGENTS
// ============================================
export const fetchAgents = async () => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      commission_tier:commission_tiers(*)
    `)
    .eq('role', 'agent')
    .eq('status', 'active')
    .order('name')
  if (error) throw error
  return data
}

export const fetchCurrentUser = async () => {
  if (!supabase) return null
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      commission_tier:commission_tiers(*)
    `)
    .eq('auth_user_id', user.id)
    .single()
  if (error) throw error
  return data
}

export const updateAgentTier = async (agentId, newTierId, adminId, reason) => {
  if (!supabase) return null

  // Get current tier
  const { data: agent } = await supabase
    .from('users')
    .select('commission_tier_id')
    .eq('id', agentId)
    .single()

  // Update agent tier
  const { error: updateError } = await supabase
    .from('users')
    .update({ commission_tier_id: newTierId })
    .eq('id', agentId)
  if (updateError) throw updateError

  // Add to history
  const { error: historyError } = await supabase
    .from('agent_tier_history')
    .insert({
      agent_id: agentId,
      previous_tier_id: agent?.commission_tier_id,
      new_tier_id: newTierId,
      changed_by_admin_id: adminId,
      reason
    })
  if (historyError) throw historyError

  return true
}

// ============================================
// SALES
// ============================================
export const fetchSales = async (agentId = null) => {
  if (!supabase) return null
  let query = supabase
    .from('sales')
    .select(`
      *,
      agent:users!sales_agent_id_fkey(id, name, avatar),
      carrier:carriers(id, name)
    `)
    .order('sale_date', { ascending: false })

  if (agentId) {
    query = query.eq('agent_id', agentId)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export const createSale = async (sale) => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('sales')
    .insert(sale)
    .select()
    .single()
  if (error) throw error
  return data
}

export const updateSalePaidStatus = async (saleId, isPaid) => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('sales')
    .update({
      is_paid: isPaid,
      paid_date: isPaid ? new Date().toISOString().split('T')[0] : null
    })
    .eq('id', saleId)
    .select()
    .single()
  if (error) throw error
  return data
}

// ============================================
// NOTIFICATIONS
// ============================================
export const fetchNotifications = async (agentId) => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('recipient_agent_id', agentId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const createNotification = async (notification) => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('notifications')
    .insert(notification)
    .select()
    .single()
  if (error) throw error
  return data
}

export const markNotificationRead = async (notificationId) => {
  if (!supabase) return null
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)
  if (error) throw error
}

export const markAllNotificationsRead = async (agentId) => {
  if (!supabase) return null
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('recipient_agent_id', agentId)
  if (error) throw error
}

// ============================================
// GOALS
// ============================================
export const fetchAgentGoal = async (agentId, month, year) => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('agent_goals')
    .select('*')
    .eq('agent_id', agentId)
    .eq('month', month)
    .eq('year', year)
    .single()
  if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows
  return data
}

export const upsertAgentGoal = async (agentId, month, year, targetAmount) => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('agent_goals')
    .upsert({
      agent_id: agentId,
      month,
      year,
      target_commission_amount: targetAmount
    }, {
      onConflict: 'agent_id,month,year'
    })
    .select()
    .single()
  if (error) throw error
  return data
}

// ============================================
// CONTESTS
// ============================================
export const fetchActiveContests = async () => {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('contests')
    .select('*')
    .eq('is_active', true)
    .gte('end_date', new Date().toISOString().split('T')[0])
    .order('end_date')
  if (error) throw error
  return data
}

// ============================================
// AUTH
// ============================================
export const signIn = async (email, password) => {
  if (!supabase) return null
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
  return data
}

export const signOut = async () => {
  if (!supabase) return null
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getSession = async () => {
  if (!supabase) return null
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
