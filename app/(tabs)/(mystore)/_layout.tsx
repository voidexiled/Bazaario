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
            headerShown: true,
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
                  elevation: 6,
                  shadowColor: "#000",
                }}
              >
                <BackButton
                  router={router}
                  wrapperStyle={{
                    position: "absolute",
                    top: 20,
                    left: wp(4),
                  }}
                  style={{
                    backgroundColor:
                      theme.colors.dark.base.background_low_opacity,
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
        <Stack.Screen
          name="(services)"
          options={{
            headerShown: true,
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
                  elevation: 6,
                  shadowColor: "#000",
                }}
              >
                <BackButton
                  router={router}
                  wrapperStyle={{
                    position: "absolute",
                    top: 20,
                    left: wp(4),
                  }}
                  style={{
                    backgroundColor:
                      theme.colors.dark.base.background_low_opacity,
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
            title: "Servicios",
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
