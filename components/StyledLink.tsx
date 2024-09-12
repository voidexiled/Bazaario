import { StyleSheet, Text, View, type TextProps } from "react-native";
import React, { type FunctionComponent } from "react";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/Theme";
import { Link, type Href, type LinkProps } from "expo-router";

const StyledLink: FunctionComponent<LinkProps<"href">> = ({
  children,
  style,
  ...rest
}) => {
  return (
    <Link style={[styles.text, style]} {...rest}>
      {children}
    </Link>
  );
};

export default StyledLink;

const styles = StyleSheet.create({
  text: {
    fontSize: hp(1.5),
    color: theme.colors.dark.base.text,
    fontFamily: "SegoeUI",
  },
});
