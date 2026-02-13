import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/theme';

interface DividerProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
  spacing?: number;
  color?: string;
  thickness?: number;
}

export const Divider = ({
  orientation = 'horizontal',
  spacing = 0,
  color,
  thickness = 1,
  style,
  ...props
}: DividerProps) => {
  const { theme } = useTheme();

  const isHorizontal = orientation === 'horizontal';

  const styles = StyleSheet.create({
    divider: {
      backgroundColor: color || theme.colors.border,
      ...(isHorizontal
        ? {
            height: thickness,
            width: '100%',
            marginVertical: spacing,
          }
        : {
            width: thickness,
            height: '100%',
            marginHorizontal: spacing,
          }),
    },
  });

  return <View style={[styles.divider, style]} {...props} />;
};
