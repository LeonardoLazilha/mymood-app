import { Session } from '@supabase/supabase-js'
import { Slot, useRouter, useSegments } from 'expo-router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (loading) return

    const inAuthGroup = (segments[0] as string) === '(auth)'

    if (!session && !inAuthGroup) {
      router.replace('/(auth)/login' as never)
    } else if (session && inAuthGroup) {
      router.replace('/(app)' as never)
    }
  }, [session, loading, segments])

  return <Slot />
}