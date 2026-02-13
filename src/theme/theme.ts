import { tokens } from './tokens';

const colors = {
  light: {
    // Primary - Stitch Blue
    primary: '#1392ec',
    primaryLight: '#E0F2FF',
    primaryDark: '#0E75C4',

    // Legacy green (keeping for backward compatibility)
    green: '#09453E',
    greenLight: '#E5F2FF',

    // Backgrounds
    background: '#FFFFFF',
    surface: '#F4F4F4',
    surfaceElevated: '#FFFFFF',
    surfaceLight: '#EAEAEA',

    // Text colors
    text: '#131313', // grey-900
    textSecondary: '#737373', // grey-300
    textTertiary: '#9F9F9F', // grey-200
    textPlaceholder: '#BEBEBE', // grey-100

    // UI elements
    border: '#EAEAEA',
    borderLight: '#BEBEBE',

    // Status colors
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',

    // Badge colors
    badgeRecommended: '#1392ec',
    badgeNew: '#10B981',
    badgeNightTour: '#8B5CF6',
    badgeHeritage: '#F59E0B',
    badgePopular: '#EC4899',

    // Glassmorphism
    glass: 'rgba(255, 255, 255, 0.7)',
    glassDark: 'rgba(0, 0, 0, 0.5)',
    glassLight: 'rgba(255, 255, 255, 0.9)',

    // Map colors
    routeLine: '#1392ec',
    userLocation: '#10B981',
    stopMarker: '#1392ec',
    stopMarkerActive: '#F59E0B',

    // Additional
    secondary: '#5856D6',
  },
  dark: {
    // Primary - Stitch Blue
    primary: '#1392ec',
    primaryLight: '#1C3A52',
    primaryDark: '#0E75C4',

    // Legacy green (keeping for backward compatibility)
    green: '#09453E',
    greenLight: '#1C3A52',

    // Backgrounds
    background: '#000000',
    surface: '#1C1C1E',
    surfaceElevated: '#2C2C2E',
    surfaceLight: '#2C2C2E',

    // Text colors
    text: '#FFFFFF',
    textSecondary: '#D1D5DB',
    textTertiary: '#9CA3AF',
    textPlaceholder: '#6B7280',

    // UI elements
    border: '#374151',
    borderLight: '#4B5563',

    // Status colors
    error: '#F87171',
    success: '#34D399',
    warning: '#FBBF24',

    // Badge colors (adjusted for dark mode)
    badgeRecommended: '#1392ec',
    badgeNew: '#34D399',
    badgeNightTour: '#A78BFA',
    badgeHeritage: '#FBBF24',
    badgePopular: '#F472B6',

    // Glassmorphism
    glass: 'rgba(28, 28, 30, 0.8)',
    glassDark: 'rgba(0, 0, 0, 0.7)',
    glassLight: 'rgba(44, 44, 46, 0.9)',

    // Map colors
    routeLine: '#1392ec',
    userLocation: '#34D399',
    stopMarker: '#1392ec',
    stopMarkerActive: '#FBBF24',

    // Additional
    secondary: '#5E5CE6',
  },
};

export const lightTheme = {
  colors: colors.light,
  ...tokens,
};

export const darkTheme = {
  colors: colors.dark,
  ...tokens,
};

export type Theme = typeof lightTheme;
