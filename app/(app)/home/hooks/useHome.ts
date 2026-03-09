import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { homeService } from '../services/homeService'

interface Log {
  id: string
  mood: number
  note: string | null
  createdAt: string
}

export function useHome() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserAndLogs()
  }, [])

  const fetchUserAndLogs = async () => {
    try {
      setLoading(true)

      // Fetch current user
      const { data: { user } } = await homeService.getCurrentUser()
      if (!user) {
        setLoading(false)
        return
      }

      setUserEmail(user.email || null)

      // Fetch last 3 logs
      const { data: logsData, error: logsError } = await homeService.fetchRecentLogs(user.id, 3)

      if (logsError) {
        console.error('Error fetching logs:', logsError)
      } else if (logsData) {
        const transformedLogs = logsData.map((log: any) => ({
          id: log.id,
          mood: log.mood,
          note: log.note,
          createdAt: log.created_at,
        }))
        setLogs(transformedLogs)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const isTodayLogged = () => {
    if (logs.length === 0) return false
    const logDate = new Date(logs[0].createdAt)
    const today = new Date()
    return logDate.toDateString() === today.toDateString()
  }

  return {
    userEmail,
    logs,
    loading,
    getGreeting,
    formatDate,
    isTodayLogged,
  }
}
