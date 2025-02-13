import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/context/useTheme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import { AppProvider } from '@/context/app-context';

const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Axiforma-Black': require('../assets/fonts/Axiforma-Regular.otf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
       <ThemeProvider>
        <AppProvider>
        <StatusBar style='auto' />
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ headerShown: false }} 
          />
        </Stack>
        </AppProvider>
        </ThemeProvider>
    </QueryClientProvider>
  );
}