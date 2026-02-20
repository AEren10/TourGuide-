import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { useAuth } from '@/context/AuthContext';

interface HomeHeaderProps {
  hasNotification?: boolean;
  onProfilePress?: () => void;
  onSettingsPress?: () => void;
}

export const HomeHeader = ({
  hasNotification = false,
  onProfilePress,
  onSettingsPress,
}: HomeHeaderProps) => {
  const { theme } = useTheme();
  const { user } = useAuth();

  const displayName =
    user?.user_metadata?.full_name?.split(' ')[0] ||
    user?.email?.split('@')[0] ||
    'Gezgin';

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=ee8c2b&color=fff&size=200`;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Günaydın';
    if (hour < 18) return 'İyi günler';
    return 'İyi akşamlar';
  };

  const getDate = () => {
    const days = [
      'Pazar',
      'Pazartesi',
      'Salı',
      'Çarşamba',
      'Perşembe',
      'Cuma',
      'Cumartesi',
    ];
    const months = [
      'Oca',
      'Şub',
      'Mar',
      'Nis',
      'May',
      'Haz',
      'Tem',
      'Ağu',
      'Eyl',
      'Eki',
      'Kas',
      'Ara',
    ];
    const now = new Date();
    return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.md,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.md,
    },
    settingsButton: {
      padding: theme.spacing.xs,
      marginLeft: -theme.spacing.xs,
    },
    avatarContainer: {
      position: 'relative',
      padding: 2,
    },
    avatarGradient: {
      width: 52,
      height: 52,
      borderRadius: 26,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: theme.colors.background,
    },
    badge: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.colors.primary,
      borderWidth: 2,
      borderColor: theme.colors.background,
    },
    textContainer: {
      gap: 4,
    },
    dateText: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.textSecondary,
    },
    greetingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    greetingText: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.text,
      lineHeight: 34,
    },
    nameText: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.primary,
      lineHeight: 34,
    },
    subtitle: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.text,
      lineHeight: 34,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={onSettingsPress}
          activeOpacity={0.7}
        >
          <Ionicons
            name="settings-outline"
            size={28}
            color={theme.colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarGradient}
          >
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          </LinearGradient>
          {hasNotification && <View style={styles.badge} />}
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{getDate()}</Text>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>{getGreeting()}, </Text>
          <Text style={styles.nameText}>{displayName}.</Text>
        </View>
        <Text style={styles.subtitle}>Gezmeye hazır mısın?</Text>
      </View>
    </View>
  );
};
