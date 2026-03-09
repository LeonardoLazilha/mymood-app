import { useHome } from '../hooks/useHome'
import { SharedButton, SharedCard, SharedScreen, SharedTabBar, SharedText } from '@/shared/ui'
import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { ActivityIndicator, FlatList, View } from 'react-native'

const tabs = [
  { key: 'home', label: 'Home', icon: <Ionicons name="home-outline" size={22} color={colors.textSecondary} /> },
  { key: 'history', label: 'History', icon: <Ionicons name="time-outline" size={22} color={colors.textSecondary} /> },
  { key: 'log', label: 'Log', icon: <Ionicons name="add-circle-outline" size={22} color={colors.textSecondary} /> },
  { key: 'insights', label: 'Insights', icon: <Ionicons name="sparkles-outline" size={22} color={colors.textSecondary} /> },
  { key: 'profile', label: 'Profile', icon: <Ionicons name="person-outline" size={22} color={colors.textSecondary} /> },
]

export default function HomeScreen() {
  const router = useRouter()
  const {
    userEmail,
    logs,
    loading,
    getGreeting,
    formatDate,
    isTodayLogged,
  } = useHome()

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

  const recentLogs = logs.slice(isTodayLogged() ? 1 : 0)

  const renderRecentLog = ({ item }: any) => (
    <SharedCard padding="md" shadow="sm">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <SharedText variant="body" color="textPrimary" weight="600">
            Mood: {item.mood}/10
          </SharedText>
          <SharedText variant="caption" color="textSecondary" style={{ marginTop: spacing.xs }}>
            {formatDate(item.createdAt)}
          </SharedText>
          {item.note && (
            <SharedText variant="caption" color="textPrimary" style={{ marginTop: spacing.sm, maxWidth: 200 }} numberOfLines={1}>
              {item.note}
            </SharedText>
          )}
        </View>
        <SharedText variant="h3" color="primary">
          {item.mood >= 7 ? '😊' : item.mood >= 5 ? '😐' : '😕'}
        </SharedText>
      </View>
    </SharedCard>
  )

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SharedScreen scrollable={false}>
        <FlatList
          data={recentLogs}
          keyExtractor={(item) => item.id}
          renderItem={renderRecentLog}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.lg,
            paddingBottom: spacing.lg,
            gap: spacing.md,
          }}
          ListHeaderComponent={
            <View>
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
              <SharedText variant="h3" color="textPrimary" style={{ marginBottom: spacing.md }}>
                Recent logs
              </SharedText>

              {logs.length === 0 && (
                <SharedCard padding="lg" shadow="sm" style={{ marginBottom: spacing.md }}>
                  <View style={{ alignItems: 'center', paddingVertical: spacing.lg }}>
                    <SharedText variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
                      No logs yet. Start by logging your mood!
                    </SharedText>
                  </View>
                </SharedCard>
              )}
            </View>
          }
        />
      </SharedScreen>

      <SharedTabBar tabs={tabs} activeTab="home" onTabChange={handleTabChange} />
    </View>
  )
}
