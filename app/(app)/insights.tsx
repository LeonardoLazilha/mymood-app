import { spacing } from '@/shared/constants/spacing'
import { SharedButton, SharedScreen, SharedText } from '@/shared/ui'
import { useRouter } from 'expo-router'
import { View } from 'react-native'

export default function InsightsScreen() {
  const router = useRouter()

  return (
    <SharedScreen>
      <SharedButton
        label="← Voltar"
        variant="ghost"
        size="sm"
        onPress={() => router.push('/(app)' as never)}
        style={{ alignSelf: 'flex-start', marginBottom: spacing.sm }}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SharedText variant="h2">Em breve 🚧</SharedText>
      </View>
    </SharedScreen>
  )
}