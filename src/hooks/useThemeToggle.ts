import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@theme_mode';

type ThemeMode = 'light' | 'dark' | 'auto';

export const useThemeToggle = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      if (saved) {
        setThemeMode(saved as ThemeMode);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const setTheme = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, mode);
      setThemeMode(mode);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return {
    themeMode,
    setTheme,
    isLight: themeMode === 'light',
    isDark: themeMode === 'dark',
    isAuto: themeMode === 'auto',
  };
};
