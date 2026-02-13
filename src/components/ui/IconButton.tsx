import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '@/theme';

interface IconButtonProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'small' | 'medium' | 'large';
}

export const IconButton = ({
  icon,
  variant = 'glass',
  size = 'medium',
  style,
  ...props
}: IconButtonProps) => {
  const { theme } = useTheme();

  const sizeMap = {
    small: 32,
    medium: 44,
    large: 56,
  };

  const buttonSize = sizeMap[size];

  const styles = StyleSheet.create({
    button: {
      width: buttonSize,
      height: buttonSize,
      borderRadius: buttonSize / 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    glass: {
      backgroundColor: theme.colors.glass,
      ...theme.shadows.glass,
    },
    solid: {
      backgroundColor: theme.colors.primary,
      ...theme.shadows.sm,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], style]}
      activeOpacity={0.7}
      {...props}
    >
      <View>{icon}</View>
    </TouchableOpacity>
  );
};
