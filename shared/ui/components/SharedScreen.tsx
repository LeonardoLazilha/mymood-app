import { colors } from '@/shared/constants/colors';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface SharedScreenProps {
  children?: React.ReactNode;
  scrollable?: boolean;
  scrollProps?: ScrollViewProps;
  style?: StyleProp<ViewStyle>;
}

export default function SharedScreen({
  scrollable = true,
  scrollProps,
  children,
  style,
}: SharedScreenProps) {
  const safeAreaStyle: StyleProp<ViewStyle> = [
    {
      flex: 1,
      backgroundColor: colors.background,
    },
    style,
  ];

  if (scrollable) {
    return (
      <SafeAreaView style={safeAreaStyle}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          {...scrollProps}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={safeAreaStyle}>
      {children}
    </SafeAreaView>
  );
}

export { SharedScreen };
