import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

interface HeroCardProps {
  title: string;
  description: string;
  imageUrl: string;
  badge?: string;
  onPress?: () => void;
}

export const HeroCard = ({
  title,
  description,
  imageUrl,
  badge = 'Daily Pick',
  onPress,
}: HeroCardProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderRadius: theme.borderRadius['2xl'],
      overflow: 'hidden',
      aspectRatio: 0.8,
      elevation: 8,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
    },
    imageBackground: {
      flex: 1,
    },
    gradient: {
      flex: 1,
      padding: theme.spacing.lg,
      justifyContent: 'flex-end',
    },
    badge: {
      alignSelf: 'flex-start',
      marginBottom: theme.spacing.sm,
      borderRadius: theme.borderRadius.full,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    badgeContent: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      gap: 4,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      color: 'rgba(255, 255, 255, 0.9)',
    },
    title: {
      fontSize: 32,
      fontWeight: '800',
      color: '#FFFFFF',
      marginBottom: theme.spacing.xs,
      lineHeight: 38,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 10,
    },
    description: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: theme.spacing.lg,
      lineHeight: 20,
      maxWidth: '90%',
    },
    button: {
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.xl,
      gap: theme.spacing.xs,
      elevation: 4,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.95}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.8)']}
          style={styles.gradient}
        >
          <View style={styles.badge}>
            <BlurView intensity={10} tint="dark" style={styles.badgeContent}>
              <Ionicons
                name="sparkles"
                size={14}
                color={theme.colors.primary}
              />
              <Text style={styles.badgeText}>{badge}</Text>
            </BlurView>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Start Today's Journey</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};
