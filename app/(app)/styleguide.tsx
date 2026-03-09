import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';
import {
  SharedAvatar,
  SharedBadge,
  SharedButton,
  SharedCard,
  SharedDivider,
  SharedInput,
  SharedLogCard,
  SharedScreen,
  SharedTabBar,
  SharedText,
} from '@/shared/ui';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function StyleguideScreen() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('home')

  if (!__DEV__) return null;

  const sectionStyle = {
    gap: spacing.md,
    marginBottom: spacing.xl,
  };

  return (
      <SharedScreen>
        <SharedButton
          label="← Back"
          variant="ghost"
          size="sm"
          onPress={() => router.back()}
          style={{ alignSelf: 'flex-start', marginBottom: spacing.sm }}
        />
        <View style={{ padding: spacing.lg, gap: spacing.lg }}>
          {/* Header */}
          <View>
            <SharedText variant="h1" color="textPrimary">
              MyMood Design System
            </SharedText>
            <SharedText variant="body" color="textSecondary">
              Complete component library and design tokens
            </SharedText>
          </View>

          <SharedDivider />

          {/* Colors Section */}
          <View style={sectionStyle}>
            <SharedText variant="h2" color="textPrimary">
              Colors
            </SharedText>

            <View style={{ gap: spacing.md }}>
              {/* Primary Colors */}
              <View>
                <SharedText variant="h4" color="textPrimary">
                  Primary
                </SharedText>
                <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: colors.primary,
                        borderRadius: 8,
                      }}
                    />
                    <View>
                      <SharedText variant="body" color="textPrimary" weight="600">
                        Primary
                      </SharedText>
                      <SharedText variant="caption" color="textSecondary">
                        {colors.primary}
                      </SharedText>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: colors.primaryLight,
                        borderRadius: 8,
                      }}
                    />
                    <View>
                      <SharedText variant="body" color="textPrimary" weight="600">
                        Primary Light
                      </SharedText>
                      <SharedText variant="caption" color="textSecondary">
                        {colors.primaryLight}
                      </SharedText>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: colors.primaryDark,
                        borderRadius: 8,
                      }}
                    />
                    <View>
                      <SharedText variant="body" color="textPrimary" weight="600">
                        Primary Dark
                      </SharedText>
                      <SharedText variant="caption" color="textSecondary">
                        {colors.primaryDark}
                      </SharedText>
                    </View>
                  </View>
                </View>
              </View>

              {/* Semantic Colors */}
              <View>
                <SharedText variant="h4" color="textPrimary">
                  Semantic
                </SharedText>
                <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: colors.success,
                        borderRadius: 8,
                      }}
                    />
                    <SharedText variant="body" color="textPrimary" weight="600">
                      Success
                    </SharedText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: colors.warning,
                        borderRadius: 8,
                      }}
                    />
                    <SharedText variant="body" color="textPrimary" weight="600">
                      Warning
                    </SharedText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: colors.error,
                        borderRadius: 8,
                      }}
                    />
                    <SharedText variant="body" color="textPrimary" weight="600">
                      Error
                    </SharedText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: colors.info,
                        borderRadius: 8,
                      }}
                    />
                    <SharedText variant="body" color="textPrimary" weight="600">
                      Info
                    </SharedText>
                  </View>
                </View>
              </View>

              {/* Neutral Colors */}
              <View>
                <SharedText variant="h4" color="textPrimary">
                  Neutral
                </SharedText>
                <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                        borderWidth: 1,
                        borderRadius: 8,
                      }}
                    />
                    <SharedText variant="body" color="textPrimary" weight="600">
                      Background
                    </SharedText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                        borderWidth: 1,
                        borderRadius: 8,
                      }}
                    />
                    <SharedText variant="body" color="textPrimary" weight="600">
                      Surface
                    </SharedText>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <SharedDivider />

          {/* Typography Section */}
          <View style={sectionStyle}>
            <SharedText variant="h2" color="textPrimary">
              Typography
            </SharedText>

            <View style={{ gap: spacing.lg }}>
              <View style={{ gap: spacing.sm }}>
                <SharedText variant="h1" color="textPrimary">
                  Heading 1
                </SharedText>
                <SharedText variant="caption" color="textSecondary">
                  32px • fontWeight 700
                </SharedText>
              </View>

              <View style={{ gap: spacing.sm }}>
                <SharedText variant="h2" color="textPrimary">
                  Heading 2
                </SharedText>
                <SharedText variant="caption" color="textSecondary">
                  24px • fontWeight 700
                </SharedText>
              </View>

              <View style={{ gap: spacing.sm }}>
                <SharedText variant="h3" color="textPrimary">
                  Heading 3
                </SharedText>
                <SharedText variant="caption" color="textSecondary">
                  20px • fontWeight 600
                </SharedText>
              </View>

              <View style={{ gap: spacing.sm }}>
                <SharedText variant="h4" color="textPrimary">
                  Heading 4
                </SharedText>
                <SharedText variant="caption" color="textSecondary">
                  18px • fontWeight 600
                </SharedText>
              </View>

              <View style={{ gap: spacing.sm }}>
                <SharedText variant="body" color="textPrimary">
                  Body text
                </SharedText>
                <SharedText variant="caption" color="textSecondary">
                  16px • fontWeight 400
                </SharedText>
              </View>

              <View style={{ gap: spacing.sm }}>
                <SharedText variant="bodyMedium" color="textPrimary">
                  Body medium
                </SharedText>
                <SharedText variant="caption" color="textSecondary">
                  16px • fontWeight 500
                </SharedText>
              </View>

              <View style={{ gap: spacing.sm }}>
                <SharedText variant="label" color="textPrimary">
                  Label
                </SharedText>
                <SharedText variant="caption" color="textSecondary">
                  14px • fontWeight 500
                </SharedText>
              </View>

              <View style={{ gap: spacing.sm }}>
                <SharedText variant="caption" color="textPrimary">
                  Caption
                </SharedText>
                <SharedText variant="caption" color="textSecondary">
                  12px • fontWeight 400
                </SharedText>
              </View>
            </View>
          </View>

          <SharedDivider />

          {/* Buttons Section */}
          <View style={sectionStyle}>
            <SharedText variant="h2" color="textPrimary">
              Buttons
            </SharedText>

            <View style={{ gap: spacing.lg }}>
              {/* Primary Buttons */}
              <View style={{ gap: spacing.md }}>
                <SharedText variant="h4" color="textPrimary">
                  Primary
                </SharedText>
                <View style={{ gap: spacing.sm }}>
                  <SharedButton label="Small" variant="primary" size="sm" />
                  <SharedButton label="Medium" variant="primary" size="md" />
                  <SharedButton label="Large" variant="primary" size="lg" />
                  <SharedButton label="Loading" variant="primary" size="md" loading />
                  <SharedButton label="Disabled" variant="primary" size="md" disabled />
                </View>
              </View>

              {/* Secondary Buttons */}
              <View style={{ gap: spacing.md }}>
                <SharedText variant="h4" color="textPrimary">
                  Secondary
                </SharedText>
                <View style={{ gap: spacing.sm }}>
                  <SharedButton label="Small" variant="secondary" size="sm" />
                  <SharedButton label="Medium" variant="secondary" size="md" />
                  <SharedButton label="Large" variant="secondary" size="lg" />
                </View>
              </View>

              {/* Outline Buttons */}
              <View style={{ gap: spacing.md }}>
                <SharedText variant="h4" color="textPrimary">
                  Outline
                </SharedText>
                <View style={{ gap: spacing.sm }}>
                  <SharedButton label="Small" variant="outline" size="sm" />
                  <SharedButton label="Medium" variant="outline" size="md" />
                  <SharedButton label="Large" variant="outline" size="lg" />
                </View>
              </View>

              {/* Ghost Buttons */}
              <View style={{ gap: spacing.md }}>
                <SharedText variant="h4" color="textPrimary">
                  Ghost
                </SharedText>
                <View style={{ gap: spacing.sm }}>
                  <SharedButton label="Small" variant="ghost" size="sm" />
                  <SharedButton label="Medium" variant="ghost" size="md" />
                  <SharedButton label="Large" variant="ghost" size="lg" />
                </View>
              </View>
            </View>
          </View>

          <SharedDivider />

          {/* Cards Section */}
          <View style={sectionStyle}>
            <SharedText variant="h2" color="textPrimary">
              Cards
            </SharedText>

            <View style={{ gap: spacing.md }}>
              <SharedCard padding="md" shadow="md">
                <SharedText variant="h4" color="textPrimary">
                  Default Card
                </SharedText>
                <SharedText variant="body" color="textSecondary" style={{ marginTop: spacing.sm }}>
                  This is a card with shadow and padding
                </SharedText>
              </SharedCard>

              <SharedCard padding="lg" shadow="lg">
                <SharedText variant="h4" color="textPrimary">
                  Large Card
                </SharedText>
                <SharedText variant="body" color="textSecondary" style={{ marginTop: spacing.sm }}>
                  This card has more padding and a larger shadow
                </SharedText>
              </SharedCard>

              <SharedCard padding="sm" shadow="sm">
                <SharedText variant="body" color="textPrimary">
                  Small Card with Light Shadow
                </SharedText>
              </SharedCard>

              <SharedCard padding="md" shadow="none" onPress={() => {}}>
                <SharedText variant="body" color="textPrimary">
                  Pressable Card (tap me)
                </SharedText>
              </SharedCard>
            </View>
          </View>

          <SharedDivider />

          {/* Input Section */}
          <View style={sectionStyle}>
            <SharedText variant="h2" color="textPrimary">
              Inputs
            </SharedText>

            <View style={{ gap: spacing.lg }}>
              <SharedInput placeholder="Default input" />

              <SharedInput
                label="With Label"
                placeholder="Enter text"
              />

              <SharedInput
                label="With Error"
                placeholder="Something went wrong"
                error="This field is required"
              />

              <SharedInput
                label="With Helper Text"
                placeholder="Enter your email"
                helperText="We'll never share your email"
              />

              <SharedInput
                label="Disabled"
                placeholder="Disabled input"
                editable={false}
              />
            </View>
          </View>

          <SharedDivider />

          {/* Badges Section */}
          <View style={sectionStyle}>
            <SharedText variant="h2" color="textPrimary">
              Badges
            </SharedText>

            <View style={{ gap: spacing.lg }}>
              {/* Size Variants */}
              <View style={{ gap: spacing.md }}>
                <SharedText variant="h4" color="textPrimary">
                  Small
                </SharedText>
                <View style={{ gap: spacing.sm, flexDirection: 'row', flexWrap: 'wrap' }}>
                  <SharedBadge label="Primary" variant="primary" size="sm" />
                  <SharedBadge label="Success" variant="success" size="sm" />
                  <SharedBadge label="Warning" variant="warning" size="sm" />
                  <SharedBadge label="Error" variant="error" size="sm" />
                  <SharedBadge label="Neutral" variant="neutral" size="sm" />
                </View>
              </View>

              <View style={{ gap: spacing.md }}>
                <SharedText variant="h4" color="textPrimary">
                  Medium
                </SharedText>
                <View style={{ gap: spacing.sm, flexDirection: 'row', flexWrap: 'wrap' }}>
                  <SharedBadge label="Primary" variant="primary" size="md" />
                  <SharedBadge label="Success" variant="success" size="md" />
                  <SharedBadge label="Warning" variant="warning" size="md" />
                  <SharedBadge label="Error" variant="error" size="md" />
                  <SharedBadge label="Neutral" variant="neutral" size="md" />
                </View>
              </View>
            </View>
          </View>

          <SharedDivider />

          {/* Avatars Section */}
          <View style={sectionStyle}>
            <SharedText variant="h2" color="textPrimary">
              Avatars
            </SharedText>

            <View style={{ gap: spacing.lg }}>
              <View style={{ gap: spacing.md }}>
                <SharedText variant="h4" color="textPrimary">
                  Small (32px)
                </SharedText>
                <View style={{ flexDirection: 'row', gap: spacing.md }}>
                  <SharedAvatar initials="SR" size="sm" color={colors.primary} />
                  <SharedAvatar initials="JD" size="sm" color={colors.success} />
                  <SharedAvatar initials="AB" size="sm" color={colors.warning} />
                </View>
              </View>

              <View style={{ gap: spacing.md }}>
                <SharedText variant="h4" color="textPrimary">
                  Medium (40px)
                </SharedText>
                <View style={{ flexDirection: 'row', gap: spacing.md }}>
                  <SharedAvatar initials="SR" size="md" color={colors.primary} />
                  <SharedAvatar initials="JD" size="md" color={colors.success} />
                  <SharedAvatar initials="AB" size="md" color={colors.warning} />
                </View>
              </View>

              <View style={{ gap: spacing.md }}>
                <SharedText variant="h4" color="textPrimary">
                  Large (56px)
                </SharedText>
                <View style={{ flexDirection: 'row', gap: spacing.md }}>
                  <SharedAvatar initials="SR" size="lg" color={colors.primary} />
                  <SharedAvatar initials="JD" size="lg" color={colors.success} />
                  <SharedAvatar initials="AB" size="lg" color={colors.warning} />
                </View>
              </View>
            </View>
          </View>

          <SharedDivider />

          {/* Dividers Section */}
          <View style={sectionStyle}>
            <SharedText variant="h2" color="textPrimary">
              Dividers
            </SharedText>

            <View style={{ gap: spacing.lg }}>
              <SharedDivider />

              <SharedDivider label="Or" />

              <SharedDivider label="Continue with" />
            </View>
          </View>

          <SharedDivider />

          {/* TabBar Section */}
          <View style={sectionStyle}>
            <SharedText variant="h2" color="textPrimary">
              Tab Bar
            </SharedText>

            <View style={{ gap: spacing.lg }}>
              <SharedText variant="h4" color="textPrimary">
                MyMood Navigation
              </SharedText>
              <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, overflow: 'hidden' }}>
                <SharedTabBar
                  tabs={[
                    {
                      key: 'home',
                      label: 'Home',
                      icon: <Ionicons name="home" size={24} color={colors.textSecondary} />,
                    },
                    {
                      key: 'history',
                      label: 'History',
                      icon: <Ionicons name="time" size={24} color={colors.textSecondary} />,
                    },
                    {
                      key: 'log',
                      label: 'Log',
                      icon: <Ionicons name="add-circle" size={24} color={colors.textSecondary} />,
                    },
                    {
                      key: 'insights',
                      label: 'Insights',
                      icon: <Ionicons name="sparkles" size={24} color={colors.textSecondary} />,
                    },
                    {
                      key: 'profile',
                      label: 'Profile',
                      icon: <Ionicons name="person" size={24} color={colors.textSecondary} />,
                    },
                  ]}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </View>
            </View>
          </View>

          <SharedDivider />

          {/* Spacing Reference */}
          <View style={sectionStyle}>
            <SharedText variant="h2" color="textPrimary">
              Spacing Scale
            </SharedText>

            <View style={{ gap: spacing.md }}>
              {Object.entries({
                xs: spacing.xs,
                sm: spacing.sm,
                md: spacing.md,
                lg: spacing.lg,
                xl: spacing.xl,
                xxl: spacing.xxl,
              }).map(([name, value]) => (
                <View key={name} style={{ gap: spacing.sm }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                    <View
                      style={{
                        width: value,
                        height: 20,
                        backgroundColor: colors.primary,
                        borderRadius: 4,
                      }}
                    />
                    <SharedText variant="body" color="textPrimary" weight="600">
                      {name}: {value}px
                    </SharedText>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={{ height: spacing.xl }} />

          <SharedDivider />

          {/* LogCard Section */}
          <View style={sectionStyle}>
            <SharedText variant="h2" color="textPrimary">
              Log Card
            </SharedText>

            <View style={{ gap: spacing.md }}>
              <SharedLogCard
                log={{
                  id: '1',
                  user_id: 'user123',
                  mood: 8,
                  note: 'Had a great day today! Feeling energetic and positive.',
                  symptoms: ['Happy', 'Energized'],
                  created_at: new Date().toISOString(),
                }}
                onDelete={async () => console.log('Delete pressed')}
              />

              <SharedLogCard
                log={{
                  id: '2',
                  user_id: 'user123',
                  mood: 5,
                  note: 'Neutral mood, just another regular day.',
                  symptoms: ['Neutral'],
                  created_at: new Date(Date.now() - 86400000).toISOString(),
                }}
                onDelete={async () => console.log('Delete pressed')}
              />

              <SharedLogCard
                log={{
                  id: '3',
                  user_id: 'user123',
                  mood: 3,
                  note: 'Feeling a bit down today.',
                  symptoms: ['Sad', 'Tired'],
                  created_at: new Date(Date.now() - 172800000).toISOString(),
                }}
                onDelete={async () => console.log('Delete pressed')}
              />

              <SharedLogCard
                log={{
                  id: '4',
                  user_id: 'user123',
                  mood: 6,
                  note: null,
                  symptoms: [],
                  created_at: new Date(Date.now() - 259200000).toISOString(),
                }}
                onDelete={async () => console.log('Delete pressed')}
                deleting="4"
              />
            </View>
          </View>

          <View style={{ height: spacing.xl }} />
        </View>
      </SharedScreen>
    );
}
