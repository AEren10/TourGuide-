import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ViewToken,
} from 'react-native';
import { useTheme } from '@/theme';
import { HeroCard } from './HeroCard';

const { width } = Dimensions.get('window');
const CARD_PADDING = 20;
const CARD_WIDTH = width - CARD_PADDING * 2;
const CARD_SPACING = 12;

interface HeroSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  badge?: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  onSlidePress?: (id: string) => void;
}

export const HeroSlider = ({ slides, onSlidePress }: HeroSliderProps) => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({ item }: { item: HeroSlide }) => (
    <View style={styles.cardWrapper}>
      <HeroCard
        title={item.title}
        description={item.description}
        imageUrl={item.imageUrl}
        badge={item.badge}
        onPress={() => onSlidePress?.(item.id)}
      />
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing.md,
    },
    cardWrapper: {
      width: width,
      paddingHorizontal: CARD_PADDING,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      paddingHorizontal: theme.spacing.md,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.border,
    },
    dotActive: {
      backgroundColor: theme.colors.primary,
      width: 24,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};
