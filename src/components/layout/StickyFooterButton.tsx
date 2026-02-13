import React from 'react';
import { View, StyleSheet, ViewProps, Platform } from 'react-native';
import { useTheme } from '@/theme';
import { Button } from '../ui/Button';

interface StickyFooterButtonProps extends ViewProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  leftContent?: React.ReactNode;
}

export const StickyFooterButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  leftContent,
  style,
  ...props
}: StickyFooterButtonProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.md,
      paddingBottom:
        Platform.OS === 'ios' ? theme.spacing.lg : theme.spacing.md,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      ...theme.shadows.md,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    buttonContainer: {
      flex: 1,
    },
  });

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.content}>
        {leftContent}
        <View style={styles.buttonContainer}>
          <Button
            variant={variant}
            onPress={onPress}
            loading={loading}
            disabled={disabled}
          >
            {title}
          </Button>
        </View>
      </View>
    </View>
  );
};
