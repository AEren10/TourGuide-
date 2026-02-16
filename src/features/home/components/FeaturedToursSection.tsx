import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { FeaturedTourCard } from './FeaturedTourCard';

interface Tour {
  id: string;
  title: string;
  imageUrl: string;
  rating?: number;
  duration?: string;
  distance?: string;
}

interface FeaturedToursSectionProps {
  tours?: Tour[];
  onTourPress?: (tourId: string) => void;
}

const defaultTours: Tour[] = [
  {
    id: '1',
    title: 'Midnight Jazz Walk',
    imageUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    rating: 4.9,
    duration: '2h 30m',
    distance: '1.2 km',
  },
  {
    id: '2',
    title: 'Historical Rooftops',
    imageUrl:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400',
    rating: 4.7,
    duration: '4h',
    distance: '0.5 km',
  },
];

export const FeaturedToursSection = ({
  tours = defaultTours,
  onTourPress,
}: FeaturedToursSectionProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.colors.text,
      letterSpacing: -0.5,
    },
    toursGrid: {
      gap: theme.spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Featured Tours</Text>
      </View>

      <View style={styles.toursGrid}>
        {tours.map((tour) => (
          <FeaturedTourCard
            key={tour.id}
            title={tour.title}
            imageUrl={tour.imageUrl}
            rating={tour.rating}
            duration={tour.duration}
            distance={tour.distance}
            onPress={() => onTourPress?.(tour.id)}
          />
        ))}
      </View>
    </View>
  );
};
