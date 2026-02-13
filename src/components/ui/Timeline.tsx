import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/theme';

interface TimelineItemProps extends ViewProps {
  marker?: React.ReactNode;
  showLine?: boolean;
  isLast?: boolean;
  children: React.ReactNode;
}

export const TimelineItem = ({
  marker,
  showLine = true,
  isLast = false,
  children,
  style,
  ...props
}: TimelineItemProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    markerContainer: {
      alignItems: 'center',
    },
    marker: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    line: {
      width: 2,
      flex: 1,
      backgroundColor: theme.colors.border,
      marginTop: theme.spacing.xs,
    },
    content: {
      flex: 1,
      paddingBottom: isLast ? 0 : theme.spacing.lg,
    },
  });

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.markerContainer}>
        {marker || <View style={styles.marker} />}
        {showLine && !isLast && <View style={styles.line} />}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

interface TimelineProps extends ViewProps {
  children: React.ReactNode;
}

export const Timeline = ({ children, style, ...props }: TimelineProps) => {
  return (
    <View style={style} {...props}>
      {children}
    </View>
  );
};
