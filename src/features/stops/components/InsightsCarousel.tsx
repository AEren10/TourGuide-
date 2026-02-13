import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { TravelerInsightCard } from './TravelerInsightCard';
import { TravelerInsight } from '../types/stop.types';
import { Skeleton } from '@/components/ui/Skeleton';

interface InsightsCarouselProps {
  insights: TravelerInsight[];
  loading?: boolean;
}

export const InsightsCarousel = ({
  insights,
  loading = false,
}: InsightsCarouselProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing.md,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    icon: {
      fontSize: 20,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.md,
    },
    skeletonContainer: {
      paddingHorizontal: theme.spacing.md,
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Skeleton width={30} height={20} />
          <Skeleton width={150} height={24} />
        </View>
        <View style={styles.skeletonContainer}>
          <Skeleton width={300} height={150} borderRadius={theme.radius.lg} />
          <Skeleton width={300} height={150} borderRadius={theme.radius.lg} />
        </View>
      </View>
    );
  }

  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>💡</Text>
        <Text variant="bodyXlSemi" style={{ color: theme.colors.text }}>
          Traveler Insights
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={316}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
      >
        {insights.map((insight) => (
          <TravelerInsightCard key={insight.id} insight={insight} />
        ))}
      </ScrollView>
    </View>
  );
};
