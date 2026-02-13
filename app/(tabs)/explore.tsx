import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/navigation/BottomNav';

export default function ExploreScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <Header
        title="Keşfet"
        leftIcon={
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        }
        onLeftPress={() => router.back()}
      />
      <View style={styles.content}>
        <Text variant="h4Medium" style={{ color: theme.colors.textSecondary }}>
          Keşfet sayfası yakında gelecek...
        </Text>
      </View>
      <BottomNav />
    </View>
  );
}
