import React, { useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { StopLocation } from '../types/map.types';

interface SwipeableStopCardsProps {
  stops: StopLocation[];
  currentStopIndex: number;
  onStopPress?: (stopId: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 100;

export const SwipeableStopCards = ({
  stops,
  currentStopIndex,
  onStopPress,
}: SwipeableStopCardsProps) => {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Auto-scroll to current stop
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: currentStopIndex * (CARD_WIDTH + 12),
        animated: true,
      });
    }
  }, [currentStopIndex]);

  const styles = StyleSheet.create({
    container: {
      paddingVertical: theme.spacing.md,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.md,
      gap: 12,
    },
    card: {
      width: CARD_WIDTH,
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      gap: theme.spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.md,
    },
    cardActive: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    cardCompleted: {
      opacity: 0.6,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    orderBadge: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    orderBadgeActive: {
      backgroundColor: theme.colors.primary,
    },
    orderBadgeInactive: {
      backgroundColor: theme.colors.surface,
    },
    orderText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    orderTextInactive: {
      color: theme.colors.text,
    },
    statusBadge: {
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: 4,
      borderRadius: theme.radius.xs,
      marginLeft: 'auto',
    },
    statusActive: {
      backgroundColor: theme.colors.primary + '20',
    },
    statusNext: {
      backgroundColor: theme.colors.surface,
    },
    statusCompleted: {
      backgroundColor: theme.colors.success + '20',
    },
  });

  const getStopStatus = (index: number) => {
    if (index < currentStopIndex) return 'completed';
    if (index === currentStopIndex) return 'active';
    return 'next';
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓ Completed';
      case 'active':
        return 'Current Stop';
      case 'next':
        return 'Next Stop';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'active':
        return theme.colors.primary;
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + 12}
      decelerationRate="fast"
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      {stops.map((stop, index) => {
        const status = getStopStatus(index);
        const isActive = status === 'active';
        const isCompleted = status === 'completed';

        return (
          <TouchableOpacity
            key={stop.id}
            style={[
              styles.card,
              isActive && styles.cardActive,
              isCompleted && styles.cardCompleted,
            ]}
            onPress={() => onStopPress?.(stop.id)}
            activeOpacity={0.7}
          >
            <View style={styles.header}>
              <View
                style={[
                  styles.orderBadge,
                  isActive || isCompleted
                    ? styles.orderBadgeActive
                    : styles.orderBadgeInactive,
                ]}
              >
                <Text
                  style={[
                    styles.orderText,
                    !isActive && !isCompleted && styles.orderTextInactive,
                  ]}
                >
                  {stop.order}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  isActive && styles.statusActive,
                  status === 'next' && styles.statusNext,
                  isCompleted && styles.statusCompleted,
                ]}
              >
                <Text
                  variant="bodyXsMid"
                  style={{ color: getStatusColor(status) }}
                >
                  {getStatusLabel(status)}
                </Text>
              </View>
            </View>

            <Text variant="bodyLMid" style={{ color: theme.colors.text }}>
              {stop.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
