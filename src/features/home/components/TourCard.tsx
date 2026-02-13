import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import { LocationBadge } from '@/components/ui/LocationBadge';
import { RatingBadge } from '@/components/ui/RatingBadge';
import { Button } from '@/components/ui/Button';
import { NextAdventure } from '../types/home.types';

interface TourCardProps {
  tour: NextAdventure;
  onPress?: () => void;
  onStartPress?: () => void;
}

export const TourCard = ({ tour, onPress, onStartPress }: TourCardProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.surfaceElevated,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.card,
    },
    imageContainer: {
      width: '100%',
      height: 200,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    badgeContainer: {
      position: 'absolute',
      top: theme.spacing.sm,
      right: theme.spacing.sm,
    },
    content: {
      padding: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    header: {
      gap: theme.spacing.xs,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    },
    stat: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    divider: {
      width: 1,
      height: 12,
      backgroundColor: theme.colors.border,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: tour.imageUrl }} style={styles.image} />
        {tour.badge && (
          <View style={styles.badgeContainer}>
            <Badge variant={tour.badge} size="small">
              {tour.badge === 'recommended'
                ? 'Recommended'
                : tour.badge === 'new'
                  ? 'New'
                  : 'Popular'}
            </Badge>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="bodyXlSemi" style={{ color: theme.colors.text }}>
            {tour.title}
          </Text>

          <View style={styles.locationRow}>
            <LocationBadge location={tour.location} />
            <RatingBadge rating={tour.rating} />
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text
              variant="bodySRegular"
              style={{ color: theme.colors.textSecondary }}
            >
              ⏱️ {tour.duration}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text
              variant="bodySRegular"
              style={{ color: theme.colors.textSecondary }}
            >
              📍 {tour.distance}
            </Text>
          </View>
          {tour.calories && (
            <>
              <View style={styles.divider} />
              <View style={styles.stat}>
                <Text
                  variant="bodySRegular"
                  style={{ color: theme.colors.textSecondary }}
                >
                  🔥 {tour.calories}
                </Text>
              </View>
            </>
          )}
        </View>

        <Button
          variant="primary"
          onPress={(e) => {
            e?.stopPropagation();
            onStartPress?.();
          }}
        >
          Start Tour
        </Button>
      </View>
    </TouchableOpacity>
  );
};
