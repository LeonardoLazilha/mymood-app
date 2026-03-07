import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';
import { borderRadius } from '@/shared/constants/spacing';
import SharedText from './SharedText';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface SharedButtonProps {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  testID?: string;
}

const variantStyles: Record<Variant, { bg: string; text: string; border: string }> = {
  primary: {
    bg: colors.primary,
    text: colors.surface,
    border: 'transparent',
  },
  secondary: {
    bg: colors.primaryLight,
    text: colors.primary,
    border: 'transparent',
  },
  outline: {
    bg: colors.surface,
    text: colors.primary,
    border: colors.border,
  },
  ghost: {
    bg: 'transparent',
    text: colors.primary,
    border: 'transparent',
  },
};

const sizeStyles = {
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    height: 32,
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    height: 40,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    height: 48,
  },
};

export default function SharedButton({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  ...props
}: SharedButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isDisabled}
      style={[
        {
          backgroundColor: isDisabled ? colors.textDisabled : variantStyle.bg,
          borderRadius: borderRadius.lg,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: variant === 'outline' ? variantStyle.border : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          opacity: isDisabled ? 0.5 : 1,
          ...sizeStyle,
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? variantStyle.text : colors.surface}
          size={size === 'lg' ? 'large' : 'small'}
        />
      ) : (
        <>
          {leftIcon && <View style={{ marginRight: spacing.sm }}>{leftIcon}</View>}
          <SharedText
            variant={size === 'lg' ? 'label' : 'caption'}
            color={isDisabled ? colors.textDisabled : variantStyle.text}
            weight="600"
          >
            {label}
          </SharedText>
          {rightIcon && <View style={{ marginLeft: spacing.sm }}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
}

export { SharedButton };
