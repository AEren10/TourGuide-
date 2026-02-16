import { tokens } from './tokens';

const colors = {
  light: {
    // Primary - Warm Orange (Minimal & Clean)
    primary: '#ee8c2b',
    primaryLight: '#FFF5EB',
    primaryDark: '#d97a1f',

    // Legacy green
    green: '#09453E',
    greenLight: '#E5F2FF',

    // Backgrounds - Pure White Minimal
    background: '#FFFFFF',
    surface: '#FAFAFA',
    surfaceElevated: '#FFFFFF',
    surfaceLight: '#F5F5F5',

    // Text colors - High Contrast Minimal
    text: '#0A0A0A',
    textSecondary: '#6B6B6B',
    textTertiary: '#9CA3AF',
    textPlaceholder: '#D1D5DB',

    // UI elements - Subtle
    border: '#F0F0F0',
    borderLight: '#E5E7EB',

    // Status colors
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',

    // Badge colors
    badgeRecommended: '#ee8c2b',
    badgeNew: '#10B981',
    badgeNightTour: '#8B5CF6',
    badgeHeritage: '#F59E0B',
    badgePopular: '#EC4899',

    // Glassmorphism - Light
    glass: 'rgba(255, 255, 255, 0.85)',
    glassDark: 'rgba(0, 0, 0, 0.4)',
    glassLight: 'rgba(255, 255, 255, 0.95)',

    // Map colors
    routeLine: '#ee8c2b',
    userLocation: '#10B981',
    stopMarker: '#ee8c2b',
    stopMarkerActive: '#F59E0B',

    // Additional
    secondary: '#5856D6',
  },
  dark: {
    // Primary - Warm Orange (Rich & Cozy)
    primary: '#F59E0B',
    primaryLight: '#3d2d21',
    primaryDark: '#ee7c2b',

    // Legacy green
    green: '#09453E',
    greenLight: '#1C3A52',

    // Backgrounds - Warm Coffee Tones
    background: '#1A1410',
    surface: '#251D17',
    surfaceElevated: '#312620',
    surfaceLight: '#2A221B',

    // Text colors - Warm White
    text: '#FAF8F5',
    textSecondary: '#C9BFB5',
    textTertiary: '#9B9389',
    textPlaceholder: '#6B6560',

    // UI elements - Warm borders
    border: 'rgba(255, 255, 255, 0.08)',
    borderLight: 'rgba(255, 255, 255, 0.12)',

    // Status colors - Warmer tones
    error: '#F87171',
    success: '#34D399',
    warning: '#FBBF24',

    // Badge colors
    badgeRecommended: '#F59E0B',
    badgeNew: '#34D399',
    badgeNightTour: '#A78BFA',
    badgeHeritage: '#FBBF24',
    badgePopular: '#F472B6',

    // Glassmorphism - Warm
    glass: 'rgba(49, 38, 32, 0.7)',
    glassDark: 'rgba(0, 0, 0, 0.7)',
    glassLight: 'rgba(61, 45, 33, 0.9)',
    glassPill: 'rgba(255, 255, 255, 0.1)',

    // Map colors
    routeLine: '#F59E0B',
    userLocation: '#34D399',
    stopMarker: '#F59E0B',
    stopMarkerActive: '#FBBF24',

    // Additional
    secondary: '#8B5CF6',
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
