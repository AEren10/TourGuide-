import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';

type PlanType = 'weekly' | 'yearly';

interface FeatureItem {
  icon: keyof typeof Ionicons.glyphMap;
  textKey: string;
}

const features: FeatureItem[] = [
  { icon: 'map', textKey: 'paywall.features.unlimitedTours' },
  { icon: 'cloud-download', textKey: 'paywall.features.offlineMode' },
  { icon: 'star', textKey: 'paywall.features.premiumContent' },
  { icon: 'eye-off', textKey: 'paywall.features.noAds' },
];

export default function PaywallScreen() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('weekly');

  const handleContinue = () => {
    // TODO: Integrate RevenueCat purchase flow
    router.replace('/(tabs)');
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const handleRestore = () => {
    // TODO: Implement restore purchases
    console.log('Restore purchases');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingTop: theme.spacing.xl + 20,
      paddingHorizontal: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
      gap: theme.spacing.sm,
    },
    closeButton: {
      alignSelf: 'flex-end',
      padding: theme.spacing.xs,
    },
    title: {
      fontSize: 34,
      fontWeight: '800',
      color: theme.colors.text,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.xl,
      paddingBottom: 140,
      gap: theme.spacing.xl,
    },
    featuresContainer: {
      gap: theme.spacing.md,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      padding: theme.spacing.md,
      backgroundColor: isDark
        ? theme.colors.surface
        : theme.colors.surfaceElevated,
      borderRadius: theme.borderRadius.lg,
    },
    featureIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark
        ? 'rgba(245, 158, 11, 0.2)'
        : 'rgba(238, 140, 43, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    featureText: {
      flex: 1,
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    plansContainer: {
      gap: theme.spacing.md,
    },
    planOption: {
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 2,
    },
    planInactive: {
      borderColor: theme.colors.border,
      backgroundColor: isDark
        ? theme.colors.surface
        : theme.colors.surfaceElevated,
    },
    planActive: {
      borderColor: theme.colors.primary,
      backgroundColor: isDark
        ? 'rgba(245, 158, 11, 0.1)'
        : 'rgba(238, 140, 43, 0.1)',
    },
    planHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.xs,
    },
    planTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
    },
    badge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: theme.colors.primary,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    planPrice: {
      fontSize: 24,
      fontWeight: '800',
      color: theme.colors.text,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: theme.spacing.xl,
      paddingBottom: theme.spacing.xl + 20,
      paddingTop: theme.spacing.md,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      gap: theme.spacing.md,
    },
    subscribeButton: {
      paddingVertical: 18,
      borderRadius: theme.borderRadius.xl,
      alignItems: 'center',
    },
    subscribeButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    footerLinks: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: theme.spacing.lg,
    },
    linkText: {
      fontSize: 13,
      color: theme.colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleSkip}>
          <Ionicons name="close" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('paywall.title')}</Text>
        <Text style={styles.subtitle}>{t('paywall.subtitle')}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons
                  name={feature.icon}
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <Text style={styles.featureText}>{t(feature.textKey)}</Text>
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={theme.colors.primary}
              />
            </View>
          ))}
        </View>

        <View style={styles.plansContainer}>
          <TouchableOpacity
            style={[
              styles.planOption,
              selectedPlan === 'weekly'
                ? styles.planActive
                : styles.planInactive,
            ]}
            onPress={() => setSelectedPlan('weekly')}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>{t('paywall.weekly')}</Text>
            </View>
            <Text style={styles.planPrice}>$4.99/week</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.planOption,
              selectedPlan === 'yearly'
                ? styles.planActive
                : styles.planInactive,
            ]}
            onPress={() => setSelectedPlan('yearly')}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>{t('paywall.yearly')}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{t('paywall.save')}</Text>
              </View>
            </View>
            <Text style={styles.planPrice}>$129.99/year</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleContinue}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryDark]}
            style={styles.subscribeButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.subscribeButtonText}>
              {t('common.continue')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={handleRestore}>
            <Text style={styles.linkText}>{t('paywall.restore')}</Text>
          </TouchableOpacity>
          <Text style={styles.linkText}>•</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>{t('paywall.terms')}</Text>
          </TouchableOpacity>
          <Text style={styles.linkText}>•</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>{t('paywall.privacy')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
