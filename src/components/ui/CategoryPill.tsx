import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

interface CategoryPillProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

export const CategoryPill = ({
  label,
  isActive = false,
  onPress,
}: CategoryPillProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 14,
      paddingVertical: 4,
      borderRadius: theme.radius.xxl,
      borderWidth: 1.5,
      borderColor: isActive ? 'transparent' : theme.colors.borderLight,
      backgroundColor: isActive ? theme.colors.primary : 'transparent',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text
        variant="bodyMRegular"
        style={{
          color: isActive ? '#FFFFFF' : theme.colors.textPlaceholder,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
