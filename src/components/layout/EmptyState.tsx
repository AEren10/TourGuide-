import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';

interface EmptyStateProps extends ViewProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  style,
  ...props
}: EmptyStateProps) => {
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
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.sm,
    },
    textContainer: {
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
  });

  return (
    <View style={[styles.container, style]} {...props}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      <View style={styles.textContainer}>
        <Text
          variant="h4Medium"
          style={{ color: theme.colors.text, textAlign: 'center' }}
        >
          {title}
        </Text>

        {description && (
          <Text
            variant="bodyMRegular"
            style={{
              color: theme.colors.textSecondary,
              textAlign: 'center',
            }}
          >
            {description}
          </Text>
        )}
      </View>

      {actionLabel && onAction && (
        <Button variant="primary" onPress={onAction}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
};
