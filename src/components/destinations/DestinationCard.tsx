import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { LocationBadge } from '@/components/ui/LocationBadge';
import { RatingBadge } from '@/components/ui/RatingBadge';

interface DestinationCardProps {
  id: string;
  title: string;
  location: string;
  rating: number;
  imageUri: string;
  onPress?: () => void;
}

export const DestinationCard = ({
  title,
  location,
  rating,
  imageUri,
  onPress,
}: DestinationCardProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: 6,
      borderRadius: theme.radius.md,
      width: 173,
      ...theme.shadows.md,
    },
    image: {
      width: 161,
      height: 161,
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colors.surface,
    },
    content: {
      marginTop: 4,
      gap: 4,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text variant="bodySMid" style={{ color: theme.colors.text }}>
              {title}
            </Text>
            <LocationBadge location={location} size="small" />
          </View>
          <RatingBadge rating={rating} size="small" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
