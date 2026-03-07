import React from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';
import { typography } from '@/shared/constants/typography';
import { colors } from '@/shared/constants/colors';

type Variant = keyof typeof typography;
type Color = keyof typeof colors;

interface SharedTextProps {
  variant?: Variant;
  color?: Color | string;
  weight?: '400' | '500' | '600' | '700';
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  onPress?: () => void;
  numberOfLines?: number;
  testID?: string;
}

export default function SharedText({
  variant = 'body',
  color = 'textPrimary',
  weight,
  style,
  ...props
}: SharedTextProps) {
  const typeStyles = typography[variant] || typography.body;
  const textColor =
    typeof color === 'string' && color.startsWith('#')
      ? color
      : (colors[color as Color] || colors.textPrimary);

  return (
    <RNText
      style={[
        {
          fontSize: typeStyles.fontSize,
          fontWeight: weight || typeStyles.fontWeight,
          lineHeight: typeStyles.lineHeight,
          color: textColor,
        },
        style,
      ]}
      {...props}
    />
  );
}

export { SharedText };
