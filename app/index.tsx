import { SharedText } from '@/shared/ui'
import { Link } from 'expo-router'
import { View } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      <SharedText variant="h1">MyMood</SharedText>
      <Link href="/styleguide">
        <SharedText variant="body" color="textSecondary">
          Ver Styleguide →
        </SharedText>
      </Link>
    </View>
  )
}