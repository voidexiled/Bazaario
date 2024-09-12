import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { theme } from "@/constants/Theme";
import { View } from "react-native";

export default function _layout() {
  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.dark.base.background }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}
