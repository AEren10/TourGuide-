import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme';
import { SearchBar } from '@/components/ui/SearchBar';
import { BottomNav } from '@/components/navigation/BottomNav';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { AdventureSection } from '@/features/home/components/AdventureSection';
import { PopularRoutesSection } from '@/features/home/components/PopularRoutesSection';
import { ErrorState } from '@/components/layout/ErrorState';
import {
  useGetNextAdventuresQuery,
  useGetPopularRoutesQuery,
} from '@/services/api';

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  // Fetch data using RTK Query
  const {
    data: nextAdventures,
    isLoading: adventuresLoading,
    error: adventuresError,
    refetch: refetchAdventures,
  } = useGetNextAdventuresQuery();

  const {
    data: popularRoutes,
    isLoading: routesLoading,
    error: routesError,
    refetch: refetchRoutes,
  } = useGetPopularRoutesQuery();

  const hasError = adventuresError || routesError;

  const handleTourPress = (tourId: string) => {
    router.push(`/tour-detail?id=${tourId}`);
  };

  const handleStartPress = (tourId: string) => {
    router.push(`/active-route-map?id=${tourId}`);
  };

  const handleRetry = () => {
    refetchAdventures();
    refetchRoutes();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      paddingBottom: 100,
      gap: theme.spacing.lg,
    },
    searchContainer: {
      paddingHorizontal: theme.spacing.md,
    },
  });

  // Show error state if any API fails
  if (hasError) {
    return (
      <View style={styles.container}>
        <ErrorState
          title="Failed to load tours"
          message="We couldn't load your tours. Please try again."
          onRetry={handleRetry}
        />
        <BottomNav />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HomeHeader
          userName="Alex Traveler"
          hasNotification
          onProfilePress={() => router.push('/(tabs)/profile')}
        />

        <View style={styles.searchContainer}>
          <SearchBar placeholder="Search tours, destinations..." />
        </View>

        <AdventureSection
          tours={nextAdventures || []}
          loading={adventuresLoading}
          onTourPress={handleTourPress}
          onStartPress={handleStartPress}
        />

        <PopularRoutesSection
          routes={popularRoutes || []}
          loading={routesLoading}
          onRoutePress={handleTourPress}
        />
      </ScrollView>
      <BottomNav />
    </View>
  );
}
