import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import {
  useGetStopDetailsQuery,
  useGetTravelerInsightsQuery,
} from '@/services/api';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import {
  selectIsStopFavorite,
  toggleStopFavorite,
} from '@/store/slices/favoritesSlice';
import { IconButton } from '@/components/ui/IconButton';
import { Text } from '@/components/ui/Text';
import { PriceTag } from '@/components/ui/PriceTag';
import { StickyFooterButton } from '@/components/layout/StickyFooterButton';
import { ErrorState } from '@/components/layout/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { Divider } from '@/components/ui/Divider';
import { StopDetailHero } from '@/features/stops/components/StopDetailHero';
import { StopInfoCard } from '@/features/stops/components/StopInfoCard';
import { StopQuickStats } from '@/features/stops/components/StopQuickStats';
import { QuickActionsBar } from '@/features/stops/components/QuickActionsBar';
import { InsightsCarousel } from '@/features/stops/components/InsightsCarousel';
import { MapPreview } from '@/features/stops/components/MapPreview';

export default function StopDetailScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: stop,
    isLoading: stopLoading,
    error: stopError,
    refetch: refetchStop,
  } = useGetStopDetailsQuery(id || '');

  const { data: insights, isLoading: insightsLoading } =
    useGetTravelerInsightsQuery(id || '');

  const isFavorite = useAppSelector((state) =>
    selectIsStopFavorite(state, id || '')
  );

  // Debug
  React.useEffect(() => {
    console.log('🔷 Stop Detail - ID:', id);
    console.log('🔷 Stop Data:', stop);
    console.log('🔷 Stop Coordinates:', stop?.coordinates);
    console.log('🔷 Stop Error:', stopError);
  }, [id, stop, stopError]);

  const handleToggleFavorite = () => {
    if (id) {
      dispatch(toggleStopFavorite(id));
    }
  };

  const handleStartTour = () => {
    // Navigate to tour detail page
    if (stop?.tourId) {
      router.push(`/tour-detail?id=${stop.tourId}`);
    } else {
      Alert.alert('Error', 'Tour information not available');
    }
  };

  const handleCheckIn = () => {
    Alert.alert('Check-in', 'Check-in feature coming soon!');
  };

  const handleAudio = () => {
    Alert.alert('Audio Guide', 'Audio guide feature coming soon!');
  };

  const handleReview = () => {
    Alert.alert('Write Review', 'Review feature coming soon!');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share feature coming soon!');
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
      gap: theme.spacing.sm,
    },
    descriptionSection: {
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    loadingContainer: {
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },
    footerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
    },
  });

  if (stopError) {
    return (
      <View style={styles.container}>
        <ErrorState
          title="Stop not found"
          message="We couldn't load this stop details. Please try again."
          onRetry={() => refetchStop()}
        />
      </View>
    );
  }

  if (stopLoading || !stop) {
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

  // Check if images exist
  const hasImages = stop.images && stop.images.length > 0;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hasImages && (
          <View style={styles.heroContainer}>
            <StopDetailHero images={stop.images} />

            <View style={styles.topNav}>
              <IconButton
                icon={<Ionicons name="arrow-back" size={24} color="#000" />}
                variant="glass"
                onPress={() => router.back()}
              />
              <View style={styles.topNavRight}>
                <IconButton
                  icon={
                    <Ionicons name="share-outline" size={24} color="#000" />
                  }
                  variant="glass"
                  onPress={handleShare}
                />
                <IconButton
                  icon={
                    <Ionicons
                      name={isFavorite ? 'heart' : 'heart-outline'}
                      size={24}
                      color={isFavorite ? theme.colors.error : '#000'}
                    />
                  }
                  variant="glass"
                  onPress={handleToggleFavorite}
                />
              </View>
            </View>
          </View>
        )}

        {!hasImages && (
          <View
            style={[
              styles.topNav,
              { position: 'relative', paddingTop: theme.spacing.xl },
            ]}
          >
            <IconButton
              icon={
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={theme.colors.text}
                />
              }
              variant="ghost"
              onPress={() => router.back()}
            />
            <View style={styles.topNavRight}>
              <IconButton
                icon={
                  <Ionicons
                    name="share-outline"
                    size={24}
                    color={theme.colors.text}
                  />
                }
                variant="ghost"
                onPress={handleShare}
              />
              <IconButton
                icon={
                  <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={24}
                    color={isFavorite ? theme.colors.error : theme.colors.text}
                  />
                }
                variant="ghost"
                onPress={handleToggleFavorite}
              />
            </View>
          </View>
        )}

        <StopInfoCard
          title={stop.title || stop.name}
          category={stop.category}
          rating={stop.rating}
          reviewCount={stop.reviewCount}
          status={stop.status}
          statusMessage={stop.statusMessage}
          hasHeroImage={hasImages}
        />

        <View style={styles.section}>
          <QuickActionsBar
            onCheckIn={handleCheckIn}
            onAudio={handleAudio}
            onReview={handleReview}
            onShare={handleShare}
          />
        </View>

        <View style={styles.section}>
          <StopQuickStats
            duration={stop.duration}
            distance={stop.distance}
            audioGuide={stop.audioGuide}
          />
        </View>

        <View style={styles.descriptionSection}>
          <Text variant="bodyXlSemi" style={{ color: theme.colors.text }}>
            About
          </Text>
          <Text
            variant="bodyMRegular"
            style={{ color: theme.colors.text, lineHeight: 24 }}
          >
            {stop.description}
          </Text>

          {stop.highlights && stop.highlights.length > 0 && (
            <>
              <Divider spacing={theme.spacing.sm} />
              <Text variant="bodyLMid" style={{ color: theme.colors.text }}>
                Highlights
              </Text>
              {stop.highlights.map((highlight, index) => (
                <View
                  key={index}
                  style={{ flexDirection: 'row', gap: theme.spacing.sm }}
                >
                  <Text style={{ color: theme.colors.primary }}>•</Text>
                  <Text
                    variant="bodyMRegular"
                    style={{ color: theme.colors.text, flex: 1 }}
                  >
                    {highlight}
                  </Text>
                </View>
              ))}
            </>
          )}
        </View>

        <InsightsCarousel insights={insights || []} loading={insightsLoading} />

        <MapPreview
          latitude={stop.coordinates?.latitude || 0}
          longitude={stop.coordinates?.longitude || 0}
          address={stop.description || ''}
          title={stop.title || stop.name}
        />
      </ScrollView>

      <StickyFooterButton title="Start Tour" onPress={handleStartTour} />
    </View>
  );
}
