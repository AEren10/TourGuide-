import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/lib/i18n';
import { useOnboarding } from '@/context/OnboardingContext';

type Language = 'en' | 'tr';

export default function SettingsScreen() {
  const { theme, isDark, mode, setMode } = useTheme();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { setOnboardingCompleted } = useOnboarding();
  const systemColorScheme = useColorScheme();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    setCurrentLanguage(i18n.language as Language);
  }, []);

  const handleThemeChange = (newMode: 'light' | 'dark' | 'auto') => {
    setMode(newMode);
  };

  const handleLanguageChange = async (lang: Language) => {
    try {
      await changeLanguage(lang);
      setCurrentLanguage(lang);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const handleResetOnboarding = () => {
    Alert.alert(
      t('settings.resetOnboarding'),
      'Are you sure you want to reset onboarding?',
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await setOnboardingCompleted(false);
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  const handleRemoveAds = () => {
    router.push('/paywall');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    backButton: {
      padding: theme.spacing.xs,
      marginLeft: -theme.spacing.xs,
    },
    title: {
      flex: 1,
      fontSize: 34,
      fontWeight: '800',
      color: theme.colors.text,
      letterSpacing: -0.8,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 100,
      gap: theme.spacing.xl,
    },
    section: {
      gap: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.textTertiary,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: theme.spacing.xs,
    },
    themeOptions: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    themeOption: {
      flex: 1,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 2,
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    themeOptionActive: {
      borderColor: theme.colors.primary,
      backgroundColor: isDark
        ? 'rgba(245, 158, 11, 0.1)'
        : 'rgba(238, 140, 43, 0.1)',
    },
    themeOptionInactive: {
      borderColor: theme.colors.border,
      backgroundColor: isDark
        ? theme.colors.surface
        : theme.colors.surfaceElevated,
    },
    themeIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.xs,
    },
    themeIconActive: {
      backgroundColor: theme.colors.primary,
    },
    themeIconInactive: {
      backgroundColor: isDark
        ? theme.colors.surfaceElevated
        : theme.colors.surfaceLight,
    },
    themeLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.text,
    },
    themeDescription: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing.md,
      backgroundColor: isDark
        ? theme.colors.surface
        : theme.colors.surfaceElevated,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      flex: 1,
    },
    settingIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark
        ? 'rgba(245, 158, 11, 0.2)'
        : 'rgba(238, 140, 43, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    settingText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    settingValue: {
      fontSize: 15,
      color: theme.colors.textSecondary,
    },
    infoCard: {
      backgroundColor: isDark
        ? theme.colors.surface
        : theme.colors.surfaceElevated,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 1,
      borderColor: theme.colors.border,
      gap: theme.spacing.xs,
    },
    infoText: {
      fontSize: 13,
      color: theme.colors.textSecondary,
    },
  });

  const getThemeDescription = (themeMode: 'light' | 'dark' | 'auto') => {
    return t(`settings.${themeMode}`);
  };

  const getCurrentThemeInfo = () => {
    if (mode === 'auto') {
      const themeType = systemColorScheme === 'dark' ? 'dark' : 'light';
      return t('settings.themeInfo', { theme: themeType });
    }
    return t('settings.themeInfo', { theme: mode });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('settings.title')}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.appearance')}</Text>

          <View style={styles.themeOptions}>
            <TouchableOpacity
              style={[
                styles.themeOption,
                mode === 'light'
                  ? styles.themeOptionActive
                  : styles.themeOptionInactive,
              ]}
              onPress={() => handleThemeChange('light')}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.themeIcon,
                  mode === 'light'
                    ? styles.themeIconActive
                    : styles.themeIconInactive,
                ]}
              >
                <Ionicons
                  name="sunny"
                  size={22}
                  color={
                    mode === 'light' ? '#FFFFFF' : theme.colors.textTertiary
                  }
                />
              </View>
              <Text style={styles.themeLabel}>{t('settings.light')}</Text>
              <Text style={styles.themeDescription}>
                {getThemeDescription('light')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeOption,
                mode === 'dark'
                  ? styles.themeOptionActive
                  : styles.themeOptionInactive,
              ]}
              onPress={() => handleThemeChange('dark')}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.themeIcon,
                  mode === 'dark'
                    ? styles.themeIconActive
                    : styles.themeIconInactive,
                ]}
              >
                <Ionicons
                  name="moon"
                  size={22}
                  color={
                    mode === 'dark' ? '#FFFFFF' : theme.colors.textTertiary
                  }
                />
              </View>
              <Text style={styles.themeLabel}>{t('settings.dark')}</Text>
              <Text style={styles.themeDescription}>
                {getThemeDescription('dark')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeOption,
                mode === 'auto'
                  ? styles.themeOptionActive
                  : styles.themeOptionInactive,
              ]}
              onPress={() => handleThemeChange('auto')}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.themeIcon,
                  mode === 'auto'
                    ? styles.themeIconActive
                    : styles.themeIconInactive,
                ]}
              >
                <Ionicons
                  name="phone-portrait"
                  size={22}
                  color={
                    mode === 'auto' ? '#FFFFFF' : theme.colors.textTertiary
                  }
                />
              </View>
              <Text style={styles.themeLabel}>{t('settings.auto')}</Text>
              <Text style={styles.themeDescription}>
                {getThemeDescription('auto')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>💡 {getCurrentThemeInfo()}</Text>
          </View>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.language')}</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() =>
              handleLanguageChange(currentLanguage === 'en' ? 'tr' : 'en')
            }
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons
                  name="language"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <Text style={styles.settingText}>{t('settings.language')}</Text>
            </View>
            <Text style={styles.settingValue}>
              {currentLanguage === 'en'
                ? t('settings.english')
                : t('settings.turkish')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Premium Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.premium')}</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleRemoveAds}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons name="star" size={20} color={theme.colors.primary} />
              </View>
              <Text style={styles.settingText}>{t('settings.removeAds')}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.textTertiary}
            />
          </TouchableOpacity>
        </View>

        {/* Other Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.other')}</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleResetOnboarding}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons
                  name="refresh"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <Text style={styles.settingText}>
                {t('settings.resetOnboarding')}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.textTertiary}
            />
          </TouchableOpacity>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>{t('settings.version')}: 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
