import type {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import type React from "react";
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from "react-native-safe-area-context";
import { TouchableOpacity, View } from "react-native";
import { theme } from "@/constants/Theme";
import { hp } from "@/helpers/common";

export const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        //marginHorizontal: 10,
        borderCurve: "continuous",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.colors.dark.base.background,
        elevation: 6,
        shadowColor: "#000",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const icon = options.tabBarIcon;
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
              paddingBottom: 2,
              flexDirection: "column",
              gap: 4,
              /*borderBottomColor: isFocused
                  ? theme.accentColor.val
                  : "transparent",
                borderBottomWidth: 2,*/
            }}
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icon?.({
              focused: isFocused,
              color: isFocused
                ? theme.colors.dark.base.text
                : theme.colors.dark.base.secondary_text,
              size: hp(3),
            })}
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: hp(100),
                backgroundColor: isFocused
                  ? theme.colors.dark.accent.background
                  : "transparent",
              }}
            />
            {/* <Text
                style={{
                  color: isFocused ? theme.accentColor.val : theme.color8.val,
                  fontSize: 16,
                  opacity: isFocused ? 1 : 0.8,
                }}
              >
                {label}
              </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
