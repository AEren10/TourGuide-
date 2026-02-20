import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';

interface Category {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  borderRadius?: number;
}

interface QuickStartCategoriesProps {
  onCategoryPress?: (categoryId: string) => void;
  onSeeAllPress?: () => void;
}

const categories: Category[] = [
  { id: 'brunch', icon: 'cafe-outline', label: 'Brunch', borderRadius: 24 },
  {
    id: 'sunset',
    icon: 'partly-sunny-outline',
    label: 'Sunset',
    borderRadius: 20,
  },
  { id: 'hidden', icon: 'eye-outline', label: 'Hidden', borderRadius: 18 },
  {
    id: 'culture',
    icon: 'business-outline',
    label: 'Culture',
    borderRadius: 22,
  },
];

export const QuickStartCategories = ({
  onCategoryPress,
  onSeeAllPress,
}: QuickStartCategoriesProps) => {
  const { theme, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing.md,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
    },
    seeAllButton: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: '600',
    },
    scrollContainer: {
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.md,
    },
    categoryItem: {
      alignItems: 'center',
      gap: theme.spacing.xs,
      width: 80,
    },
    iconContainer: {
      width: 80,
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark
        ? theme.colors.surface
        : theme.colors.surfaceLight,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    },
    label: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="bodyXlSemi" style={{ color: theme.colors.text }}>
          Quick Start
        </Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={styles.seeAllButton}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => onCategoryPress?.(category.id)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  borderRadius: category.borderRadius || theme.borderRadius.xl,
                },
              ]}
            >
              <Ionicons
                name={category.icon}
                size={32}
                color={theme.colors.primary}
              />
            </View>
            <Text style={styles.label}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
