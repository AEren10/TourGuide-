import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { TourCarousel } from './TourCarousel';
import { NextAdventure } from '../types/home.types';
import { Skeleton } from '@/components/ui/Skeleton';

interface AdventureSectionProps {
  tours: NextAdventure[];
  loading?: boolean;
  onTourPress?: (tourId: string) => void;
  onStartPress?: (tourId: string) => void;
  onSeeAllPress?: () => void;
}

export const AdventureSection = ({
  tours,
  loading = false,
  onTourPress,
  onStartPress,
  onSeeAllPress,
}: AdventureSectionProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing.md,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
    },
    skeletonContainer: {
      paddingHorizontal: theme.spacing.md,
    },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Skeleton width={200} height={24} />
          <Skeleton width={60} height={20} />
        </View>
        <View style={styles.skeletonContainer}>
          <Skeleton width="100%" height={340} borderRadius={theme.radius.lg} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h4Medium" style={{ color: theme.colors.text }}>
          Your Next Adventure
        </Text>
        {onSeeAllPress && (
          <TouchableOpacity onPress={onSeeAllPress} activeOpacity={0.7}>
            <Text variant="bodySMid" style={{ color: theme.colors.primary }}>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <TourCarousel
        tours={tours}
        onTourPress={onTourPress}
        onStartPress={onStartPress}
      />
    </View>
  );
};
