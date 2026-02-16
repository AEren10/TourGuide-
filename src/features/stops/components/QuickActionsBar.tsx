import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';

interface ActionButton {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
}

interface QuickActionsBarProps {
  onCheckIn?: () => void;
  onAudio?: () => void;
  onReview?: () => void;
  onShare?: () => void;
}

export const QuickActionsBar = ({
  onCheckIn,
  onAudio,
  onReview,
  onShare,
}: QuickActionsBarProps) => {
  const { theme, isDark } = useTheme();

  const actions: ActionButton[] = [
    {
      id: 'checkin',
      icon: 'camera-outline',
      label: 'Check-in',
      onPress: onCheckIn,
    },
    { id: 'audio', icon: 'headset-outline', label: 'Audio', onPress: onAudio },
    {
      id: 'review',
      icon: 'create-outline',
      label: 'Review',
      onPress: onReview,
    },
    {
      id: 'share',
      icon: 'share-social-outline',
      label: 'Share',
      onPress: onShare,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: isDark
        ? 'rgba(255, 255, 255, 0.1)'
        : theme.colors.border,
    },
    actionButton: {
      alignItems: 'center',
      gap: theme.spacing.xs,
      flex: 1,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: theme.borderRadius.full,
      backgroundColor: isDark
        ? 'rgba(255, 255, 255, 0.05)'
        : theme.colors.surfaceLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: 10,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      color: theme.colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.actionButton}
          onPress={action.onPress}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name={action.icon}
              size={20}
              color={theme.colors.textSecondary}
            />
          </View>
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
