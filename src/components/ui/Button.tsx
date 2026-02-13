import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends Omit<TouchableOpacityProps, 'children'> {
  variant?: ButtonVariant;
  loading?: boolean;
  children: string;
}

export const Button = ({
  variant = 'primary',
  loading = false,
  disabled,
  children,
  style,
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();

  const isDisabled = disabled || loading;

  const styles = StyleSheet.create({
    button: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: theme.spacing.sm,
      opacity: isDisabled ? 0.5 : 1,
    },
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
  });

  const textColor =
    variant === 'primary'
      ? '#FFFFFF'
      : variant === 'secondary'
        ? theme.colors.text
        : theme.colors.primary;

  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], style]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading && <ActivityIndicator color={textColor} size="small" />}
      <Text variant="body" style={{ color: textColor, fontWeight: '600' }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
