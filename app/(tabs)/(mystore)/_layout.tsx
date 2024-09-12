import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { theme } from "@/constants/Theme";
import { View } from "react-native";
import { hp, wp } from "@/helpers/common";
import BackButton from "@/components/BackButton";
import StyledText from "@/components/StyledText";

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
          name="(products)"
          options={{
            header: (props) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: wp(4),
                  paddingVertical: 20,
                  backgroundColor: theme.colors.dark.base.background,
                  position: "relative",
                }}
              >
                <BackButton
                  router={router}
                  style={{
                    position: "absolute",
                    top: 20,
                    left: wp(4),
                  }}
                />
                <StyledText
                  style={{
                    fontSize: hp(2.5),
                  }}
                >
                  {props.options.title}
                </StyledText>
              </View>
            ),
            title: "Productos",
            headerStyle: {
              backgroundColor: theme.colors.dark.base.background,
            },
            headerTitleStyle: {
              color: theme.colors.dark.base.text,
            },
          }}
        />
      </Stack>
    </View>
  );
}
