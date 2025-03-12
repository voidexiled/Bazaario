import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeft01Icon } from "hugeicons-react-native";
import { theme } from "@/constants/Theme";
import type { Router } from "expo-router";
import { hp } from "@/helpers/common";

const BackButton = ({
  router,
  color = theme.colors.dark.base.text,
  sticky = false,
  style,
  wrapperStyle,
}: {
  router: Router;
  color?: string | undefined;
  sticky?: boolean;
  style?: ViewStyle;
  wrapperStyle?: ViewStyle;
}) => {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[{ transform: [{ scale }] }, wrapperStyle && wrapperStyle]}
    >
      <Pressable
        onPress={() => {
          router.back();
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.button,
          sticky && { position: "absolute", top: 0, left: 0 },
          style && style,
        ]}
      >
        <ArrowLeft01Icon strokeWidth={2.5} size={hp(3)} color={color} />
      </Pressable>
    </Animated.View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: theme.border.radius.sm,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
});
