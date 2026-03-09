import { supabase } from '@/lib/supabase'

interface CreateLogPayload {
  user_id: string
  mood: number
  note: string | null
  symptoms: string[]
}

export const logService = {
  createLog: async (payload: CreateLogPayload) => {
    return supabase
      .from('logs')
      .insert(payload)
  },
}
