import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { logService } from '../services/logService'

const SYMPTOMS = ['headache', 'fatigue', 'anxiety', 'sadness', 'irritability', 'insomnia', 'low energy', 'brain fog']

export function useLog() {
  const [mood, setMood] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const handleSave = async () => {
    if (mood === null) {
      setError('Please select a mood')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('User not found')
        setLoading(false)
        return
      }

      const { error: insertError } = await logService.createLog({
        user_id: user.id,
        mood,
        note: note || null,
        symptoms: selectedSymptoms,
      })

      if (insertError) {
        setError(insertError.message)
        setLoading(false)
        return
      }

      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
      return { success: false }
    }
  }

  const resetForm = () => {
    setMood(null)
    setNote('')
    setSelectedSymptoms([])
    setError(null)
  }

  return {
    mood,
    setMood,
    note,
    setNote,
    selectedSymptoms,
    loading,
    error,
    handleSymptomToggle,
    handleSave,
    resetForm,
    SYMPTOMS,
  }
}
