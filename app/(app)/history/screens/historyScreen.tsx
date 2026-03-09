import { useHistory } from '../hooks/useHistory'
import { SharedScreen, SharedText, SharedButton, SharedCard, SharedLogCard } from '@/shared/ui'
import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
import { router } from 'expo-router'
import { ActivityIndicator, ScrollView, View } from 'react-native'

export default function HistoryScreen() {
  const { logs, loading, error, deleting, deleteLog } = useHistory()

  if (loading) {
    return (
      <SharedScreen>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SharedScreen>
    )
  }

  if (error && logs.length === 0) {
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
            <SharedLogCard key={log.id} log={log} onDelete={deleteLog} deleting={deleting} />
          ))}
        </View>
      </ScrollView>
    </SharedScreen>
  )
}
