import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';
import { borderRadius } from '@/shared/constants/spacing';
import SharedText from './SharedText';

type Variant = 'primary' | 'success' | 'warning' | 'error' | 'neutral';
type Size = 'sm' | 'md';

interface SharedBadgeProps {
  label: string;
  variant?: Variant;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const variantStyles = {
  primary: {
    bg: colors.primaryLight,
    text: colors.primary,
  },
  success: {
    bg: colors.successLight,
    text: colors.success,
  },
  warning: {
    bg: colors.warningLight,
    text: colors.warning,
  },
  error: {
    bg: colors.errorLight,
    text: colors.error,
  },
  neutral: {
    bg: colors.surfaceAlt,
    text: colors.textSecondary,
  },
};

const sizeStyles = {
  sm: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    height: 24,
  },
  md: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    height: 32,
  },
};

export default function SharedBadge({
  label,
  variant = 'primary',
  size = 'md',
  style,
  testID,
}: SharedBadgeProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <View
      style={[
        {
          backgroundColor: variantStyle.bg,
          borderRadius: borderRadius.full,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-start',
          ...sizeStyle,
        },
        style,
      ]}
      testID={testID}
    >
      <SharedText
        variant={size === 'md' ? 'label' : 'caption'}
        color={variantStyle.text}
        weight="600"
      >
        {label}
      </SharedText>
    </View>
  );
}

export { SharedBadge };
