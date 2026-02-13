import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

interface StopDetailHeroProps {
  images: string[];
}

export const StopDetailHero = ({ images }: StopDetailHeroProps) => {
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
  });

  return (
    <View style={styles.container}>
      <ImageCarousel images={images} height={300} showPagination />
    </View>
  );
};
