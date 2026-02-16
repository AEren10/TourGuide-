import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = '@onboarding_completed';

interface OnboardingContextType {
  isOnboardingCompleted: boolean;
  setOnboardingCompleted: (completed: boolean) => Promise<void>;
  isLoading: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOnboardingCompleted, setIsOnboardingCompletedState] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOnboardingStatus();
  }, []);

  const loadOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      setIsOnboardingCompletedState(value === 'true');
    } catch (error) {
      console.error('Error loading onboarding status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setOnboardingCompleted = async (completed: boolean) => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, completed.toString());
      setIsOnboardingCompletedState(completed);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        isOnboardingCompleted,
        setOnboardingCompleted,
        isLoading,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};
