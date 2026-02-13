import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import { RatingBadge } from '@/components/ui/RatingBadge';
import { StopCategory, StopStatus } from '../types/stop.types';

interface StopInfoCardProps {
  title: string;
  category: StopCategory;
  rating: number;
  reviewCount: number;
  status: StopStatus;
  statusMessage?: string;
}

export const StopInfoCard = ({
  title,
  category,
  rating,
  reviewCount,
  status,
  statusMessage,
}: StopInfoCardProps) => {
  const { theme } = useTheme();

  const getCategoryLabel = (cat: StopCategory) => {
    const labels: Record<StopCategory, string> = {
      landmark: 'Landmark',
      museum: 'Museum',
      park: 'Park',
      restaurant: 'Restaurant',
      viewpoint: 'Viewpoint',
      historical: 'Historical',
      cultural: 'Cultural',
    };
    return labels[cat];
  };

  const getStatusColor = (stat: StopStatus) => {
    switch (stat) {
      case 'open':
        return theme.colors.success;
      case 'closed':
        return theme.colors.error;
      case 'closing-soon':
        return theme.colors.warning;
      default:
        return theme.colors.textSecondary;
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      marginTop: -theme.spacing.xl,
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
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginLeft: 'auto',
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h4Medium" style={{ color: theme.colors.text }}>
          {title}
        </Text>

        <View style={styles.row}>
          <Badge variant="default" size="small">
            {getCategoryLabel(category)}
          </Badge>
          <RatingBadge rating={rating} />
          <Text
            variant="bodyXsRegular"
            style={{ color: theme.colors.textSecondary }}
          >
            ({reviewCount.toLocaleString()} reviews)
          </Text>

          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(status) },
              ]}
            />
            <Text
              variant="bodyXsMid"
              style={{
                color: getStatusColor(status),
                textTransform: 'capitalize',
              }}
            >
              {statusMessage || status.replace('-', ' ')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
