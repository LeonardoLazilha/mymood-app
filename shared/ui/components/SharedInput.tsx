import { colors } from '@/shared/constants/colors';
import { borderRadius, spacing } from '@/shared/constants/spacing';
import React, { useState } from 'react';
import {
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import SharedText from './SharedText';

interface SharedInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  editable?: boolean;
  style?: StyleProp<TextStyle>;
  testID?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

export default function SharedInput({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  editable = true,
  onFocus,
  onBlur,
  ...props
}: SharedInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const borderColor = error
    ? colors.error
    : isFocused
      ? colors.borderFocus
      : colors.border;

  return (
    <View style={{ gap: spacing.sm }}>
      {label && (
        <SharedText variant="label" color="textPrimary" weight="600">
          {label}
        </SharedText>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor,
          borderRadius: borderRadius.lg,
          backgroundColor: editable ? colors.surface : colors.surfaceAlt,
          paddingHorizontal: spacing.md,
          height: 44,
        }}
      >
        {leftIcon && <View style={{ marginRight: spacing.sm }}>{leftIcon}</View>}
        <TextInput
          placeholderTextColor={colors.textTertiary}
          editable={editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            {
              flex: 1,
              fontSize: 16,
              color: colors.textPrimary,
            },
            style,
          ]}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={{ marginLeft: spacing.sm }}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <SharedText variant="caption" color="error">
          {error}
        </SharedText>
      )}
      {helperText && !error && (
        <SharedText variant="caption" color="textSecondary">
          {helperText}
        </SharedText>
      )}
    </View>
  );
}

export { SharedInput };
