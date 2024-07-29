import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen options={{ headerShown: false }} name="index" />
        <Stack.Screen options={{ headerShown: false }} name="login" />
        <Stack.Screen options={{ headerShown: false }} name="informations" />
        <Stack.Screen options={{ headerShown: false }} name="where/where" />
        <Stack.Screen options={{ headerShown: false }} name="map" />
        <Stack.Screen options={{ headerShown: false }} name="confirmation" />
      </Stack>
    </PaperProvider>
  );
}