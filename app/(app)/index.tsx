import { supabase } from '@/lib/supabase'
import SharedButton from '@/shared/ui/components/SharedButton'
import SharedScreen from '@/shared/ui/components/SharedScreen'
import SharedText from '@/shared/ui/components/SharedText'
import { Link } from 'expo-router'
import { View } from 'react-native'

export default function HomeScreen() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <SharedScreen>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
        <SharedText variant="h1">MyMood</SharedText>
        <Link href="/styleguide">
          <SharedText variant="body" color="textSecondary">
            Ver Styleguide →
          </SharedText>
        </Link>
        <SharedButton label="Sair" variant="outline" size="sm" onPress={handleLogout} />
      </View>
    </SharedScreen>
  )
}