import { supabase } from '@/lib/supabase'
import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
import { SharedButton, SharedCard, SharedScreen, SharedTabBar, SharedText } from '@/shared/ui'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'

interface Log {
  id: string
  mood: number
  note: string | null
  createdAt: string
}

const tabs = [
  { key: 'home', label: 'Home', icon: <Ionicons name="home-outline" size={22} color={colors.textSecondary} /> },
  { key: 'history', label: 'History', icon: <Ionicons name="time-outline" size={22} color={colors.textSecondary} /> },
  { key: 'log', label: 'Log', icon: <Ionicons name="add-circle-outline" size={22} color={colors.textSecondary} /> },
  { key: 'insights', label: 'Insights', icon: <Ionicons name="sparkles-outline" size={22} color={colors.textSecondary} /> },
  { key: 'profile', label: 'Profile', icon: <Ionicons name="person-outline" size={22} color={colors.textSecondary} /> },
]

export default function HomeScreen() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchUserAndLogs()
  }, [])

  const fetchUserAndLogs = async () => {
    try {
      setLoading(true)

      // Fetch current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      setUserEmail(user.email || null)

      // Fetch last 3 logs
      const { data: logsData, error: logsError } = await supabase
        .from('logs')
        .select('id, mood, note, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3)

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

  const handleTabChange = (key: string) => {
    if (key === 'home') return
    router.push(`/(app)/${key}` as never)
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

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SharedScreen scrollable={false}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={{ marginBottom: spacing.xl }}>
            <SharedText variant="h2" color="textPrimary">
              {getGreeting()} 👋
            </SharedText>
            {userEmail && (
              <SharedText variant="body" color="textSecondary" style={{ marginTop: spacing.sm }}>
                {userEmail}
              </SharedText>
            )}
          </View>

          {/* Today's Mood Card */}
          {isTodayLogged() ? (
            <SharedCard padding="lg" shadow="md" style={{ marginBottom: spacing.lg }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <SharedText variant="body" color="textSecondary">
                    Today's mood
                  </SharedText>
                  <SharedText variant="h2" color="textPrimary" style={{ marginTop: spacing.sm }}>
                    {logs[0].mood}/10
                  </SharedText>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <SharedText variant="h1" color="primary">
                    {logs[0].mood >= 7 ? '😊' : logs[0].mood >= 5 ? '😐' : '😕'}
                  </SharedText>
                </View>
              </View>
              {logs[0].note && (
                <SharedText variant="body" color="textPrimary" style={{ marginTop: spacing.md }}>
                  "{logs[0].note}"
                </SharedText>
              )}
            </SharedCard>
          ) : (
            <SharedCard padding="lg" shadow="md" style={{ marginBottom: spacing.lg }}>
              <SharedText variant="body" color="textSecondary" style={{ marginBottom: spacing.md }}>
                You haven't logged your mood today yet
              </SharedText>
              <SharedButton
                label="Log your mood today"
                variant="primary"
                size="md"
                onPress={() => router.push('/(app)/log' as never)}
              />
            </SharedCard>
          )}

          {/* Recent Logs Section */}
          <View style={{ marginBottom: spacing.lg }}>
            <SharedText variant="h3" color="textPrimary" style={{ marginBottom: spacing.md }}>
              Recent logs
            </SharedText>

            {logs.length === 0 ? (
              <SharedCard padding="lg" shadow="sm">
                <View style={{ alignItems: 'center', paddingVertical: spacing.lg }}>
                  <SharedText variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
                    No logs yet. Start by logging your mood!
                  </SharedText>
                </View>
              </SharedCard>
            ) : (
              <View style={{ gap: spacing.md }}>
                {logs.slice(isTodayLogged() ? 1 : 0).map((log) => (
                  <SharedCard key={log.id} padding="md" shadow="sm">
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View>
                        <SharedText variant="body" color="textPrimary" weight="600">
                          Mood: {log.mood}/10
                        </SharedText>
                        <SharedText variant="caption" color="textSecondary" style={{ marginTop: spacing.xs }}>
                          {formatDate(log.createdAt)}
                        </SharedText>
                        {log.note && (
                          <SharedText variant="caption" color="textPrimary" style={{ marginTop: spacing.sm, maxWidth: 200 }} numberOfLines={1}>
                            {log.note}
                          </SharedText>
                        )}
                      </View>
                      <SharedText variant="h3" color="primary">
                        {log.mood >= 7 ? '😊' : log.mood >= 5 ? '😐' : '😕'}
                      </SharedText>
                    </View>
                  </SharedCard>
                ))}
              </View>
            )}
          </View>

          <View style={{ height: spacing.lg }} />
        </ScrollView>
      </SharedScreen>

      <SharedTabBar tabs={tabs} activeTab="home" onTabChange={handleTabChange} />
    </View>
  )
}