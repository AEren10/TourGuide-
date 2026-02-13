import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

interface AvatarStackProps {
  avatars: string[]; // Array of image URIs
  totalCount?: number; // Total number (e.g., 12000)
  size?: 'small' | 'medium'; // 24px or 40px
}

export const AvatarStack = ({
  avatars,
  totalCount,
  size = 'medium',
}: AvatarStackProps) => {
  const { theme } = useTheme();
  const avatarSize = size === 'small' ? 24 : 40;
  const overlap = size === 'small' ? 6 : 10;
  const fontSize = size === 'small' ? 8 : 12;

  const displayAvatars = avatars.slice(0, 3);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: overlap,
    },
    avatar: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
      marginRight: -overlap,
      borderWidth: 2,
      borderColor: theme.colors.background,
    },
    countBadge: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
      backgroundColor: theme.colors.surface,
      marginRight: -overlap,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: theme.colors.background,
    },
  });

  return (
    <View style={styles.container}>
      {displayAvatars.map((uri, index) => (
        <Image key={index} source={{ uri }} style={styles.avatar} />
      ))}
      {totalCount && (
        <View style={styles.countBadge}>
          <Text
            variant={size === 'small' ? 'bodyXsMid' : 'bodyXsMid'}
            style={{ fontSize, color: theme.colors.text }}
          >
            +
            {totalCount >= 1000
              ? `${Math.floor(totalCount / 1000)}k`
              : totalCount}
          </Text>
        </View>
      )}
    </View>
  );
};
