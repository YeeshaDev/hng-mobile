import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { ThemeProvider } from '@/hooks/useTheme';

const queryClient = new QueryClient();

export default function RootLayout() {
  const theme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
       <ThemeProvider>
        <StatusBar style='auto' />
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ headerShown: false }} 
          />
        </Stack>
        </ThemeProvider>
    </QueryClientProvider>
  );
}