import React, { ReactNode } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';

interface ScreenProps extends ViewProps {
  children: ReactNode;
  withPadding?: boolean;
}

export const Screen = ({
  children,
  withPadding = true,
  style,
  ...props
}: ScreenProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: withPadding ? theme.spacing.md : 0,
    },
  });

  return (
    <SafeAreaView style={styles.container} {...props}>
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
};
