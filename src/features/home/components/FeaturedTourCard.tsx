import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';

interface FeaturedTourCardProps {
  title: string;
  imageUrl: string;
  rating?: number;
  duration?: string;
  distance?: string;
  onPress?: () => void;
}

export const FeaturedTourCard = ({
  title,
  imageUrl,
  rating = 4.9,
  duration,
  distance,
  onPress,
}: FeaturedTourCardProps) => {
  const { theme, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDark
        ? theme.colors.surface
        : theme.colors.surfaceElevated,
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      borderWidth: isDark ? 0 : 1,
      borderColor: theme.colors.border,
    },
    imageContainer: {
      width: '100%',
      height: 180,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    ratingBadge: {
      position: 'absolute',
      top: 12,
      right: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: theme.borderRadius.full,
    },
    ratingText: {
      fontSize: 13,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    content: {
      padding: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      lineHeight: 24,
      letterSpacing: -0.3,
    },
    statsContainer: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    statText: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.textSecondary,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color="#FBBF24" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {(duration || distance) && (
          <View style={styles.statsContainer}>
            {duration && (
              <View style={styles.statItem}>
                <Ionicons
                  name="time-outline"
                  size={16}
                  color={theme.colors.textTertiary}
                />
                <Text style={styles.statText}>{duration}</Text>
              </View>
            )}
            {distance && (
              <View style={styles.statItem}>
                <Ionicons
                  name="navigate-outline"
                  size={16}
                  color={theme.colors.textTertiary}
                />
                <Text style={styles.statText}>{distance}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
