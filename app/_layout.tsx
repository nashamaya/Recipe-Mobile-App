import { Link, Stack } from "expo-router";
import "../global.css";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
