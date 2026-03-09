import { useLog } from '../hooks/useLog'
import { SharedButton, SharedScreen, SharedText, SharedBadge } from '@/shared/ui'
import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
import { useRouter } from 'expo-router'
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'

export default function LogScreen() {
  const router = useRouter()
  const {
    mood,
    setMood,
    note,
    setNote,
    selectedSymptoms,
    loading,
    error,
    handleSymptomToggle,
    handleSave,
    SYMPTOMS,
  } = useLog()

  const onSave = async () => {
    const result = await handleSave()
    if (result?.success) {
      router.replace('/(app)/' as never)
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
          onPress={onSave}
          loading={loading}
          disabled={loading}
          style={{ marginTop: spacing.lg }}
        />
      </ScrollView>
    </SharedScreen>
  )
}
