import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme';
import { useAppSelector } from '@/hooks/redux';
import { selectFavoriteTours } from '@/store/slices/favoritesSlice';
import { useGetNextAdventuresQuery } from '@/services/api';
import { PopularTourCard } from '@/features/home/components/PopularTourCard';
import { EmptyState } from '@/components/layout/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { Ionicons } from '@expo/vector-icons';

export const SavedToursList = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const favoriteTourIds = useAppSelector(selectFavoriteTours);

  // Fetch all tours (in real app, would fetch only favorites)
  const { data: allTours, isLoading } = useGetNextAdventuresQuery();

  const savedTours = allTours?.filter((tour) =>
    favoriteTourIds.includes(tour.id)
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    list: {
      padding: theme.spacing.md,
    },
    loadingContainer: {
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            width="100%"
            height={120}
            borderRadius={theme.radius.lg}
          />
        ))}
      </View>
    );
  }

  if (!savedTours || savedTours.length === 0) {
    return (
      <EmptyState
        icon={
          <Ionicons
            name="heart-outline"
            size={48}
            color={theme.colors.textSecondary}
          />
        }
        title="No Saved Tours"
        description="Tours you favorite will appear here. Start exploring to find your next adventure!"
        actionLabel="Explore Tours"
        onAction={() => router.push('/(tabs)/')}
      />
    );
  }

  return (
    <FlatList
      data={savedTours}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ marginBottom: theme.spacing.md }}>
          <PopularTourCard
            tour={{
              id: item.id,
              title: item.title,
              description: item.description,
              imageUrl: item.imageUrl,
              badge: item.badge,
              rating: item.rating,
              price: item.price,
              travelerCount: 1000, // Mock value
              travelerAvatars: ['https://i.pravatar.cc/150?img=1'],
            }}
            onPress={() => router.push(`/tour-detail?id=${item.id}`)}
          />
        </View>
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};
