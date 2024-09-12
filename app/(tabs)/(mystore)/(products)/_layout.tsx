import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { theme } from "@/constants/Theme";
import { View } from "react-native";
import BackButton from "@/components/BackButton";
import { wp } from "@/helpers/common";

export default function _layout() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.dark.base.background_active,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          contentStyle: {
            backgroundColor: theme.colors.dark.base.background_active,
          },
        }}
      >
        <Stack.Screen name="index" />

        <Stack.Screen
          name="product_details/[id]"
          options={({ route, navigation }) => ({
            title: "Detalles del producto",
            headerShown: false,
            headerStyle: {
              backgroundColor: theme.colors.dark.base.background,
            },
            headerTitleStyle: {
              color: theme.colors.dark.base.text,
            },
          })}
        />
      </Stack>
    </View>
  );
}
