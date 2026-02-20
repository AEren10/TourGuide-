import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/theme';
import { OnboardingProvider, useOnboarding } from '@/context/OnboardingContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { store } from '@/store';
import '@/lib/i18n';

function RootLayoutNav() {
  const { isOnboardingCompleted, isLoading: onboardingLoading } =
    useOnboarding();
  const { user, isLoading: authLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (onboardingLoading || authLoading) return;

    const inOnboarding = segments[0] === 'onboarding';
    const inPaywall = segments[0] === 'paywall';
    const inAuth = segments[0] === 'auth';

    // 1. Onboarding tamamlanmamışsa → onboarding
    if (!isOnboardingCompleted && !inOnboarding && !inPaywall) {
      router.replace('/onboarding');
      return;
    }

    // 2. Giriş yapıldıysa auth sayfasında kalmasın → tabs
    if (isOnboardingCompleted && user && inAuth) {
      router.replace('/(tabs)');
      return;
    }

    // NOT: Giriş yapılmamış kullanıcı misafir olarak gezebilir.
    // Profile/saved tab'larına tıklandığında BottomNav login'e yönlendirir.
  }, [isOnboardingCompleted, user, segments, onboardingLoading, authLoading]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="paywall" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="destination-detail" />
      <Stack.Screen name="stop-detail" />
      <Stack.Screen name="tour-detail" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <OnboardingProvider>
            <RootLayoutNav />
          </OnboardingProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
