import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { LocationBadge } from '@/components/ui/LocationBadge';
import { AvatarStack } from '@/components/ui/AvatarStack';

interface DestinationListItemProps {
  id: string;
  title: string;
  location: string;
  imageUri: string;
  avatars: string[];
  totalVisitors?: number;
  onPress?: () => void;
}

export const DestinationListItem = ({
  title,
  location,
  imageUri,
  avatars,
  totalVisitors,
  onPress,
}: DestinationListItemProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.sm,
      borderRadius: theme.radius.lg,
      gap: theme.spacing.sm,
      alignItems: 'center',
      ...theme.shadows.sm,
    },
    image: {
      width: 126,
      height: 100,
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colors.surface,
    },
    content: {
      flex: 1,
      gap: theme.spacing.sm,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    textContainer: {
      alignItems: 'flex-end',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text variant="bodySMid" style={{ color: theme.colors.text }}>
            {title}
          </Text>
          <LocationBadge location={location} size="small" />
        </View>
        <AvatarStack
          avatars={avatars}
          totalCount={totalVisitors}
          size="small"
        />
      </View>
    </TouchableOpacity>
  );
};
