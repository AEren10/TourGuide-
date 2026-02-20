import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { SavedToursList } from '@/features/favorites/components/SavedToursList';
import { BottomNav } from '@/components/navigation/BottomNav';
import { useAuth } from '@/context/AuthContext';

export default function SavedScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    safeArea: { flex: 1 },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.md,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
      letterSpacing: -0.4,
    },
    // Guest state
    guestWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
      gap: 16,
      paddingBottom: 100,
    },
    guestIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    guestTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
      textAlign: 'center',
      letterSpacing: -0.3,
    },
    guestSub: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 21,
    },
    loginBtn: {
      marginTop: 8,
      paddingHorizontal: 32,
      paddingVertical: 14,
      borderRadius: 16,
      backgroundColor: theme.colors.primary,
    },
    loginBtnText: {
      fontSize: 15,
      fontWeight: '700',
      color: '#fff',
    },
  });

  return (
    <View style={s.container}>
      <SafeAreaView style={s.safeArea} edges={['top']}>
        <View style={s.header}>
          <Text style={s.headerTitle}>Favorilerim</Text>
        </View>

        {user ? (
          <SavedToursList />
        ) : (
          <View style={s.guestWrap}>
            <View style={s.guestIcon}>
              <Ionicons name="heart" size={36} color={theme.colors.primary} />
            </View>
            <Text style={s.guestTitle}>Favorilerini kaydet</Text>
            <Text style={s.guestSub}>
              Beğendiğin turları favorilere eklemek ve her zaman erişmek için
              giriş yap.
            </Text>
            <TouchableOpacity
              style={s.loginBtn}
              onPress={() => router.push('/auth')}
            >
              <Text style={s.loginBtnText}>Giriş Yap / Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
      <BottomNav />
    </View>
  );
}
