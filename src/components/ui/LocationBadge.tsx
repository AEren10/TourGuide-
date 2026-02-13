import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Text } from './Text';

interface LocationBadgeProps {
  location: string;
  size?: 'small' | 'medium'; // 16px or 24px icon
}

export const LocationBadge = ({
  location,
  size = 'medium',
}: LocationBadgeProps) => {
  const { theme } = useTheme();
  const iconSize = size === 'small' ? 16 : 24;
  const textVariant = size === 'small' ? 'bodyXsRegular' : 'bodyMMid';

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
  });

  return (
    <View style={styles.container}>
      <Ionicons
        name="location"
        size={iconSize}
        color={theme.colors.textPlaceholder}
      />
      <Text
        variant={textVariant}
        style={{ color: theme.colors.textPlaceholder }}
      >
        {location}
      </Text>
    </View>
  );
};
