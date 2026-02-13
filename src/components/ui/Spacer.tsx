import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/theme';

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

export const Spacer = ({ size = 'md' }: SpacerProps) => {
  const { theme } = useTheme();
  return <View style={{ height: theme.spacing[size] }} />;
};
