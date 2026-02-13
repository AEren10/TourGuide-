import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { TourCard } from './TourCard';
import { NextAdventure } from '../types/home.types';

interface TourCarouselProps {
  tours: NextAdventure[];
  onTourPress?: (tourId: string) => void;
  onStartPress?: (tourId: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 48; // 24px padding on each side
const CARD_SPACING = 12;

export const TourCarousel = ({
  tours,
  onTourPress,
  onStartPress,
}: TourCarouselProps) => {
  const styles = StyleSheet.create({
    scrollView: {
      paddingLeft: 24,
    },
    cardContainer: {
      width: CARD_WIDTH,
      marginRight: CARD_SPACING,
    },
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + CARD_SPACING}
      snapToAlignment="start"
      decelerationRate="fast"
      contentContainerStyle={styles.scrollView}
    >
      {tours.map((tour) => (
        <View key={tour.id} style={styles.cardContainer}>
          <TourCard
            tour={tour}
            onPress={() => onTourPress?.(tour.id)}
            onStartPress={() => onStartPress?.(tour.id)}
          />
        </View>
      ))}
    </ScrollView>
  );
};
