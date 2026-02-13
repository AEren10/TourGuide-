import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSettingsPress?: () => void;
}

export const SearchBar = ({
  placeholder = 'Search here',
  value,
  onChangeText,
  onSettingsPress,
}: SearchBarProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surfaceLight,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: 6,
      borderRadius: 51,
      gap: theme.spacing.md,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
      padding: 0,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons
          name="search"
          size={24}
          color={theme.colors.textPlaceholder}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textPlaceholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity onPress={onSettingsPress}>
        <Ionicons
          name="settings-outline"
          size={24}
          color={theme.colors.textPlaceholder}
        />
      </TouchableOpacity>
    </View>
  );
};
