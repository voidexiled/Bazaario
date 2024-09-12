import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import React from "react";
import { ArrowLeft01Icon } from "hugeicons-react-native";
import { theme } from "@/constants/Theme";
import type { Router } from "expo-router";

const BackButton = ({
  router,
  color = theme.colors.dark.base.text,
  sticky = false,
  style,
}: {
  router: Router;
  color?: string | undefined;
  sticky?: boolean;
  style?: ViewStyle;
}) => {
  return (
    <Pressable
      onPress={() => {
        router.back();
      }}
      style={[
        styles.button,
        sticky && { position: "absolute", top: 0, left: 0 },
        style && style,
      ]}
    >
      <ArrowLeft01Icon strokeWidth={2.5} size={32} color={color} />
    </Pressable>
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
