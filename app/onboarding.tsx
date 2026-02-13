import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Get ready for',
    subtitle: 'New Adventures',
    description:
      'If you like to travel, then this is  for you! Here you can explore the beauty of the world.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
  },
  {
    title: 'Discover',
    subtitle: 'Hidden Gems',
    description:
      'Find the most beautiful places around the world and create unforgettable memories.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
  },
  {
    title: 'Start Your',
    subtitle: 'Journey Now',
    description:
      'Join thousands of travelers and explore amazing destinations with our guided tours.',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
  },
];

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(1);

  const currentData = onboardingData[currentIndex];

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      width,
      height,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'flex-end',
      paddingBottom: 60,
    },
    content: {
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: theme.spacing.lg,
    },
    textContainer: {
      alignItems: 'center',
      paddingBottom: 4,
    },
    titleText: {
      color: '#FFFFFF',
      textAlign: 'center',
    },
    subtitleText: {
      color: '#FFFFFF',
      textAlign: 'center',
    },
    description: {
      color: '#FFFFFF',
      textAlign: 'center',
      width: 278,
    },
    pagination: {
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 6,
      backgroundColor: theme.colors.textTertiary,
    },
    activeDot: {
      width: 12,
      height: 6,
      borderRadius: 6,
      backgroundColor: '#FFFFFF',
    },
    button: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 74,
      paddingVertical: 10,
      borderRadius: 45,
      marginTop: 20,
    },
    buttonText: {
      color: theme.colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: currentData.image }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text variant="h4Regular" style={styles.titleText}>
                {currentData.title}
              </Text>
              <Text variant="h3Semibold" style={styles.subtitleText}>
                {currentData.subtitle}
              </Text>
            </View>
            <Text variant="bodyXsRegular" style={styles.description}>
              {currentData.description}
            </Text>

            <View style={styles.pagination}>
              {onboardingData.map((_, index) => (
                <View
                  key={index}
                  style={index === currentIndex ? styles.activeDot : styles.dot}
                />
              ))}
            </View>
          </View>
        </View>
      </ImageBackground>

      <TouchableOpacity
        style={[
          styles.button,
          { position: 'absolute', bottom: 40, alignSelf: 'center' },
        ]}
        onPress={handleNext}
      >
        <Text variant="bodyLMid" style={styles.buttonText}>
          {currentIndex === onboardingData.length - 1 ? "Let's Tour" : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
