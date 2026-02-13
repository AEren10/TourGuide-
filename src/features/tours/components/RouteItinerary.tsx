import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { ItineraryStop } from './ItineraryStop';
import { ItineraryStop as ItineraryStopType } from '../types/tour.types';

interface RouteItineraryProps {
  stops: ItineraryStopType[];
  onStopPress?: (stopId: string) => void;
}

const INITIAL_VISIBLE_STOPS = 4;

export const RouteItinerary = ({ stops, onStopPress }: RouteItineraryProps) => {
  const { theme } = useTheme();
  const [showAll, setShowAll] = useState(false);

  const visibleStops = showAll ? stops : stops.slice(0, INITIAL_VISIBLE_STOPS);
  const hasMore = stops.length > INITIAL_VISIBLE_STOPS;
  const remainingCount = stops.length - INITIAL_VISIBLE_STOPS;

  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing.sm,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.sm,
    },
    icon: {
      fontSize: 20,
    },
    timeline: {
      paddingHorizontal: theme.spacing.md,
    },
    showMoreButton: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      alignItems: 'center',
      marginTop: theme.spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🗺️</Text>
        <Text variant="bodyXlSemi" style={{ color: theme.colors.text }}>
          Route Itinerary
        </Text>
      </View>

      <View style={styles.timeline}>
        {visibleStops.map((stop, index) => (
          <ItineraryStop
            key={stop.id}
            stop={stop}
            isLast={index === visibleStops.length - 1 && showAll}
            onPress={() => onStopPress?.(stop.id)}
          />
        ))}
      </View>

      {hasMore && !showAll && (
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={() => setShowAll(true)}
          activeOpacity={0.7}
        >
          <Text variant="bodyMMid" style={{ color: theme.colors.primary }}>
            Show {remainingCount} more {remainingCount === 1 ? 'stop' : 'stops'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
