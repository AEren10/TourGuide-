import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { BlurView } from 'expo-blur';

interface FloatingSearchBarProps {
  placeholder?: string;
  onFilterPress?: () => void;
  onSearch?: (text: string) => void;
}

export const FloatingSearchBar = ({
  placeholder = 'Where do you want to go?',
  onFilterPress,
  onSearch,
}: FloatingSearchBarProps) => {
  const { theme, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 32,
    },
    blurView: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.xs,
    },
    iconContainer: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      flex: 1,
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
    },
    filterButton: {
      width: 44,
      height: 44,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: isDark
        ? theme.colors.surfaceElevated
        : theme.colors.surfaceLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <BlurView
        intensity={20}
        tint={isDark ? 'dark' : 'light'}
        style={styles.blurView}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="search" size={24} color={theme.colors.primary} />
        </View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textPlaceholder}
          onChangeText={onSearch}
        />
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Ionicons
            name="options-outline"
            size={20}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};
