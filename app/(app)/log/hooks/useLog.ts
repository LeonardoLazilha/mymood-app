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
    // Validate mood
    if (mood === null || mood < 1 || mood > 10) {
      setError('Please select a mood between 1 and 10')
      return
    }

    // Validate note length
    if (note && note.length > 500) {
      setError('Note must be under 500 characters')
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
        console.error('Save log error:', insertError)
        setError('Failed to save log. Please try again.')
        setLoading(false)
        return
      }

      return { success: true }
    } catch (err) {
      console.error('Save log error:', err)
      setError('An error occurred while saving. Please try again.')
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
