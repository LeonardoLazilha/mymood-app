import { supabase } from '@/lib/supabase'

export const homeService = {
  getCurrentUser: async () => {
    return supabase.auth.getUser()
  },

  fetchRecentLogs: async (userId: string, limit: number = 3) => {
    return supabase
      .from('logs')
      .select('id, mood, note, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
  },
}
