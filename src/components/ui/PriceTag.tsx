import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

interface PriceTagProps extends ViewProps {
  price: number | 'free';
  currency?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary';
}

export const PriceTag = ({
  price,
  currency = '$',
  size = 'medium',
  variant = 'default',
  style,
  ...props
}: PriceTagProps) => {
  const { theme } = useTheme();

  const isFree = price === 'free';
  const displayPrice = isFree ? 'Free' : `${currency}${price}`;

  const textVariants = {
    small: 'bodySMid' as const,
    medium: 'bodyMMid' as const,
    large: 'bodyXlMid' as const,
  };

  const textColor =
    variant === 'primary' ? theme.colors.primary : theme.colors.text;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
  });

  return (
    <View style={[styles.container, style]} {...props}>
      <Text variant={textVariants[size]} style={{ color: textColor }}>
        {displayPrice}
      </Text>
      {!isFree && (
        <Text
          variant="bodyXsRegular"
          style={{ color: theme.colors.textSecondary }}
        >
          {' '}
          /person
        </Text>
      )}
    </View>
  );
};
