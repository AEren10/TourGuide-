import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewProps } from 'react-native';
import { useTheme } from '@/theme';

interface SkeletonProps extends ViewProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  variant?: 'rectangle' | 'circle' | 'text';
}

export const Skeleton = ({
  width = '100%',
  height = 20,
  borderRadius,
  variant = 'rectangle',
  style,
  ...props
}: SkeletonProps) => {
  const { theme } = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  const getVariantStyle = () => {
    switch (variant) {
      case 'circle':
        return {
          width: height,
          height,
          borderRadius: height / 2,
        };
      case 'text':
        return {
          width,
          height: height,
          borderRadius: theme.radius.xs,
        };
      case 'rectangle':
      default:
        return {
          width,
          height,
          borderRadius: borderRadius ?? theme.radius.sm,
        };
    }
  };

  const styles = StyleSheet.create({
    skeleton: {
      backgroundColor: theme.colors.surface,
      overflow: 'hidden',
    },
  });

  return (
    <Animated.View
      style={[styles.skeleton, getVariantStyle() as any, { opacity }, style]}
      {...props}
    />
  );
};

// Convenience component for multiple text lines
interface SkeletonTextProps extends ViewProps {
  lines?: number;
  gap?: number;
}

export const SkeletonText = ({
  lines = 3,
  gap = 8,
  style,
  ...props
}: SkeletonTextProps) => {
  return (
    <View style={[{ gap }, style]} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? '70%' : '100%'}
          height={16}
        />
      ))}
    </View>
  );
};
