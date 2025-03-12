import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  Home01Icon,
  Menu01Icon,
  Menu02Icon,
  Menu03Icon,
  Menu06Icon,
  Menu08Icon,
  Menu10Icon,
  MenuCircleIcon,
  MenuRestaurantIcon,
  MenuSquareIcon,
  ProfileIcon,
  Store01Icon,
  UserCircleIcon,
  UserIcon,
} from "hugeicons-react-native";
import { theme } from "@/constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import { TabBar } from "@/components/TabBar";

const _layout = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      initialRouteName="home"
      backBehavior="order"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: theme.colors.dark.accent.background,
        headerStyle: {
          backgroundColor: theme.colors.dark.base.background,
        },
        header: (props) => <HeaderBar {...props} />,
        headerTitleStyle: {
          color: theme.colors.dark.base.text,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: theme.colors.dark.base.background_active,
      }}
      safeAreaInsets={insets}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size, focused }) => (
            <Home01Icon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(mystore)"
        options={{
          title: "Mi tienda",
          tabBarIcon: ({ color, size }) => (
            <Store01Icon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(menu)"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <MenuSquareIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
