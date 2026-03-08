import React from 'react';
import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '@/shared/constants/colors';
import { spacing, borderRadius } from '@/shared/constants/spacing';
import SharedText from './SharedText';

interface Tab {
  key: string;
  label: string;
  icon: React.ReactNode;
}

interface SharedTabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  style?: StyleProp<ViewStyle>;
}

export default function SharedTabBar({
  tabs,
  activeTab,
  onTabChange,
  style,
}: SharedTabBarProps) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.md,
          paddingBottom: spacing.md + spacing.sm,
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        style,
      ]}
    >
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onTabChange(tab.key)}
              activeOpacity={0.7}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.sm,
                  borderRadius: borderRadius.full,
                  backgroundColor: isActive ? colors.primary : 'transparent',
                  minWidth: isActive ? 60 : 'auto',
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                <View>
                  {tab.icon}
                </View>
                {isActive && (
                  <SharedText
                    variant="caption"
                    color={colors.surface}
                    weight="600"
                    style={{ marginTop: spacing.xs }}
                  >
                    {tab.label}
                  </SharedText>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

export { SharedTabBar };
