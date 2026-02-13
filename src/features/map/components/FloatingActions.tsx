import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { IconButton } from '@/components/ui/IconButton';

interface FloatingActionsProps {
  onCameraPress?: () => void;
  onARPress?: () => void;
}

export const FloatingActions = ({
  onCameraPress,
  onARPress,
}: FloatingActionsProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      right: theme.spacing.md,
      bottom: 200,
      gap: theme.spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <IconButton
        icon={<Ionicons name="camera" size={24} color={theme.colors.text} />}
        variant="glass"
        size="large"
        onPress={onCameraPress}
      />
      <IconButton
        icon={<Ionicons name="scan" size={24} color={theme.colors.text} />}
        variant="glass"
        size="large"
        onPress={onARPress}
      />
    </View>
  );
};
