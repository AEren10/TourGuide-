import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';

interface OfflineStateProps {
  onRetry?: () => void;
  message?: string;
}

export const OfflineState = ({
  onRetry,
  message = 'No internet connection. Please check your network settings and try again.',
}: OfflineStateProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.xl,
      backgroundColor: theme.colors.background,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.surfaceLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    message: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
      lineHeight: 24,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="cloud-offline-outline"
          size={40}
          color={theme.colors.textSecondary}
        />
      </View>

      <Text style={styles.title}>You're Offline</Text>
      <Text style={styles.message}>{message}</Text>

      {onRetry && (
        <Button onPress={onRetry} variant="primary">
          Try Again
        </Button>
      )}
    </View>
  );
};
