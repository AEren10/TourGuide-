import React, { ReactNode } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';

interface CardProps extends ViewProps {
  children: ReactNode;
  elevated?: boolean;
}

export const Card = ({
  children,
  elevated = false,
  style,
  ...props
}: CardProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: elevated
        ? theme.colors.surfaceElevated
        : theme.colors.surface,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      borderWidth: elevated ? 0 : 1,
      borderColor: theme.colors.border,
    },
  });

  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};
