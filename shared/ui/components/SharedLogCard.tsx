import { spacing } from '@/shared/constants/spacing'
import { SharedBadge } from '@/shared/ui/components/SharedBadge'
import { SharedButton } from '@/shared/ui/components/SharedButton'
import { SharedCard } from '@/shared/ui/components/SharedCard'
import { SharedText } from '@/shared/ui/components/SharedText'
import { StyleProp, View, ViewStyle } from 'react-native'

interface Log {
  id: string
  user_id: string
  mood: number
  note: string | null
  symptoms: string[]
  created_at: string
}

interface SharedLogCardProps {
  log: Log
  onDelete: (id: string) => Promise<void>
  deleting?: string | null
  style?: StyleProp<ViewStyle>
}

const getMoodEmoji = (mood: number): string => {
  if (mood >= 7) return '😊'
  if (mood >= 5) return '😐'
  return '😕'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

export function SharedLogCard({
  log,
  onDelete,
  deleting,
  style,
}: SharedLogCardProps) {
  const isDeleting = deleting === log.id

  return (
    <SharedCard padding="md" style={[{ marginBottom: spacing.md }, style]}>
      <View style={{ gap: spacing.md }}>
        <View>
          <SharedText
            variant="caption"
            color="textSecondary"
            style={{ marginBottom: spacing.xs }}
          >
            {formatDate(log.created_at)}
          </SharedText>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.sm,
              marginBottom: spacing.sm,
            }}
          >
            <SharedText variant="h3">{log.mood}</SharedText>
            <SharedText variant="h3">{getMoodEmoji(log.mood)}</SharedText>
          </View>

          {log.note && (
            <SharedText
              variant="body"
              color="textSecondary"
              numberOfLines={2}
              style={{ marginBottom: spacing.sm }}
            >
              {log.note.length > 60
                ? `${log.note.substring(0, 60)}...`
                : log.note}
            </SharedText>
          )}

          {log.symptoms && log.symptoms.length > 0 && (
            <View
              style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}
            >
              {log.symptoms.map(symptom => (
                <SharedBadge
                  key={symptom}
                  label={symptom}
                  variant="neutral"
                  size="sm"
                />
              ))}
            </View>
          )}
        </View>

        <SharedButton
          label={isDeleting ? 'Deleting...' : 'Delete'}
          variant="ghost"
          size="sm"
          onPress={() => onDelete(log.id)}
          disabled={isDeleting}
          style={{ alignSelf: 'flex-start' }}
        />
      </View>
    </SharedCard>
  )
}

export default SharedLogCard