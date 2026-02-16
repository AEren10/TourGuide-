import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

type PermissionStatus = 'granted' | 'denied' | 'undetermined';

export const useLocationPermission = () => {
  const [foregroundStatus, setForegroundStatus] =
    useState<PermissionStatus>('undetermined');
  const [backgroundStatus, setBackgroundStatus] =
    useState<PermissionStatus>('undetermined');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const foreground = await Location.getForegroundPermissionsAsync();
      setForegroundStatus(foreground.status);

      const background = await Location.getBackgroundPermissionsAsync();
      setBackgroundStatus(background.status);
    } catch (error) {
      console.error('Error checking location permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestForegroundPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setForegroundStatus(status);

      if (status === 'denied') {
        Alert.alert(
          'Location Permission Required',
          'TourGuide needs your location to show nearby tours and provide navigation. Please enable location access in Settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => Location.enableNetworkProviderAsync(),
            },
          ]
        );
      }

      return status === 'granted';
    } catch (error) {
      console.error('Error requesting foreground permission:', error);
      return false;
    }
  };

  const requestBackgroundPermission = async (): Promise<boolean> => {
    try {
      // First ensure foreground permission is granted
      if (foregroundStatus !== 'granted') {
        const foregroundGranted = await requestForegroundPermission();
        if (!foregroundGranted) return false;
      }

      // Show explanation before requesting background permission
      Alert.alert(
        'Background Location',
        'To provide navigation even when the app is in the background, TourGuide needs background location access. This helps notify you when approaching tour stops.',
        [
          { text: 'Not Now', style: 'cancel' },
          {
            text: 'Allow',
            onPress: async () => {
              const { status } =
                await Location.requestBackgroundPermissionsAsync();
              setBackgroundStatus(status);
              return status === 'granted';
            },
          },
        ]
      );

      return false; // Will be updated after user decision
    } catch (error) {
      console.error('Error requesting background permission:', error);
      return false;
    }
  };

  return {
    foregroundStatus,
    backgroundStatus,
    isLoading,
    requestForegroundPermission,
    requestBackgroundPermission,
    checkPermissions,
  };
};
