import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';

interface HomeHeaderProps {
  userName?: string;
  userAvatar?: string;
  hasNotification?: boolean;
  onProfilePress?: () => void;
}

export const HomeHeader = ({
  userName = 'Alex Traveler',
  userAvatar = 'https://i.pravatar.cc/150?img=12',
  hasNotification = false,
  onProfilePress,
}: HomeHeaderProps) => {
  const { theme } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
    },
    textContainer: {
      flex: 1,
      gap: 2,
    },
    avatarContainer: {
      position: 'relative',
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    badge: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.colors.primary,
      borderWidth: 2,
      borderColor: theme.colors.background,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text
          variant="bodySRegular"
          style={{ color: theme.colors.textSecondary }}
        >
          {getGreeting()},
        </Text>
        <Text variant="h4Medium" style={{ color: theme.colors.text }}>
          {userName}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={onProfilePress}
        activeOpacity={0.7}
      >
        <Image source={{ uri: userAvatar }} style={styles.avatar} />
        {hasNotification && <View style={styles.badge} />}
      </TouchableOpacity>
    </View>
  );
};
