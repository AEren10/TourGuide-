import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { useTheme } from '@/theme';
import { StopLocation, UserLocation, Location } from '../types/map.types';
import { Text } from '@/components/ui/Text';

interface ActiveRouteMapProps {
  stops: StopLocation[];
  route: Location[];
  userLocation?: UserLocation;
  onStopPress?: (stopId: string) => void;
}

export const ActiveRouteMap = ({
  stops,
  route,
  userLocation,
  onStopPress,
}: ActiveRouteMapProps) => {
  const { theme } = useTheme();
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    // Fit map to show all stops
    if (mapRef.current && stops.length > 0) {
      mapRef.current.fitToCoordinates(stops, {
        edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
        animated: true,
      });
    }
  }, [stops]);

  const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    markerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    marker: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: '#FFFFFF',
      ...theme.shadows.md,
    },
    markerActive: {
      backgroundColor: theme.colors.primary,
    },
    markerCompleted: {
      backgroundColor: theme.colors.success,
    },
    markerInactive: {
      backgroundColor: theme.colors.surface,
    },
    markerText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    markerTextInactive: {
      color: theme.colors.text,
    },
    userMarker: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: theme.colors.userLocation,
      borderWidth: 3,
      borderColor: '#FFFFFF',
      ...theme.shadows.sm,
    },
  });

  const getMarkerStyle = (stop: StopLocation) => {
    if (stop.isCompleted) return styles.markerCompleted;
    if (stop.isActive) return styles.markerActive;
    return styles.markerInactive;
  };

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      provider={PROVIDER_DEFAULT}
      showsUserLocation={false}
      showsMyLocationButton={false}
      showsCompass={false}
      zoomControlEnabled={false}
    >
      {/* Route polyline */}
      {route.length > 0 && (
        <Polyline
          coordinates={route}
          strokeColor={theme.colors.routeLine}
          strokeWidth={4}
          lineDashPattern={[1]}
        />
      )}

      {/* Stop markers */}
      {stops.map((stop) => (
        <Marker
          key={stop.id}
          coordinate={stop}
          onPress={() => onStopPress?.(stop.id)}
        >
          <View style={styles.markerContainer}>
            <View style={[styles.marker, getMarkerStyle(stop)]}>
              <Text
                style={[
                  styles.markerText,
                  !stop.isActive &&
                    !stop.isCompleted &&
                    styles.markerTextInactive,
                ]}
              >
                {stop.order}
              </Text>
            </View>
          </View>
        </Marker>
      ))}

      {/* User location marker */}
      {userLocation && (
        <Marker coordinate={userLocation} anchor={{ x: 0.5, y: 0.5 }}>
          <View style={styles.userMarker} />
        </Marker>
      )}
    </MapView>
  );
};
