// Quick test script - run this to verify Supabase connection
import { supabase, isSupabaseConfigured } from './supabase.js'

export const testConnection = async () => {
  console.log('Supabase configured:', isSupabaseConfigured())

  if (!supabase) {
    console.log('No Supabase client - using mock data mode')
    return false
  }

  try {
    // Test: fetch commission tiers
    const { data: tiers, error: tiersError } = await supabase
      .from('commission_tiers')
      .select('*')

    if (tiersError) {
      console.error('Tiers error:', tiersError)
      return false
    }
    console.log('Commission Tiers:', tiers)

    // Test: fetch carriers
    const { data: carriers, error: carriersError } = await supabase
      .from('carriers')
      .select('*')

    if (carriersError) {
      console.error('Carriers error:', carriersError)
      return false
    }
    console.log('Carriers:', carriers)

    console.log('✅ Supabase connection successful!')
    return true
  } catch (err) {
    console.error('Connection test failed:', err)
    return false
  }
}

// Auto-run if loaded directly
testConnection()
