import { supabase } from '@/lib/supabase'
import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
import { SharedBadge, SharedButton, SharedScreen, SharedText } from '@/shared/ui'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'

const SYMPTOMS = ['headache', 'fatigue', 'anxiety', 'sadness', 'irritability', 'insomnia', 'low energy', 'brain fog']

export default function LogScreen() {
  const router = useRouter()
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

      const { error: insertError } = await supabase
        .from('logs')
        .insert({
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

      router.replace('/(app)/' as never)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  return (
    <SharedScreen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SharedButton
          label="← Back"
          variant="ghost"
          size="sm"
          onPress={() => router.push('/(app)' as never)}
          style={{ alignSelf: 'flex-start', marginBottom: spacing.md }}
        />
        <SharedText variant="h2" style={{ marginBottom: spacing.lg }}>
          How are you feeling today?
        </SharedText>

        <View style={{ marginBottom: spacing.xl }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <SharedButton
                key={num}
                label={String(num)}
                variant={mood === num ? 'primary' : 'outline'}
                size="sm"
                onPress={() => setMood(num)}
                style={{
                  flex: 1,
                  minWidth: '18%',
                }}
              />
            ))}
          </View>
        </View>

        <View style={{ marginBottom: spacing.xl }}>
          <SharedText variant="label" color="textPrimary" weight="600" style={{ marginBottom: spacing.sm }}>
            Add a note
          </SharedText>
          <TextInput
            placeholder="Optional"
            placeholderTextColor={colors.textTertiary}
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={4}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 12,
              padding: spacing.md,
              color: colors.textPrimary,
              fontSize: 16,
              backgroundColor: colors.surface,
              minHeight: 100,
            }}
          />
        </View>

        <View style={{ marginBottom: spacing.xl }}>
          <SharedText variant="h3" style={{ marginBottom: spacing.md }}>
            Symptoms
          </SharedText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
            {SYMPTOMS.map(symptom => (
              <TouchableOpacity
                key={symptom}
                onPress={() => handleSymptomToggle(symptom)}
              >
                <SharedBadge
                  label={symptom}
                  variant={selectedSymptoms.includes(symptom) ? 'primary' : 'neutral'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {error && (
          <SharedText
            variant="body"
            style={{ color: colors.error, marginBottom: spacing.md }}
          >
            {error}
          </SharedText>
        )}

        <SharedButton
          label="Save"
          onPress={handleSave}
          loading={loading}
          disabled={loading}
          style={{ marginTop: spacing.lg }}
        />
      </ScrollView>
    </SharedScreen>
  )
}