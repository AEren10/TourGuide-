import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { SavedToursList } from '@/features/favorites/components/SavedToursList';
import { BottomNav } from '@/components/navigation/BottomNav';

export default function SavedScreen() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.xxl,
      paddingBottom: theme.spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h4Medium" style={{ color: theme.colors.text }}>
          Saved Tours
        </Text>
      </View>
      <SavedToursList />
      <BottomNav />
    </View>
  );
}
