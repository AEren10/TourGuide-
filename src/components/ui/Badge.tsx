import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export type BadgeVariant =
  | 'recommended'
  | 'new'
  | 'nightTour'
  | 'heritage'
  | 'popular'
  | 'default';

interface BadgeProps extends Omit<ViewProps, 'children'> {
  variant?: BadgeVariant;
  children: string;
  size?: 'small' | 'medium';
}

export const Badge = ({
  variant = 'default',
  children,
  size = 'medium',
  style,
  ...props
}: BadgeProps) => {
  const { theme } = useTheme();

  const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
    recommended: {
      bg: theme.colors.badgeRecommended,
      text: '#FFFFFF',
    },
    new: {
      bg: theme.colors.badgeNew,
      text: '#FFFFFF',
    },
    nightTour: {
      bg: theme.colors.badgeNightTour,
      text: '#FFFFFF',
    },
    heritage: {
      bg: theme.colors.badgeHeritage,
      text: '#FFFFFF',
    },
    popular: {
      bg: theme.colors.badgePopular,
      text: '#FFFFFF',
    },
    default: {
      bg: theme.colors.surface,
      text: theme.colors.text,
    },
  };

  const colors = variantColors[variant];

  const styles = StyleSheet.create({
    badge: {
      paddingHorizontal: size === 'small' ? theme.spacing.xs : theme.spacing.sm,
      paddingVertical: size === 'small' ? 2 : 4,
      borderRadius: theme.radius.xs,
      backgroundColor: colors.bg,
      alignSelf: 'flex-start',
    },
  });

  return (
    <View style={[styles.badge, style]} {...props}>
      <Text
        variant={size === 'small' ? 'bodyXsMid' : 'bodySMid'}
        style={{ color: colors.text }}
      >
        {children}
      </Text>
    </View>
  );
};
