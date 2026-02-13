import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '../ui/Text';
import { IconButton } from '../ui/IconButton';

interface HeaderProps extends ViewProps {
  title?: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  variant?: 'default' | 'transparent';
}

export const Header = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  variant = 'default',
  style,
  ...props
}: HeaderProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor:
        variant === 'transparent' ? 'transparent' : theme.colors.background,
      gap: theme.spacing.sm,
    },
    content: {
      flex: 1,
    },
    iconContainer: {
      width: 44,
      alignItems: 'center',
    },
  });

  return (
    <View style={[styles.container, style]} {...props}>
      {leftIcon && (
        <View style={styles.iconContainer}>
          {onLeftPress ? (
            <IconButton
              icon={leftIcon}
              variant={variant === 'transparent' ? 'glass' : 'ghost'}
              onPress={onLeftPress}
            />
          ) : (
            leftIcon
          )}
        </View>
      )}

      <View style={styles.content}>
        {title && (
          <Text variant="h4Medium" style={{ color: theme.colors.text }}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text
            variant="bodySRegular"
            style={{ color: theme.colors.textSecondary }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {rightIcon && (
        <View style={styles.iconContainer}>
          {onRightPress ? (
            <IconButton
              icon={rightIcon}
              variant={variant === 'transparent' ? 'glass' : 'ghost'}
              onPress={onRightPress}
            />
          ) : (
            rightIcon
          )}
        </View>
      )}
    </View>
  );
};
