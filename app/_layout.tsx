import { useFonts } from "expo-font";
import {
  Redirect,
  Stack,
  useRootNavigationState,
  useRouter,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { theme } from "@/constants/Theme";
import { AppState, View } from "react-native";
import BackButton from "@/components/BackButton";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Providers from "@/components/Providers";
import { onlineManager } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

export default function _layout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    SegoeUI: require("../assets/fonts/segoe-ui.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <RootLayout />
    </Providers>
  );
}

function RootLayout() {
  //const colorScheme = useColorScheme();
  //const rootNavigationState = useRootNavigationState();
  const router = useRouter();

  const { user, setUser, signOut } = useAuth();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        router.replace("/(tabs)/(home)");
      } else {
        router.replace("/welcome");
        signOut();
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        router.replace("/(tabs)/(home)");
      } else {
        signOut();
        router.replace("/welcome");
      }
    });
  }, []);

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.dark.base.background }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.dark.base.background,
          },
          statusBarAnimation: "slide",
          //animation: "ios",
          animation: "fade",
          statusBarStyle: "light",
          statusBarTranslucent: true,
          navigationBarColor: theme.colors.dark.base.background,
        }}
      >
        <Stack.Screen name="welcome" redirect={!!user} />
        <Stack.Screen name="signUp" redirect={!!user} />
        <Stack.Screen name="login" redirect={!!user} />
        <Stack.Screen name="(tabs)" redirect={!user} />
      </Stack>
    </View>
  );
}
