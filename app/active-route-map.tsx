import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useTheme } from '@/theme';
import { useGetRouteNavigationQuery } from '@/services/api';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import {
  startTour,
  endTour,
  selectActiveTour,
} from '@/store/slices/activeTourSlice';
import { ActiveRouteMap } from '@/features/map/components/ActiveRouteMap';
import { RouteProgressBar } from '@/features/map/components/RouteProgressBar';
import { SwipeableStopCards } from '@/features/map/components/SwipeableStopCards';
import { FloatingActions } from '@/features/map/components/FloatingActions';
import { IconButton } from '@/components/ui/IconButton';
import { ErrorState } from '@/components/layout/ErrorState';
import { UserLocation } from '@/features/map/types/map.types';

export default function ActiveRouteMapScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [userLocation, setUserLocation] = useState<UserLocation | undefined>();

  const {
    data: navigation,
    isLoading,
    error,
  } = useGetRouteNavigationQuery(id || '');
  const activeTour = useAppSelector(selectActiveTour);

  // Request location permission and start tracking
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        // Get initial location
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          heading: location.coords.heading || undefined,
          accuracy: location.coords.accuracy || undefined,
          speed: location.coords.speed || undefined,
        });

        // Watch location updates
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (location) => {
            setUserLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              heading: location.coords.heading || undefined,
              accuracy: location.coords.accuracy || undefined,
              speed: location.coords.speed || undefined,
            });
          }
        );
      }
    })();
  }, []);

  // Start tour when component mounts
  useEffect(() => {
    if (id && !activeTour.tourId) {
      dispatch(startTour(id));
    }
  }, [id, dispatch, activeTour.tourId]);

  const handleEndTour = () => {
    Alert.alert(
      'End Tour',
      'Are you sure you want to end this tour?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Tour',
          style: 'destructive',
          onPress: () => {
            dispatch(endTour());
            router.back();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleStopPress = (stopId: string) => {
    router.push(`/stop-detail?id=${stopId}`);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topBar: {
      position: 'absolute',
      top: 40,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.glass,
      gap: theme.spacing.sm,
      ...theme.shadows.glass,
    },
    progressContainer: {
      flex: 1,
    },
    endButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: theme.colors.error,
      borderRadius: theme.radius.sm,
    },
    endButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorState
          title="Failed to load route"
          message="We couldn't load the navigation for this tour."
          onRetry={() => router.back()}
          retryLabel="Go Back"
        />
      </View>
    );
  }

  if (isLoading || !navigation) {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: theme.colors.surface }} />
      </View>
    );
  }

  const currentStopIndex = activeTour.currentStopIndex || 0;
  const progressPercentage = Math.round(
    ((currentStopIndex + 1) / navigation.totalStops) * 100
  );

  return (
    <View style={styles.container}>
      <ActiveRouteMap
        stops={navigation.stops}
        route={navigation.route}
        userLocation={userLocation || navigation.userLocation}
        onStopPress={handleStopPress}
      />

      <View style={styles.topBar}>
        <IconButton
          icon={<Ionicons name="arrow-back" size={24} color="#000" />}
          variant="ghost"
          size="small"
          onPress={() => router.back()}
        />

        <View style={styles.progressContainer}>
          <RouteProgressBar
            tourName={navigation.tourName}
            currentStop={currentStopIndex + 1}
            totalStops={navigation.totalStops}
            progressPercentage={progressPercentage}
          />
        </View>

        <TouchableOpacity style={styles.endButton} onPress={handleEndTour}>
          <Text style={styles.endButtonText}>End</Text>
        </TouchableOpacity>
      </View>

      <FloatingActions
        onCameraPress={() =>
          Alert.alert('Camera', 'Camera feature coming soon!')
        }
        onARPress={() => Alert.alert('AR View', 'AR feature coming soon!')}
      />

      <View style={styles.bottomContainer}>
        <SwipeableStopCards
          stops={navigation.stops}
          currentStopIndex={currentStopIndex}
          onStopPress={handleStopPress}
        />
      </View>
    </View>
  );
}
