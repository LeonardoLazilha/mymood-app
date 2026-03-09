import { supabase } from '@/lib/supabase'

export const profileService = {
  getCurrentUserProfile: async () => {
    return supabase.auth.getUser()
  },

  signOutUser: async () => {
    return supabase.auth.signOut()
  },
}
