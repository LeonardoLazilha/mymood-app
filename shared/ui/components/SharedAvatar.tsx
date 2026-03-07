import { colors } from '@/shared/constants/colors';
import React from 'react';
import {
  Image,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import SharedText from './SharedText';

type Size = 'sm' | 'md' | 'lg';

interface SharedAvatarProps {
  source?: { uri: string };
  initials?: string;
  size?: Size;
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const sizeMap = {
  sm: 32,
  md: 40,
  lg: 56,
};

export default function SharedAvatar({
  source,
  initials,
  size = 'md',
  color = colors.primary,
  testID,
}: SharedAvatarProps) {
  const sizeValue = sizeMap[size];

  if (source?.uri) {
    return (
      <Image
        source={source}
        style={[
          {
            width: sizeValue,
            height: sizeValue,
            borderRadius: sizeValue / 2,
          },
        ]}
        testID={testID}
      />
    );
  }

  return (
    <View
      style={[
        {
          width: sizeValue,
          height: sizeValue,
          borderRadius: sizeValue / 2,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      testID={testID}
    >
      <SharedText
        variant={size === 'lg' ? 'h3' : size === 'md' ? 'bodyMedium' : 'caption'}
        color={colors.surface}
        weight="600"
      >
        {initials}
      </SharedText>
    </View>
  );
}

export { SharedAvatar };
