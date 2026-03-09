import { supabase } from '@/lib/supabase'

interface Log {
  id: string
  user_id: string
  mood: number
  note: string | null
  symptoms: string[]
  created_at: string
}

export const historyService = {
  fetchLogs: async (userId: string) => {
    return supabase
      .from('logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  },

  deleteLog: async (id: string, userId: string) => {
    return supabase
      .from('logs')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
  },
}
