import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/theme';
import { store } from '@/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="destination-detail" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
