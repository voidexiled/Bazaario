import { StyleSheet, Text, View, type TextProps } from "react-native";
import React, { type FunctionComponent } from "react";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/Theme";
import { Link, type Href } from "expo-router";

const StyledText: FunctionComponent<TextProps> = ({
  children,
  style,
  ...rest
}) => {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

export default StyledText;

const styles = StyleSheet.create({
  text: {
    fontSize: hp(1.5),
    color: theme.colors.dark.base.text,
    fontFamily: "SegoeUI",
  },
});
