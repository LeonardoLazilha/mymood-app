import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';
import { borderRadius } from '@/shared/constants/spacing';
import { shadows } from '@/shared/constants/shadows';

interface SharedCardProps {
  onPress?: () => void;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  testID?: string;
}

const paddingMap = {
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
};

export default function SharedCard({
  onPress,
  padding = 'md',
  shadow = 'md',
  style,
  children,
  testID,
}: SharedCardProps) {
  const paddingValue = paddingMap[padding];
  const shadowStyle = shadow === 'none' ? {} : shadows[shadow as 'sm' | 'md' | 'lg' | 'xl'];

  const cardStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderRadius: borderRadius['2xl'],
      padding: paddingValue,
      ...shadowStyle,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={cardStyle}
        testID={testID}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );
}

export { SharedCard };
