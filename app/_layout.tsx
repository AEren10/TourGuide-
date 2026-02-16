import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/theme';
import { OnboardingProvider, useOnboarding } from '@/context/OnboardingContext';
import { AuthProvider } from '@/context/AuthContext';
import { store } from '@/store';
import '@/lib/i18n';

function RootLayoutNav() {
  const { isOnboardingCompleted, isLoading } = useOnboarding();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(tabs)';
    const inOnboarding = segments[0] === 'onboarding';
    const inPaywall = segments[0] === 'paywall';

    if (!isOnboardingCompleted && !inOnboarding && !inPaywall) {
      router.replace('/onboarding');
    } else if (isOnboardingCompleted && (inOnboarding || inPaywall)) {
      router.replace('/(tabs)');
    }
  }, [isOnboardingCompleted, segments, isLoading]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="paywall" />
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
