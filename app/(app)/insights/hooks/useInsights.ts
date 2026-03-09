import { useState, useCallback } from 'react'
import { useFocusEffect } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { insightsService } from '../services/insightsService'

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

export function useInsights() {
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

      const { data: logsData, error: logsError } = await insightsService.fetchLogsByDateRange(user.id, fourteenDaysAgo)

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

      const { data: insightsData, error: insightsError } = await insightsService.fetchRecentInsights(user.id)

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

      const { data, error: functionError } = await insightsService.generateNewInsight(logs)

      if (functionError) {
        console.error('Error calling generate-insights:', functionError)
        setError('Failed to generate insight')
        return
      }

      const insightContent = data?.insight || 'No insight generated'
      setCurrentInsight(insightContent)

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { error: insertError } = await insightsService.saveInsight(user.id, insightContent)

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

  return {
    logs,
    insights,
    currentInsight,
    loading,
    generatingInsight,
    error,
    generateInsight,
    formatDate,
  }
}
