import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { useOnboarding } from '@/context/OnboardingContext';

const { width, height } = Dimensions.get('window');

const VIDEO_URL =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

interface OnboardingSlide {
  id: string;
  titleKey: string;
  descriptionKey: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    titleKey: 'onboarding.screen1.title',
    descriptionKey: 'onboarding.screen1.description',
  },
  {
    id: '2',
    titleKey: 'onboarding.screen2.title',
    descriptionKey: 'onboarding.screen2.description',
  },
  {
    id: '3',
    titleKey: 'onboarding.screen3.title',
    descriptionKey: 'onboarding.screen3.description',
  },
];

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const { setOnboardingCompleted } = useOnboarding();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const player = useVideoPlayer(VIDEO_URL, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    await setOnboardingCompleted(true);
    router.replace('/paywall');
  };

  const renderItem = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <View style={styles.content}>
        <Text style={styles.title}>{t(item.titleKey)}</Text>
        <Text style={styles.description}>{t(item.descriptionKey)}</Text>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    slide: {
      width,
      height,
      justifyContent: 'flex-end',
      paddingBottom: 120,
    },
    content: {
      paddingHorizontal: theme.spacing.xl,
      gap: theme.spacing.md,
    },
    title: {
      fontSize: 36,
      fontWeight: '800',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    description: {
      fontSize: 18,
      color: 'rgba(255, 255, 255, 0.9)',
      textAlign: 'center',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: theme.spacing.xl,
      paddingBottom: theme.spacing.xl + 20,
      gap: theme.spacing.md,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    dotActive: {
      backgroundColor: '#FFFFFF',
      width: 24,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    skipButton: {
      flex: 1,
      paddingVertical: 18,
      borderRadius: theme.borderRadius.xl,
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    skipButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    nextButton: {
      flex: 2,
      paddingVertical: 18,
      borderRadius: theme.borderRadius.xl,
      alignItems: 'center',
    },
    nextButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
    },
  });

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />

      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        style={StyleSheet.absoluteFill}
      />

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentIndex && styles.dotActive]}
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>{t('common.skip')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext}>
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryDark]}
              style={styles.nextButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex === slides.length - 1
                  ? t('common.getStarted')
                  : t('common.continue')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
