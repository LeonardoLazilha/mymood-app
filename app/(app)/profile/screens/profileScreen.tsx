import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
import { SharedAvatar, SharedButton, SharedCard, SharedDivider, SharedScreen, SharedText } from '@/shared/ui'
import { useRouter } from 'expo-router'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { useProfile } from '../hooks/useProfile'

export default function ProfileScreen() {
  const router = useRouter()
  const {
    user,
    loading,
    getInitials,
    formatDate,
    handleSignOut,
  } = useProfile()

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
          label="← Back"
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
    <SharedScreen scrollable={false}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
        <SharedButton
          label="← Back"
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

          <View style={{ marginVertical: spacing.lg }}>
          <SharedCard padding="lg" shadow="md">
            <SharedText variant="h3" color="textPrimary" style={{ marginTop: spacing.sm }}>
              Discover the app's design system!
            </SharedText>
              <SharedText variant="label" color="textSecondary">
              Explore the colors, typography, and spacing that create a cohesive and delightful user experience.
            </SharedText>
            <SharedButton label="Discover" size="sm" variant='secondary' onPress={() => router.push('/(app)/styleguide' as never)} />
          </SharedCard>
        </View>

         <SharedDivider />

        <View style={{ marginBottom: spacing.lg }}>
          <SharedButton
            label="Sign Out"
            variant="outline"
            size="md"
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </SharedScreen>
  )
}
