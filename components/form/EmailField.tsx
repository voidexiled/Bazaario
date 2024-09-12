import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import type { EmailInputProps } from "@/types/input";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/Theme";
import { Animated } from "react-native";
import StyledText from "../StyledText";
const EmailField = ({
  placeholderTextColor,
  autoCapitalize,
  keyboardType,
  placeholder,
  value,
  onChangeText,
  matchDomain,
  containerStyle,
  inputStyle,
  autoCorrect,
  autoFocus,
  maxLength,
  multiline,
  numberOfLines,
  leftIcon,
  rightIcon,
  leftDecorator,
  rightDecorator,
  secureTextEntry,
  onEndEditing,
}: EmailInputProps) => {
  const ref = useRef<TextInput | null>(null);

  return (
    <View
      onTouchEnd={() => {
        if (ref.current) {
          ref.current.focus();
        }
      }}
      style={[styles.container, containerStyle]}
    >
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {leftDecorator && (
        <View style={[styles.leftDecorator]}>
          <StyledText style={[styles.decoratorText]}>
            {leftDecorator}
          </StyledText>
        </View>
      )}
      <TextInput
        onEndEditing={onEndEditing}
        ref={ref}
        selectionColor={theme.colors.dark.accent.background}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, inputStyle]}
        autoCapitalize={autoCapitalize}
        keyboardType="email-address"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
      />
      {rightDecorator && (
        <View style={[styles.rightDecorator]}>
          <StyledText style={[styles.decoratorText]}>
            {rightDecorator}
          </StyledText>
        </View>
      )}
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </View>
  );
};

export default EmailField;

const styles = StyleSheet.create({
  //   container_focused: {
  //     backgroundColor: "#ff4f4f1A",
  //     borderColor: theme.colors.dark.accent.background,
  //   },
  //   decoratorContainer_focused: {
  //     backgroundColor: theme.colors.dark.base.background_active,
  //     borderColor: theme.colors.dark.accent.background,
  //   },
  //   decoratorText_focused: {
  //     color: theme.colors.dark.base.text,
  //   },
  container_focused: {},
  decoratorContainer_focused: {},
  decoratorText_focused: {},
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: hp(4.5),

    position: "relative",
    borderColor: theme.colors.dark.base.secondary_text,
    borderRadius: theme.border.radius.sm,
    borderWidth: 1,
    overflow: "hidden",
  },
  input: {
    fontSize: hp(1.5),
    letterSpacing: 1,
    flex: 1,
    paddingHorizontal: wp(4),
  },
  leftIcon: {},
  rightIcon: {},
  leftDecorator: {
    height: "100%",
    paddingLeft: wp(3),
    justifyContent: "center",
    alignItems: "center",
  },
  rightDecorator: {
    height: "100%",
    paddingHorizontal: wp(3),
    justifyContent: "center",
    alignItems: "center",
  },
  decoratorText: {
    letterSpacing: 1,
    color: theme.colors.dark.base.secondary_text,
    fontSize: hp(1.5),
  },
});
