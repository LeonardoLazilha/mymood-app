import { useInsights } from '../hooks/useInsights'
import { SharedButton, SharedCard, SharedScreen, SharedText } from '@/shared/ui'
import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
import { useRouter } from 'expo-router'
import { ActivityIndicator, FlatList, View } from 'react-native'
import Markdown from 'react-native-markdown-display'

const markdownStyles = {
  body: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 22,
  },
  heading1: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700' as const,
    marginBottom: spacing.sm,
  },
  heading2: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600' as const,
    marginBottom: spacing.xs,
  },
  strong: {
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
  em: {
    color: colors.textSecondary,
  },
  bullet_list: {
    marginTop: spacing.xs,
  },
  list_item: {
    marginBottom: spacing.xs,
  },
  paragraph: {
    marginBottom: spacing.sm,
  },
}

export default function InsightsScreen() {
  const router = useRouter()
  const {
    logs,
    insights,
    currentInsight,
    loading,
    generatingInsight,
    error,
    generateInsight,
    formatDate,
  } = useInsights()

  if (loading) {
    return (
      <SharedScreen>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SharedScreen>
    )
  }

  const renderInsight = ({ item }: any) => (
    <SharedCard padding="md" shadow="sm">
      <View style={{ marginBottom: spacing.sm }}>
        <SharedText variant="caption" color="textSecondary">
          {formatDate(item.generatedAt)}
        </SharedText>
      </View>
      <Markdown style={markdownStyles}>
        {item.content}
      </Markdown>
    </SharedCard>
  )

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SharedScreen scrollable={false}>
        <FlatList
          data={insights}
          keyExtractor={(item) => item.id}
          renderItem={renderInsight}
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
              <SharedButton
                label="← Back"
                variant="ghost"
                size="sm"
                onPress={() => router.push('/(app)' as never)}
                style={{ alignSelf: 'flex-start', marginBottom: spacing.md }}
              />

              <View style={{ marginBottom: spacing.xl }}>
                <SharedText variant="h2" color="textPrimary">
                  Insights ✨
                </SharedText>
                <SharedText variant="body" color="textSecondary" style={{ marginTop: spacing.sm }}>
                  AI-powered insights from your last 14 days
                </SharedText>
              </View>

              {error && (
                <SharedCard padding="md" shadow="sm" style={{ marginBottom: spacing.lg, backgroundColor: colors.errorLight }}>
                  <SharedText variant="body" color="error">
                    {error}
                  </SharedText>
                </SharedCard>
              )}

              {logs.length > 0 ? (
                <View style={{ marginBottom: spacing.lg }}>
                  {currentInsight ? (
                    <SharedCard padding="lg" shadow="md" style={{ marginBottom: spacing.lg, backgroundColor: colors.primaryLight }}>
                      <SharedText variant="body" color="textPrimary" weight="600" style={{ marginBottom: spacing.md }}>
                        Today's Insight
                      </SharedText>
                      <Markdown style={markdownStyles}>
                        {currentInsight}
                      </Markdown>
                    </SharedCard>
                  ) : null}

                  <SharedButton
                    label={generatingInsight ? 'Generating...' : 'Generate New Insight'}
                    variant="primary"
                    size="lg"
                    onPress={generateInsight}
                    disabled={generatingInsight}
                    style={{ marginBottom: spacing.lg }}
                  />
                </View>
              ) : (
                <SharedCard padding="lg" shadow="md" style={{ marginBottom: spacing.lg }}>
                  <View style={{ alignItems: 'center', paddingVertical: spacing.md }}>
                    <SharedText variant="body" color="textSecondary" style={{ textAlign: 'center', marginBottom: spacing.md }}>
                      Add some logs to generate insights
                    </SharedText>
                    <SharedButton
                      label="Log your mood"
                      variant="primary"
                      size="md"
                      onPress={() => router.push('/(app)/log' as never)}
                    />
                  </View>
                </SharedCard>
              )}

              {insights.length > 0 && (
                <SharedText variant="h3" color="textPrimary" style={{ marginBottom: spacing.md }}>
                  Recent insights
                </SharedText>
              )}
            </View>
          }
        />
      </SharedScreen>
    </View>
  )
}
