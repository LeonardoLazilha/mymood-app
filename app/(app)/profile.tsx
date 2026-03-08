import { supabase } from '@/lib/supabase'
import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
import { SharedAvatar, SharedButton, SharedCard, SharedDivider, SharedScreen, SharedText } from '@/shared/ui'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

interface UserProfile {
  email: string
  createdAt: string
}

export default function ProfileScreen() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (user && user.email) {
        setUser({
          email: user.email,
          createdAt: user.created_at || new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (email: string) => {
    const namePart = email.split('@')[0]
    const words = namePart.split(/[._-]/)
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    return namePart.substring(0, 2).toUpperCase()
  }

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
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

  if (!user) {
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
          <SharedText variant="body" color="textSecondary">
            Unable to load profile
          </SharedText>
        </View>
      </SharedScreen>
    )
  }

  return (
    <SharedScreen>
      <SharedButton
        label="← Voltar"
        variant="ghost"
        size="sm"
        onPress={() => router.push('/(app)' as never)}
        style={{ alignSelf: 'flex-start', marginBottom: spacing.lg }}
      />

      {/* Avatar and Email */}
      <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
        <SharedAvatar
          initials={getInitials(user.email)}
          size="lg"
          color={colors.primary}
        />
        <SharedText variant="body" color="textPrimary" style={{ marginTop: spacing.md, textAlign: 'center' }}>
          {user.email}
        </SharedText>
      </View>

      <SharedDivider />

      {/* Account Info */}
      <View style={{ marginVertical: spacing.lg }}>
        <SharedCard padding="lg" shadow="md">
          <SharedText variant="label" color="textSecondary">
            Member since
          </SharedText>
          <SharedText variant="h4" color="textPrimary" style={{ marginTop: spacing.sm }}>
            {formatDate(user.createdAt)}
          </SharedText>
        </SharedCard>
      </View>

      <SharedDivider />

      {/* Sign Out Button */}
      <View style={{ marginTop: spacing.lg }}>
        <SharedButton
          label="Sign Out"
          variant="outline"
          size="md"
          onPress={handleSignOut}
        />
      </View>
    </SharedScreen>
  )
}