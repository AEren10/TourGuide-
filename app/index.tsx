import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: Check if user has completed onboarding
  // For now, always redirect to onboarding
  return <Redirect href="/onboarding" />;
}
