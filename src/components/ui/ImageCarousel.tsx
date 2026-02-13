import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewProps,
} from 'react-native';
import { useTheme } from '@/theme';

interface ImageCarouselProps extends ViewProps {
  images: string[];
  height?: number;
  showPagination?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ImageCarousel = ({
  images,
  height = 300,
  showPagination = true,
  style,
  ...props
}: ImageCarouselProps) => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const styles = StyleSheet.create({
    container: {
      height,
    },
    scrollView: {
      height,
    },
    imageContainer: {
      width: SCREEN_WIDTH,
      height,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    paginationContainer: {
      position: 'absolute',
      bottom: theme.spacing.md,
      alignSelf: 'center',
      flexDirection: 'row',
      gap: theme.spacing.xs,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    dotActive: {
      backgroundColor: theme.colors.primary,
    },
    dotInactive: {
      backgroundColor: theme.colors.glass,
    },
  });

  return (
    <View style={[styles.container, style]} {...props}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </ScrollView>

      {showPagination && images.length > 1 && (
        <View style={styles.paginationContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};
