import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Text } from './Text';

interface RatingBadgeProps {
  rating: number;
  size?: 'small' | 'medium'; // 16px or 24px icon
}

export const RatingBadge = ({ rating, size = 'medium' }: RatingBadgeProps) => {
  const { theme } = useTheme();
  const iconSize = size === 'small' ? 16 : 24;
  const textVariant = size === 'small' ? 'bodyXsMid' : 'bodyMMid';

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
  });

  return (
    <View style={styles.container}>
      <Ionicons name="star" size={iconSize} color="#FFD700" />
      <Text variant={textVariant} style={{ color: theme.colors.text }}>
        {(rating ?? 0).toFixed(1)}
      </Text>
    </View>
  );
};
