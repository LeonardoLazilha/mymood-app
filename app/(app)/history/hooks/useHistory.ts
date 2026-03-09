import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { historyService } from '../services/historyService'

interface Log {
  id: string
  user_id: string
  mood: number
  note: string | null
  symptoms: string[]
  created_at: string
}

export function useHistory() {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('User not found')
        setLoading(false)
        return
      }

      const { data, error: fetchError } = await historyService.fetchLogs(user.id)

      if (fetchError) {
        setError(fetchError.message)
        setLoading(false)
        return
      }

      setLogs(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const deleteLog = async (id: string) => {
    try {
      setDeleting(id)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('User not found')
        setDeleting(null)
        return
      }

      const { error: deleteError } = await historyService.deleteLog(id, user.id)

      if (deleteError) {
        console.error('Error deleting log:', deleteError)
        setError('Failed to delete log. Please try again.')
        setDeleting(null)
        return
      }

      setLogs(prev => prev.filter(log => log.id !== id))
      setError(null)
    } catch (err) {
      console.error('Error deleting log:', err)
      setError('Failed to delete log. Please try again.')
      setDeleting(null)
    }
  }

  return { logs, loading, error, deleting, fetchLogs, deleteLog }
}
