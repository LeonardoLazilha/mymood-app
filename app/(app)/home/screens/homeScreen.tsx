import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
import { SharedButton, SharedCard, SharedScreen, SharedTabBar, SharedText } from '@/shared/ui'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { useHome } from '../hooks/useHome'

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
        <View style={{ flex: 1 }}>
          <SharedText variant="body" weight="600">
            Mood: {item.mood}/10
          </SharedText>

          <SharedText
            variant="caption"
            color="textSecondary"
            style={{ marginTop: spacing.xs }}
          >
            {formatDate(item.createdAt)}
          </SharedText>

          {item.note && (
            <SharedText
              variant="caption"
              style={{ marginTop: spacing.sm }}
              numberOfLines={1}
            >
              {item.note}
            </SharedText>
          )}
        </View>

        <SharedText variant="h2" color="primary">
          {item.mood >= 7 ? '😊' : item.mood >= 5 ? '😐' : '😕'}
        </SharedText>
      </View>
    </SharedCard>
  )

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SharedScreen scrollable={false}>

        <View style={{ flex: 1, position: 'relative' }}>

          {/* Decorative circles */}
          <View
            style={{
              position: 'absolute',
              top: -spacing.xl,
              right: -spacing.xl,
              width: spacing.xl * 12,
              height: spacing.xl * 12,
              borderRadius: spacing.xl * 6,
              backgroundColor: colors.primary,
              opacity: 0.08,
            }}
          />

          <View
            style={{
              position: 'absolute',
              top: spacing.xl * 3,
              left: -spacing.xl * 3,
              width: spacing.xl * 7,
              height: spacing.xl * 7,
              borderRadius: spacing.xl * 3.5,
              backgroundColor: colors.primary,
              opacity: 0.08,
            }}
          />

          <FlatList
            data={recentLogs}
            keyExtractor={(item) => item.id}
            renderItem={renderRecentLog}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: spacing.lg,
              paddingBottom: spacing.xl,
              gap: spacing.md,
            }}

            ListHeaderComponent={
              <View style={{ zIndex: 1 }}>

                {/* Header */}
                <View
                  style={{
                    paddingTop: spacing.xl,
                    paddingBottom: spacing.xl,
                    marginBottom: spacing.lg,
                  }}
                >
                  <SharedText variant="h2">
                    {getGreeting()} 👋
                  </SharedText>

                  {userEmail && (
                    <SharedText
                      variant="body"
                      color="textSecondary"
                      style={{ marginTop: spacing.sm }}
                    >
                      {userEmail}
                    </SharedText>
                  )}
                </View>

                {/* Today card */}
                {isTodayLogged() ? (
                  <SharedCard
                    padding="lg"
                    shadow="md"
                    style={{
                      marginBottom: spacing.xl,
                      backgroundColor: colors.primaryLight,
                    }}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                      <View>
                        <SharedText variant="body" color="textSecondary">
                          Today's mood
                        </SharedText>

                        <SharedText
                          variant="h1"
                          style={{ marginTop: spacing.sm }}
                        >
                          {logs[0].mood}/10
                        </SharedText>
                      </View>

                      <SharedText variant="h1" color="primary">
                        {logs[0].mood >= 7 ? '😊' : logs[0].mood >= 5 ? '😐' : '😕'}
                      </SharedText>

                    </View>

                    {logs[0].note && (
                      <SharedText
                        variant="body"
                        style={{ marginTop: spacing.md }}
                      >
                        "{logs[0].note}"
                      </SharedText>
                    )}
                  </SharedCard>
                ) : (
                  <SharedCard
                    padding="lg"
                    shadow="md"
                    style={{ marginBottom: spacing.xl }}
                  >
                    <SharedText
                      variant="body"
                      color="textSecondary"
                      style={{ marginBottom: spacing.md }}
                    >
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

                {/* Section title */}
                {recentLogs.length > 0 && (
                  <SharedText
                    variant="h3"
                    style={{ marginBottom: spacing.sm }}
                  >
                    Recent logs
                  </SharedText>
                )}

                {/* Empty state */}
                {logs.length === 0 && (
                  <SharedCard padding="lg" shadow="sm">
                    <View style={{ alignItems: 'center', paddingVertical: spacing.lg }}>
                      <SharedText
                        variant="body"
                        color="textSecondary"
                        style={{ textAlign: 'center' }}
                      >
                        No logs yet. Start by logging your mood!
                      </SharedText>
                    </View>
                  </SharedCard>
                )}

              </View>
            }
          />
        </View>

      </SharedScreen>

      <SharedTabBar
        tabs={tabs}
        activeTab="home"
        onTabChange={handleTabChange}
      />
    </View>
  )
}