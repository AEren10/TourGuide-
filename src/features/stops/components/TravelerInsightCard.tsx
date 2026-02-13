import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { TravelerInsight } from '../types/stop.types';

interface TravelerInsightCardProps {
  insight: TravelerInsight;
}

export const TravelerInsightCard = ({ insight }: TravelerInsightCardProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: 300,
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      gap: theme.spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.sm,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    userInfo: {
      flex: 1,
      gap: 2,
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    verifiedBadge: {
      fontSize: 14,
    },
    tip: {
      lineHeight: 20,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: insight.userAvatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text variant="bodyMMid" style={{ color: theme.colors.text }}>
              {insight.userName}
            </Text>
            {insight.isVerified && <Text style={styles.verifiedBadge}>✓</Text>}
          </View>
          <Text
            variant="bodyXsRegular"
            style={{ color: theme.colors.textSecondary }}
          >
            {new Date(insight.timestamp).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <Text
        variant="bodyMRegular"
        style={{ color: theme.colors.text, ...styles.tip }}
      >
        {insight.tip}
      </Text>

      <View style={styles.footer}>
        <Text style={{ fontSize: 16 }}>👍</Text>
        <Text
          variant="bodySRegular"
          style={{ color: theme.colors.textSecondary }}
        >
          {insight.helpful} found this helpful
        </Text>
      </View>
    </View>
  );
};
