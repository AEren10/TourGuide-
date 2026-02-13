import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { PopularTourCard } from './PopularTourCard';
import { PopularRoute } from '../../tours/types/tour.types';
import { Skeleton } from '@/components/ui/Skeleton';

interface PopularRoutesSectionProps {
  routes: PopularRoute[];
  loading?: boolean;
  onRoutePress?: (routeId: string) => void;
}

export const PopularRoutesSection = ({
  routes,
  loading = false,
  onRoutePress,
}: PopularRoutesSectionProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    list: {
      gap: theme.spacing.md,
    },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Skeleton width={180} height={24} />
        </View>
        <View style={styles.list}>
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              width="100%"
              height={120}
              borderRadius={theme.radius.lg}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h4Medium" style={{ color: theme.colors.text }}>
          Popular Routes
        </Text>
      </View>

      <View style={styles.list}>
        {routes.map((route) => (
          <PopularTourCard
            key={route.id}
            tour={route}
            onPress={() => onRoutePress?.(route.id)}
          />
        ))}
      </View>
    </View>
  );
};
