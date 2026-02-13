import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface RouteProgressBarProps {
  tourName: string;
  currentStop: number;
  totalStops: number;
  progressPercentage: number;
}

export const RouteProgressBar = ({
  tourName,
  currentStop,
  totalStops,
  progressPercentage,
}: RouteProgressBarProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          variant="bodyMMid"
          style={{ color: theme.colors.text }}
          numberOfLines={1}
        >
          {tourName}
        </Text>
        <Text variant="bodySMid" style={{ color: theme.colors.primary }}>
          {progressPercentage}%
        </Text>
      </View>
      <ProgressBar progress={progressPercentage} height={6} />
      <Text
        variant="bodyXsRegular"
        style={{ color: theme.colors.textSecondary }}
      >
        Stop {currentStop} of {totalStops}
      </Text>
    </View>
  );
};
