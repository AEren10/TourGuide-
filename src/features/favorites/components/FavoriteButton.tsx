import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
  variant?: 'default' | 'glass';
}

export const FavoriteButton = ({
  isFavorite,
  onPress,
  size = 44,
  variant = 'default',
}: FavoriteButtonProps) => {
  const { theme } = useTheme();
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Animate press
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  const styles = StyleSheet.create({
    button: {
      width: size,
      height: size,
      borderRadius: size / 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    default: {
      backgroundColor: 'transparent',
    },
    glass: {
      backgroundColor: theme.colors.glass,
      ...theme.shadows.glass,
    },
  });

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Animated.View
        style={[
          styles.button,
          styles[variant],
          { transform: [{ scale: scaleValue }] },
        ]}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={size * 0.5}
          color={isFavorite ? theme.colors.error : theme.colors.text}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
