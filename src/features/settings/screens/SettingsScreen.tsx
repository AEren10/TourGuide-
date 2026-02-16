import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';
import {
  isAnalyticsEnabled,
  setAnalyticsEnabled,
  AnalyticsEvents,
  trackEvent,
} from '@/utils/analytics';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  type?: 'switch' | 'link';
  onPress?: () => void;
}

const SettingItem = ({
  icon,
  title,
  description,
  value,
  onValueChange,
  type = 'link',
  onPress,
}: SettingItemProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.sm,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaceLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    textContainer: {
      flex: 1,
      gap: 4,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    description: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color={theme.colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      {type === 'switch' && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: theme.colors.surfaceLight,
            true: theme.colors.primary,
          }}
          thumbColor="#FFFFFF"
        />
      )}
      {type === 'link' && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.textSecondary}
        />
      )}
    </View>
  );
};

export const SettingsScreen = () => {
  const { theme } = useTheme();
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const enabled = await isAnalyticsEnabled();
    setAnalyticsConsent(enabled);
  };

  const handleAnalyticsToggle = async (enabled: boolean) => {
    setAnalyticsConsent(enabled);
    await setAnalyticsEnabled(enabled);

    // Track the change (will only log if analytics was enabled)
    if (enabled) {
      await trackEvent(AnalyticsEvents.ANALYTICS_OPT_IN);
    } else {
      await trackEvent(AnalyticsEvents.ANALYTICS_OPT_OUT);
    }

    Alert.alert(
      enabled ? 'Analytics Enabled' : 'Analytics Disabled',
      enabled
        ? 'Thank you for helping us improve TourGuide!'
        : 'Your choice has been saved. We will not collect any usage data.',
      [{ text: 'OK' }]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.md,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: '800',
      color: theme.colors.text,
    },
    scrollContent: {
      padding: theme.spacing.md,
      gap: theme.spacing.lg,
    },
    section: {
      gap: theme.spacing.xs,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: theme.spacing.xs,
      paddingHorizontal: theme.spacing.xs,
    },
    versionText: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.xl,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <SettingItem
            icon="analytics-outline"
            title="Share Anonymous Usage Data"
            description="Help us improve TourGuide by sharing anonymous usage statistics. No personal information is collected."
            type="switch"
            value={analyticsConsent}
            onValueChange={handleAnalyticsToggle}
          />
          <SettingItem
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            description="Learn how we protect your data"
            onPress={() => {
              // TODO: Open privacy policy URL
              Alert.alert('Privacy Policy', 'Opening Privacy Policy...');
            }}
          />
          <SettingItem
            icon="document-text-outline"
            title="Terms of Service"
            description="Read our terms and conditions"
            onPress={() => {
              // TODO: Open terms URL
              Alert.alert('Terms of Service', 'Opening Terms of Service...');
            }}
          />
        </View>

        {/* Account Section (Future) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingItem
            icon="person-outline"
            title="Account Settings"
            description="Manage your profile and preferences"
            onPress={() => {
              Alert.alert(
                'Coming Soon',
                'Account management will be available soon.'
              );
            }}
          />
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <SettingItem
            icon="notifications-outline"
            title="Push Notifications"
            description="Get notified about tour updates"
            onPress={() => {
              Alert.alert(
                'Coming Soon',
                'Notification settings will be available soon.'
              );
            }}
          />
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <SettingItem
            icon="information-circle-outline"
            title="About TourGuide"
            description="Version 1.0.0"
            onPress={() => {
              Alert.alert(
                'TourGuide',
                'Version 1.0.0\n\nExplore cities with curated, self-guided tours.\n\n© 2026 TourGuide'
              );
            }}
          />
          <SettingItem
            icon="help-circle-outline"
            title="Help & Support"
            description="Get help or send feedback"
            onPress={() => {
              Alert.alert('Help & Support', 'Contact: support@tourguide.com');
            }}
          />
        </View>

        <Text style={styles.versionText}>TourGuide v1.0.0</Text>
      </ScrollView>
    </View>
  );
};
