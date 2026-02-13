import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/theme';

interface ProgressBarProps extends ViewProps {
  progress: number; // 0-100
  height?: number;
  color?: string;
  backgroundColor?: string;
}

export const ProgressBar = ({
  progress,
  height = 4,
  color,
  backgroundColor,
  style,
  ...props
}: ProgressBarProps) => {
  const { theme } = useTheme();

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  const styles = StyleSheet.create({
    container: {
      height,
      backgroundColor: backgroundColor || theme.colors.surface,
      borderRadius: height / 2,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      backgroundColor: color || theme.colors.primary,
      borderRadius: height / 2,
      width: `${clampedProgress}%`,
    },
  });

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.fill} />
    </View>
  );
};
