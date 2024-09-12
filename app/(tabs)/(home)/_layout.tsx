import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
