import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { useTheme } from '@/theme';

type TextVariant =
  | 'title'
  | 'h1'
  | 'h2'
  | 'body'
  | 'caption'
  | 'small'
  | 'h3Semibold'
  | 'h4Medium'
  | 'h4Regular'
  | 'bodyXlSemi'
  | 'bodyXlMid'
  | 'bodyLMid'
  | 'bodyMMid'
  | 'bodyMRegular'
  | 'bodySMid'
  | 'bodySRegular'
  | 'bodyXsMid'
  | 'bodyXsRegular';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: 'primary' | 'secondary' | 'tertiary' | 'error';
}

export const Text = ({
  variant = 'body',
  color,
  style,
  ...props
}: TextProps) => {
  const { theme } = useTheme();

  const variantStyle = theme.typography[variant];
  const colorValue = color
    ? color === 'primary'
      ? theme.colors.text
      : color === 'secondary'
        ? theme.colors.textSecondary
        : color === 'tertiary'
          ? theme.colors.textTertiary
          : theme.colors.error
    : theme.colors.text;

  return (
    <RNText style={[variantStyle, { color: colorValue }, style]} {...props} />
  );
};
