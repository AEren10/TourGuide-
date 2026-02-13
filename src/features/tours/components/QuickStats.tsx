import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';

interface Stat {
  icon: string;
  label: string;
  value: string;
}

interface QuickStatsProps {
  duration: string;
  distance: string;
  stopCount: number;
}

export const QuickStats = ({
  duration,
  distance,
  stopCount,
}: QuickStatsProps) => {
  const { theme } = useTheme();

  const stats: Stat[] = [
    { icon: '⏱️', label: 'Duration', value: duration },
    { icon: '📍', label: 'Distance', value: distance },
    { icon: '🗺️', label: 'Stops', value: `${stopCount}` },
  ];

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.sm,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    divider: {
      width: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: theme.spacing.sm,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: 24,
    },
  });

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          <View style={styles.statItem}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{stat.icon}</Text>
            </View>
            <Text
              variant="bodyMMid"
              style={{ color: theme.colors.text, textAlign: 'center' }}
            >
              {stat.value}
            </Text>
            <Text
              variant="bodyXsRegular"
              style={{ color: theme.colors.textSecondary, textAlign: 'center' }}
            >
              {stat.label}
            </Text>
          </View>
          {index < stats.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
};
