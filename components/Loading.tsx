import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "@/constants/Theme";

type LoadingProps = {
  size?: number | "large" | "small" | undefined;
  color?: string;
};

const Loading = ({
  size = "small",
  color = theme.colors.dark.accent.background,
}: LoadingProps) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
