import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';

interface ErrorStateProps extends ViewProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'An error occurred while loading this content. Please try again.',
  onRetry,
  retryLabel = 'Try Again',
  style,
  ...props
}: ErrorStateProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.xxl,
      gap: theme.spacing.md,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.error + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.sm,
    },
    iconText: {
      fontSize: 40,
    },
    textContainer: {
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
  });

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>⚠️</Text>
      </View>

      <View style={styles.textContainer}>
        <Text
          variant="h4Medium"
          style={{ color: theme.colors.text, textAlign: 'center' }}
        >
          {title}
        </Text>

        <Text
          variant="bodyMRegular"
          style={{
            color: theme.colors.textSecondary,
            textAlign: 'center',
          }}
        >
          {message}
        </Text>
      </View>

      {onRetry && (
        <Button variant="primary" onPress={onRetry}>
          {retryLabel}
        </Button>
      )}
    </View>
  );
};
