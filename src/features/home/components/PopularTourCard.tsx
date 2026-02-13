import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import { RatingBadge } from '@/components/ui/RatingBadge';
import { PriceTag } from '@/components/ui/PriceTag';
import { AvatarStack } from '@/components/ui/AvatarStack';
import { PopularRoute } from '../../tours/types/tour.types';

interface PopularTourCardProps {
  tour: PopularRoute;
  onPress?: () => void;
}

export const PopularTourCard = ({ tour, onPress }: PopularTourCardProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: theme.radius.lg,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.md,
      marginBottom: theme.spacing.md,
    },
    imageContainer: {
      width: 120,
      height: 120,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    badgeContainer: {
      position: 'absolute',
      top: theme.spacing.xs,
      left: theme.spacing.xs,
    },
    content: {
      flex: 1,
      padding: theme.spacing.md,
      gap: theme.spacing.xs,
    },
    header: {
      gap: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'auto',
    },
    travelerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
  });

  const getBadgeLabel = (badge: string) => {
    switch (badge) {
      case 'nightTour':
        return 'Night Tour';
      case 'heritage':
        return 'Heritage';
      case 'popular':
        return 'Popular';
      case 'new':
        return 'New';
      default:
        return badge;
    }
  };

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
              {getBadgeLabel(tour.badge)}
            </Badge>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            variant="bodyLMid"
            style={{ color: theme.colors.text }}
            numberOfLines={2}
          >
            {tour.title}
          </Text>
          <Text
            variant="bodySRegular"
            style={{ color: theme.colors.textSecondary }}
            numberOfLines={2}
          >
            {tour.description}
          </Text>
        </View>

        <View style={styles.row}>
          <RatingBadge rating={tour.rating} size="small" />
          <PriceTag price={tour.price} size="small" variant="primary" />
        </View>

        <View style={styles.footer}>
          <View style={styles.travelerInfo}>
            <AvatarStack avatars={tour.travelerAvatars} size="small" />
            <Text
              variant="bodyXsRegular"
              style={{ color: theme.colors.textSecondary }}
            >
              {tour.travelerCount.toLocaleString()}+ travelers
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
