import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

interface MapPreviewProps {
  latitude: number;
  longitude: number;
  address: string;
  title: string;
}

export const MapPreview = ({
  latitude,
  longitude,
  address,
}: MapPreviewProps) => {
  const { theme } = useTheme();

  const handleOpenMap = () => {
    const url = `https://maps.google.com/?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const styles = StyleSheet.create({
    container: {
      gap: theme.spacing.sm,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    icon: {
      fontSize: 20,
    },
    mapContainer: {
      marginHorizontal: theme.spacing.md,
      borderRadius: theme.radius.lg,
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
      ...theme.shadows.card,
    },
    mapPlaceholder: {
      height: 200,
      backgroundColor: theme.colors.surfaceLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapIcon: {
      marginBottom: theme.spacing.sm,
    },
    overlay: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surfaceElevated,
      gap: theme.spacing.xs,
    },
    addressRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.xs,
    },
    addressText: {
      flex: 1,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.xs,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radius.md,
      marginTop: theme.spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>📍</Text>
        <Text variant="bodyXlSemi" style={{ color: theme.colors.text }}>
          Location
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons
            name="map"
            size={48}
            color={theme.colors.textSecondary}
            style={styles.mapIcon}
          />
          <Text
            variant="bodySRegular"
            style={{ color: theme.colors.textSecondary }}
          >
            {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </Text>
        </View>

        <View style={styles.overlay}>
          <View style={styles.addressRow}>
            <Ionicons name="location" size={20} color={theme.colors.primary} />
            <Text
              variant="bodyMRegular"
              style={{ color: theme.colors.text, ...styles.addressText }}
            >
              {address}
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleOpenMap}>
            <Ionicons name="navigate" size={20} color="#FFFFFF" />
            <Text variant="bodyMMid" style={{ color: '#FFFFFF' }}>
              View on Map
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
