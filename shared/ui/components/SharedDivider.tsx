import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';
import SharedText from './SharedText';

interface SharedDividerProps {
  label?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export default function SharedDivider({
  label,
  height = 1,
  style,
  testID,
}: SharedDividerProps) {
  if (label) {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: spacing.lg,
          },
          style,
        ]}
        testID={testID}
      >
        <View
          style={{
            flex: 1,
            height,
            backgroundColor: colors.border,
          }}
        />
        <SharedText
          variant="caption"
          color="textSecondary"
          style={{ paddingHorizontal: spacing.md }}
        >
          {label}
        </SharedText>
        <View
          style={{
            flex: 1,
            height,
            backgroundColor: colors.border,
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        {
          height,
          backgroundColor: colors.border,
          marginVertical: spacing.lg,
        },
        style,
      ]}
      testID={testID}
    />
  );
}

export { SharedDivider };
