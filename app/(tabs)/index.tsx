import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme';
import { BottomNav } from '@/components/navigation/BottomNav';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { HeroSlider } from '@/features/home/components/HeroSlider';
import { FloatingSearchBar } from '@/components/ui/FloatingSearchBar';
import { QuickStartCategories } from '@/features/home/components/QuickStartCategories';
import { FeaturedToursSection } from '@/features/home/components/FeaturedToursSection';
import { ErrorState } from '@/components/layout/ErrorState';
import { OfflineState } from '@/components/layout/OfflineState';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { trackScreen } from '@/utils/analytics';
import {
  useGetNextAdventuresQuery,
  useGetPopularRoutesQuery,
} from '@/services/api';

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { isOnline } = useNetworkStatus();

  // Track screen view
  useEffect(() => {
    trackScreen('Home');
  }, []);

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
  const isLoading = adventuresLoading || routesLoading;

  // Debug logging
  useEffect(() => {
    console.log('Next Adventures:', nextAdventures);
    console.log('Popular Routes:', popularRoutes);
    console.log('Adventures Error:', adventuresError);
    console.log('Routes Error:', routesError);
  }, [nextAdventures, popularRoutes, adventuresError, routesError]);

  const handleTourPress = (tourId: string) => {
    router.push(`/tour-detail?id=${tourId}`);
  };

  const handleHeroPress = (id: string) => {
    router.push(`/tour-detail?id=${id}`);
  };

  // Use Next Adventures from Supabase for hero slider
  const heroSlides = React.useMemo(() => {
    if (!nextAdventures) return [];
    return nextAdventures.map((adventure) => ({
      id: adventure.id,
      title: adventure.title,
      description: adventure.description || '',
      imageUrl: adventure.imageUrl || '',
      badge: adventure.badge || 'Featured',
    }));
  }, [nextAdventures]);

  // Fallback tours for Featured section
  const featuredTours = React.useMemo(() => {
    if (!popularRoutes || !Array.isArray(popularRoutes)) return [];

    const safeTours = popularRoutes.slice(0, 4);
    return safeTours.map((route) => ({
      id: route.id,
      title: route.name,
      imageUrl: route.imageUrl,
      rating: route.rating,
      duration: `${route.duration}m`,
      distance: `${route.distance} km`,
    }));
  }, [popularRoutes]);

  const handleCategoryPress = (categoryId: string) => {
    console.log('Category pressed:', categoryId);
    // TODO: Navigate to category filtered tours
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
      gap: theme.spacing.xl,
    },
    searchContainer: {
      paddingHorizontal: theme.spacing.md,
      marginTop: -theme.spacing.lg,
      zIndex: 10,
    },
  });

  // Show offline state if no internet
  if (!isOnline) {
    return (
      <View style={styles.container}>
        <OfflineState onRetry={handleRetry} />
        <BottomNav />
      </View>
    );
  }

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
          userName="Alex"
          hasNotification
          onProfilePress={() => router.push('/(tabs)/profile')}
          onSettingsPress={() => router.push('/(tabs)/settings')}
        />

        {heroSlides.length > 0 && (
          <HeroSlider slides={heroSlides} onSlidePress={handleHeroPress} />
        )}

        <View style={styles.searchContainer}>
          <FloatingSearchBar
            placeholder="Where do you want to go?"
            onFilterPress={() => console.log('Filter pressed')}
          />
        </View>

        <QuickStartCategories onCategoryPress={handleCategoryPress} />

        {featuredTours.length > 0 && (
          <FeaturedToursSection
            tours={featuredTours}
            onTourPress={handleTourPress}
          />
        )}
      </ScrollView>
      <BottomNav />
    </View>
  );
}
