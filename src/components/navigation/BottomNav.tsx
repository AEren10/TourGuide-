import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';

export const BottomNav = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    nav: {
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 36,
      gap: 67,
      alignItems: 'center',
      ...theme.shadows.lg,
    },
    iconButton: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeButton: {
      backgroundColor: theme.colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          style={[
            styles.iconButton,
            isActive('/(tabs)') && styles.activeButton,
          ]}
          onPress={() => router.push('/(tabs)')}
        >
          <Ionicons
            name={isActive('/(tabs)') ? 'home' : 'home-outline'}
            size={24}
            color={isActive('/(tabs)') ? '#FFFFFF' : theme.colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconButton,
            isActive('/(tabs)/explore') && styles.activeButton,
          ]}
          onPress={() => router.push('/(tabs)/explore')}
        >
          <Ionicons
            name={isActive('/(tabs)/explore') ? 'compass' : 'compass-outline'}
            size={24}
            color={isActive('/(tabs)/explore') ? '#FFFFFF' : theme.colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconButton,
            isActive('/(tabs)/saved') && styles.activeButton,
          ]}
          onPress={() => router.push('/(tabs)/saved')}
        >
          <Ionicons
            name={isActive('/(tabs)/saved') ? 'heart' : 'heart-outline'}
            size={24}
            color={isActive('/(tabs)/saved') ? '#FFFFFF' : theme.colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconButton,
            isActive('/(tabs)/profile') && styles.activeButton,
          ]}
          onPress={() => router.push('/(tabs)/profile')}
        >
          <Ionicons
            name={isActive('/(tabs)/profile') ? 'person' : 'person-outline'}
            size={24}
            color={isActive('/(tabs)/profile') ? '#FFFFFF' : theme.colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
