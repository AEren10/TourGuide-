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
  description?: string;
}

export const TourInfoCard = ({
  title,
  location,
  badge,
  description,
}: TourInfoCardProps) => {
  const { theme } = useTheme();

  const normalizeBadgeVariant = (badgeText?: string): BadgeType => {
    if (!badgeText) return 'default';

    const normalized = badgeText.toLowerCase().replace(/\s+/g, '');

    if (normalized.includes('recommend') || normalized.includes('dailypick'))
      return 'recommended';
    if (normalized.includes('new')) return 'new';
    if (normalized.includes('night')) return 'nightTour';
    if (normalized.includes('heritage')) return 'heritage';
    if (normalized.includes('popular') || normalized.includes('trending'))
      return 'popular';

    return 'default';
  };

  const getBadgeLabel = (badgeType?: BadgeType | string) => {
    if (!badgeType) return '';

    const variant =
      typeof badgeType === 'string'
        ? normalizeBadgeVariant(badgeType)
        : badgeType;

    switch (variant) {
      case 'recommended':
        return typeof badgeType === 'string' ? badgeType : 'Recommended';
      case 'new':
        return 'New';
      case 'nightTour':
        return 'Night Tour';
      case 'heritage':
        return 'Heritage';
      case 'popular':
        return typeof badgeType === 'string' ? badgeType : 'Popular';
      default:
        return typeof badgeType === 'string' ? badgeType : 'Featured';
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
        {description ? (
          <Text
            variant="bodySRegular"
            style={{ color: theme.colors.textSecondary, lineHeight: 20 }}
            numberOfLines={3}
          >
            {description}
          </Text>
        ) : null}
        <View style={styles.row}>
          <LocationBadge location={location} />
          {badge && (
            <Badge variant={normalizeBadgeVariant(badge as string)}>
              {getBadgeLabel(badge)}
            </Badge>
          )}
        </View>
      </View>
    </View>
  );
};
