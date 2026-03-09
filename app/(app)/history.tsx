import { supabase } from '@/lib/supabase'
import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
import { SharedBadge, SharedButton, SharedCard, SharedScreen, SharedText } from '@/shared/ui'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'

interface Log {
  id: string
  user_id: string
  mood: number
  note: string | null
  symptoms: string[]
  created_at: string
}

const getMoodEmoji = (mood: number) => {
  if (mood >= 7) return '😊'
  if (mood >= 5) return '😐'
  return '😕'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

function LogCard({ log, onDelete, deleting }: { log: Log; onDelete: (id: string) => Promise<void>; deleting: string | null }) {
  const isDeleting = deleting === log.id

  return (
    <SharedCard padding="md" style={{ marginBottom: spacing.md }}>
      <View style={{ gap: spacing.md }}>
        <View>
          <SharedText variant="caption" color="textSecondary" style={{ marginBottom: spacing.xs }}>
            {formatDate(log.created_at)}
          </SharedText>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm }}>
            <SharedText variant="h3">{log.mood}</SharedText>
            <SharedText variant="h3">{getMoodEmoji(log.mood)}</SharedText>
          </View>

          {log.note && (
            <SharedText variant="body" color="textSecondary" numberOfLines={2} style={{ marginBottom: spacing.sm }}>
              {log.note.length > 60 ? `${log.note.substring(0, 60)}...` : log.note}
            </SharedText>
          )}

          {log.symptoms && log.symptoms.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
              {log.symptoms.map(symptom => (
                <SharedBadge key={symptom} label={symptom} variant="neutral" size="sm" />
              ))}
            </View>
          )}
        </View>

        <SharedButton
          label={isDeleting ? 'Deleting...' : 'Delete'}
          variant="ghost"
          size="sm"
          onPress={() => onDelete(log.id)}
          disabled={isDeleting}
          style={{ alignSelf: 'flex-start' }}
        />
      </View>
    </SharedCard>
  )
}

export default function HistoryScreen() {
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

      const { data, error: fetchError } = await supabase
        .from('logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

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

  const handleDelete = async (id: string) => {
    try {
      setDeleting(id)
      const { error: deleteError } = await supabase
        .from('logs')
        .delete()
        .eq('id', id)

      if (deleteError) {
        console.error('Error deleting log:', deleteError)
        setError(`Failed to delete: ${deleteError.message}`)
        setDeleting(null)
        return
      }

      setLogs(prev => prev.filter(log => log.id !== id))
      setError(null)
    } catch (err) {
      console.error('Error deleting log:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete log')
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <SharedScreen>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SharedScreen>
    )
  }

  if (error) {
    return (
      <SharedScreen>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <SharedText variant="body" style={{ color: colors.error }}>{error}</SharedText>
        </View>
      </SharedScreen>
    )
  }

  if (logs.length === 0) {
    return (
      <SharedScreen>
        <SharedButton
          label="← Back"
          variant="ghost"
          size="sm"
          onPress={() => router.push('/(app)' as never)}
          style={{ alignSelf: 'flex-start', marginBottom: spacing.md }}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <SharedText variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
            No logs yet. Start tracking your mood!
          </SharedText>
        </View>
      </SharedScreen>
    )
  }

  return (
    <SharedScreen>
      <SharedButton
        label="← Back"
        variant="ghost"
        size="sm"
        onPress={() => router.push('/(app)' as never)}
        style={{ alignSelf: 'flex-start', marginBottom: spacing.md }}
      />
      <SharedText variant="h2" style={{ marginBottom: spacing.lg }}>
        Your History
      </SharedText>
      {error && (
        <SharedCard padding="md" shadow="sm" style={{ marginBottom: spacing.md, backgroundColor: colors.errorLight }}>
          <SharedText variant="body" color="error">
            {error}
          </SharedText>
        </SharedCard>
      )}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ paddingBottom: spacing.lg }}>
          {logs.map(log => (
            <LogCard key={log.id} log={log} onDelete={handleDelete} deleting={deleting} />
          ))}
        </View>
      </ScrollView>
    </SharedScreen>
  )
}
