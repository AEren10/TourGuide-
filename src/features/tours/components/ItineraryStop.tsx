import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { ItineraryStop as ItineraryStopType } from '../types/tour.types';

interface ItineraryStopProps {
  stop: ItineraryStopType;
  isLast?: boolean;
  onPress?: () => void;
}

export const ItineraryStop = ({
  stop,
  isLast = false,
  onPress,
}: ItineraryStopProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    markerContainer: {
      alignItems: 'center',
      width: 32,
    },
    marker: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    markerText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    line: {
      width: 2,
      flex: 1,
      backgroundColor: theme.colors.border,
      marginTop: theme.spacing.xs,
    },
    content: {
      flex: 1,
      paddingBottom: isLast ? 0 : theme.spacing.lg,
    },
    stopCard: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: theme.radius.md,
      padding: theme.spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.sm,
    },
    image: {
      width: 64,
      height: 64,
      borderRadius: theme.radius.sm,
    },
    textContent: {
      flex: 1,
      gap: 4,
    },
    walkingInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      marginTop: theme.spacing.sm,
      paddingHorizontal: theme.spacing.sm,
    },
    walkingDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.textSecondary,
    },
    walkingLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.markerContainer}>
        <View style={styles.marker}>
          <Text style={styles.markerText}>{stop.order}</Text>
        </View>
        {!isLast && <View style={styles.line} />}
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.stopCard}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Image source={{ uri: stop.imageUrl }} style={styles.image} />
          <View style={styles.textContent}>
            <Text variant="bodyMMid" style={{ color: theme.colors.text }}>
              {stop.title}
            </Text>
            <Text
              variant="bodySRegular"
              style={{ color: theme.colors.textSecondary }}
              numberOfLines={2}
            >
              {stop.description}
            </Text>
            <Text
              variant="bodyXsRegular"
              style={{ color: theme.colors.primary }}
            >
              ⏱️ {stop.duration}
            </Text>
          </View>
        </TouchableOpacity>

        {!isLast && stop.walkingTime && (
          <View style={styles.walkingInfo}>
            <View style={styles.walkingDot} />
            <View style={styles.walkingLine} />
            <Text
              variant="bodyXsRegular"
              style={{ color: theme.colors.textSecondary }}
            >
              🚶 {stop.walkingTime} • {stop.walkingDistance}
            </Text>
            <View style={styles.walkingLine} />
            <View style={styles.walkingDot} />
          </View>
        )}
      </View>
    </View>
  );
};
