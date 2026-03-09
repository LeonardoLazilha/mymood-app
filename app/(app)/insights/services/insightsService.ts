import { supabase } from '@/lib/supabase'

interface Log {
  id: string
  mood: number
  note: string | null
  symptoms: string[] | null
  createdAt: string
}

export const insightsService = {
  fetchLogsByDateRange: async (userId: string, fromDate: Date) => {
    return supabase
      .from('logs')
      .select('id, mood, note, symptoms, created_at')
      .eq('user_id', userId)
      .gte('created_at', fromDate.toISOString())
      .order('created_at', { ascending: false })
  },

  fetchRecentInsights: async (userId: string) => {
    return supabase
      .from('insights')
      .select('id, content, generated_at')
      .eq('user_id', userId)
      .order('generated_at', { ascending: false })
      .limit(5)
  },

  generateNewInsight: async (logs: Log[]) => {
    return supabase.functions.invoke('generate-insights', {
      body: { logs },
    })
  },

  saveInsight: async (userId: string, content: string) => {
    return supabase
      .from('insights')
      .insert([
        {
          user_id: userId,
          content,
          generated_at: new Date().toISOString(),
        },
      ])
  },
}
