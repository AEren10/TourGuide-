import React from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  ViewProps,
} from 'react-native';
import { useTheme } from '@/theme';

interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewProps['style'];
}

export const Input = ({
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...props
}: InputProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.sm,
      minHeight: 48,
    },
    input: {
      flex: 1,
      ...theme.typography.bodyMRegular,
      color: theme.colors.text,
      paddingVertical: theme.spacing.sm,
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={theme.colors.textPlaceholder}
        {...props}
      />
      {rightIcon}
    </View>
  );
};
