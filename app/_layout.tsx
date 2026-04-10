import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* This hides the parent header that says "(tabs)" */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Keep the 404 screen default */}
      <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
    </Stack>
  );
}