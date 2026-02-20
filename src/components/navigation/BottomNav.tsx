import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { useAuth } from '@/context/AuthContext';

export const BottomNav = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) => pathname === path;

  // Giriş gerektiren sayfalara misafir erişmeye çalışırsa auth'a yönlendir
  const navigateGuarded = (path: string) => {
    router.push(path as any);
  };

  const navigateAuthRequired = (path: string) => {
    if (user) {
      router.push(path as any);
    } else {
      router.push('/auth');
    }
  };

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
          onPress={() => navigateGuarded('/(tabs)')}
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
          onPress={() => navigateGuarded('/(tabs)/explore')}
        >
          <Ionicons
            name={isActive('/(tabs)/explore') ? 'compass' : 'compass-outline'}
            size={24}
            color={isActive('/(tabs)/explore') ? '#FFFFFF' : theme.colors.text}
          />
        </TouchableOpacity>

        {/* Favoriler — giriş gerektirir */}
        <TouchableOpacity
          style={[
            styles.iconButton,
            isActive('/(tabs)/saved') && styles.activeButton,
          ]}
          onPress={() => navigateAuthRequired('/(tabs)/saved')}
        >
          <Ionicons
            name={isActive('/(tabs)/saved') ? 'heart' : 'heart-outline'}
            size={24}
            color={isActive('/(tabs)/saved') ? '#FFFFFF' : theme.colors.text}
          />
        </TouchableOpacity>

        {/* Profil — giriş gerektirir */}
        <TouchableOpacity
          style={[
            styles.iconButton,
            isActive('/(tabs)/profile') && styles.activeButton,
          ]}
          onPress={() => navigateAuthRequired('/(tabs)/profile')}
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
