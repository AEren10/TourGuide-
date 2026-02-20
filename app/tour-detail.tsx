import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { useGetTourDetailsQuery } from '@/services/api';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import {
  selectIsTourFavorite,
  toggleTourFavorite,
} from '@/store/slices/favoritesSlice';
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { IconButton } from '@/components/ui/IconButton';
import { StickyFooterButton } from '@/components/layout/StickyFooterButton';
import { ErrorState } from '@/components/layout/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { TourInfoCard } from '@/features/tours/components/TourInfoCard';
import { QuickStats } from '@/features/tours/components/QuickStats';
import { RouteItinerary } from '@/features/tours/components/RouteItinerary';

export default function TourDetailScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: tour,
    isLoading,
    error,
    refetch,
  } = useGetTourDetailsQuery(id || '');
  const isFavorite = useAppSelector((state) =>
    selectIsTourFavorite(state, id || '')
  );
  const { user } = useAuth();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const handleStartNavigation = () => {
    router.push(`/active-route-map?id=${id}`);
  };

  const handleShare = async () => {
    if (!tour) return;
    await Share.share({
      title: tour.title,
      message: `${tour.title}\n\n${tour.description ?? ''}\n\nTourGuide uygulamasıyla keşfet!`,
    });
  };

  const handleStopPress = (stopId: string) => {
    router.push(`/stop-detail?id=${stopId}`);
  };

  const handleToggleFavorite = async () => {
    if (!id) return;

    // Giriş yapılmamışsa auth'a yönlendir
    if (!user) {
      router.push('/auth');
      return;
    }

    // Redux'u optimistik güncelle
    dispatch(toggleTourFavorite(id));

    // Supabase'e yaz
    try {
      if (isFavorite) {
        await removeFavorite(id).unwrap();
      } else {
        await addFavorite(id).unwrap();
      }
    } catch {
      // Hata olursa Redux'u geri al
      dispatch(toggleTourFavorite(id));
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    heroContainer: {
      position: 'relative',
    },
    topNav: {
      position: 'absolute',
      top: 40,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
      zIndex: 10,
    },
    topNavRight: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    scrollContent: {
      paddingBottom: 100,
      gap: theme.spacing.lg,
    },
    section: {
      paddingHorizontal: theme.spacing.md,
    },
    loadingContainer: {
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },
  });

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorState
          title="Tour not found"
          message="We couldn't load this tour. Please try again."
          onRetry={() => refetch()}
        />
      </View>
    );
  }

  if (isLoading || !tour) {
    return (
      <View style={styles.container}>
        <View style={styles.heroContainer}>
          <Skeleton width="100%" height={300} borderRadius={0} />
          <View style={styles.topNav}>
            <Skeleton width={44} height={44} variant="circle" />
            <View style={styles.topNavRight}>
              <Skeleton width={44} height={44} variant="circle" />
              <Skeleton width={44} height={44} variant="circle" />
            </View>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <Skeleton width="100%" height={120} />
          <Skeleton width="100%" height={100} />
          <Skeleton width="100%" height={200} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroContainer}>
          <ImageCarousel
            images={tour.imageUrl ? [tour.imageUrl] : []}
            height={300}
            showPagination
          />

          <View style={styles.topNav}>
            <IconButton
              icon={<Ionicons name="arrow-back" size={24} color="#000" />}
              variant="glass"
              onPress={() => router.back()}
            />
            <View style={styles.topNavRight}>
              <IconButton
                icon={<Ionicons name="share-outline" size={24} color="#000" />}
                variant="glass"
                onPress={handleShare}
              />
              <IconButton
                icon={
                  <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={24}
                    color={isFavorite ? '#FF3B5C' : '#000'}
                  />
                }
                variant="glass"
                onPress={handleToggleFavorite}
                style={
                  isFavorite
                    ? { backgroundColor: 'rgba(255,59,92,0.18)' }
                    : undefined
                }
              />
            </View>
          </View>
        </View>

        <TourInfoCard
          title={tour.title}
          location={(tour as any).location || (tour as any).category || ''}
          badge={tour.badge}
          description={tour.description ?? undefined}
        />

        <View style={styles.section}>
          <QuickStats
            duration={tour.duration ? String(tour.duration) : '—'}
            distance={tour.distance ? `${tour.distance} km` : '—'}
            stopCount={tour.stops?.length ?? 0}
          />
        </View>

        <RouteItinerary
          stops={tour.stops || []}
          onStopPress={handleStopPress}
        />
      </ScrollView>

      <StickyFooterButton
        title="Start Navigation"
        onPress={handleStartNavigation}
      />
    </View>
  );
}
