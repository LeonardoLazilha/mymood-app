import { supabase } from '@/lib/supabase'
import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
import { SharedButton, SharedCard, SharedScreen, SharedText } from '@/shared/ui'
import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import Markdown from 'react-native-markdown-display'

interface Log {
  id: string
  mood: number
  note: string | null
  symptoms: string[] | null
  createdAt: string
}

interface Insight {
  id: string
  content: string
  generatedAt: string
}

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
  const [logs, setLogs] = useState<Log[]>([])
  const [insights, setInsights] = useState<Insight[]>([])
  const [currentInsight, setCurrentInsight] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [generatingInsight, setGeneratingInsight] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const fourteenDaysAgo = new Date()
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)

      const { data: logsData, error: logsError } = await supabase
        .from('logs')
        .select('id, mood, note, symptoms, created_at')
        .eq('user_id', user.id)
        .gte('created_at', fourteenDaysAgo.toISOString())
        .order('created_at', { ascending: false })

      if (logsError) {
        console.error('Error fetching logs:', logsError)
        setError('Failed to fetch logs')
      } else if (logsData) {
        const transformedLogs = logsData.map((log: any) => ({
          id: log.id,
          mood: log.mood,
          note: log.note,
          symptoms: log.symptoms,
          createdAt: log.created_at,
        }))
        setLogs(transformedLogs)
      }

      const { data: insightsData, error: insightsError } = await supabase
        .from('insights')
        .select('id, content, generated_at')
        .eq('user_id', user.id)
        .order('generated_at', { ascending: false })
        .limit(5)

      if (insightsError) {
        console.error('Error fetching insights:', insightsError)
      } else if (insightsData) {
        const transformedInsights = insightsData.map((insight: any) => ({
          id: insight.id,
          content: insight.content,
          generatedAt: insight.generated_at,
        }))
        setInsights(transformedInsights)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('An error occurred while fetching data')
    } finally {
      setLoading(false)
    }
  }

  const generateInsight = async () => {
    if (logs.length === 0) {
      setError('Add some logs to generate insights')
      return
    }

    try {
      setGeneratingInsight(true)
      setError(null)

      const { data, error: functionError } = await supabase.functions.invoke('generate-insights', {
        body: { logs },
      })

      if (functionError) {
        console.error('Error calling generate-insights:', functionError)
        setError('Failed to generate insight')
        return
      }

      const insightContent = data?.insight || 'No insight generated'
      setCurrentInsight(insightContent)

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { error: insertError } = await supabase
          .from('insights')
          .insert([
            {
              user_id: user.id,
              content: insightContent,
              generated_at: new Date().toISOString(),
            },
          ])

        if (insertError) {
          console.error('Error saving insight:', insertError)
          setError('Insight generated but failed to save')
        } else {
          await fetchData()
        }
      }
    } catch (error) {
      console.error('Error generating insight:', error)
      setError('An error occurred while generating insight')
    } finally {
      setGeneratingInsight(false)
    }
  }

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
        <SharedButton
          label="← Back"
          variant="ghost"
          size="sm"
          onPress={() => router.push('/(app)' as never)}
          style={{ alignSelf: 'flex-start', marginBottom: spacing.md }}
        />
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}
          showsVerticalScrollIndicator={false}
        >
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
            <>
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
            </>
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
            <View>
              <SharedText variant="h3" color="textPrimary" style={{ marginBottom: spacing.md }}>
                Recent insights
              </SharedText>
              <View style={{ gap: spacing.md }}>
                {insights.map((insight) => (
                  <SharedCard key={insight.id} padding="md" shadow="sm">
                    <View style={{ marginBottom: spacing.sm }}>
                      <SharedText variant="caption" color="textSecondary">
                        {formatDate(insight.generatedAt)}
                      </SharedText>
                    </View>
                    <Markdown style={markdownStyles}>
                      {insight.content}
                    </Markdown>
                  </SharedCard>
                ))}
              </View>
            </View>
          )}

          <View style={{ height: spacing.lg }} />
        </ScrollView>
      </SharedScreen>
    </View>
  )
}