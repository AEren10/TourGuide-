import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import { LocationBadge } from '@/components/ui/LocationBadge';
import { BadgeType } from '../types/tour.types';

interface TourInfoCardProps {
  title: string;
  location: string;
  badge?: BadgeType;
}

export const TourInfoCard = ({ title, location, badge }: TourInfoCardProps) => {
  const { theme } = useTheme();

  const getBadgeLabel = (badgeType: BadgeType) => {
    switch (badgeType) {
      case 'recommended':
        return 'Recommended';
      case 'new':
        return 'New';
      case 'nightTour':
        return 'Night Tour';
      case 'heritage':
        return 'Heritage';
      case 'popular':
        return 'Popular';
      default:
        return badgeType;
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      marginTop: -theme.spacing.xl, // Overlap with hero image
      marginHorizontal: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.md,
      gap: theme.spacing.sm,
    },
    header: {
      gap: theme.spacing.xs,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      flexWrap: 'wrap',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h4Medium" style={{ color: theme.colors.text }}>
          {title}
        </Text>
        <View style={styles.row}>
          <LocationBadge location={location} />
          {badge && <Badge variant={badge}>{getBadgeLabel(badge)}</Badge>}
        </View>
      </View>
    </View>
  );
};
