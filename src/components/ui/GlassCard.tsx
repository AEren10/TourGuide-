import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { BlurView } from 'expo-blur';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  variant?: 'light' | 'dark' | 'primary';
}

export const GlassCard = ({
  children,
  style,
  intensity = 20,
  variant = 'dark',
}: GlassCardProps) => {
  const { theme, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    },
    content: {
      backgroundColor:
        variant === 'primary'
          ? 'rgba(238, 140, 43, 0.1)'
          : isDark
            ? 'rgba(47, 34, 25, 0.6)'
            : 'rgba(255, 255, 255, 0.7)',
    },
  });

  return (
    <View style={[styles.container, style]}>
      <BlurView
        intensity={intensity}
        tint={isDark ? 'dark' : 'light'}
        style={styles.content}
      >
        {children}
      </BlurView>
    </View>
  );
};
