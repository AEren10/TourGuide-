export const tokens = {
  spacing: {
    xs: 6,
    sm: 12,
    md: 20,
    lg: 28,
    xl: 40,
    xxl: 56,
  },
  radius: {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 28,
    xxl: 35,
    pill: 42,
    full: 9999,
  },
  borderRadius: {
    DEFAULT: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 28,
    '3xl': 35,
    full: 9999,
  },
  typography: {
    // Heading styles
    h3Semibold: {
      fontSize: 35,
      fontWeight: '600' as const,
      lineHeight: 35,
    },
    h4Medium: {
      fontSize: 24,
      fontWeight: '500' as const,
      lineHeight: 24,
    },
    h4Regular: {
      fontSize: 24,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    // Body styles
    bodyXlSemi: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 20,
    },
    bodyXlMid: {
      fontSize: 20,
      fontWeight: '500' as const,
      lineHeight: 20,
    },
    bodyLMid: {
      fontSize: 18,
      fontWeight: '500' as const,
      lineHeight: 18,
    },
    bodyMMid: {
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 16,
    },
    bodyMRegular: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
    bodySMid: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 14,
    },
    bodySRegular: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 14,
    },
    bodyXsMid: {
      fontSize: 12,
      fontWeight: '500' as const,
      lineHeight: 12,
    },
    bodyXsRegular: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 12,
    },
    // Legacy support
    title: {
      fontSize: 28,
      fontWeight: '700' as const,
      lineHeight: 36,
    },
    h1: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
    },
    h2: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    small: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 14,
      elevation: 6,
    },
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 3,
    },
    glass: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 2,
    },
  },
  glassmorphism: {
    light: {
      backdropFilter: 'blur(10px)',
      opacity: 0.7,
    },
    dark: {
      backdropFilter: 'blur(10px)',
      opacity: 0.8,
    },
  },
  gradients: {
    overlay: {
      colors: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
    overlayTop: {
      colors: ['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
    primary: {
      colors: ['#1392ec', '#0E75C4'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
  },
} as const;
