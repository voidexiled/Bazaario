import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";
import React, { useRef } from "react";
import type { InputProps } from "@/types/input";
import StyledText from "../StyledText";
import { theme } from "@/constants/Theme";
import { hp, wp } from "@/helpers/common";

const TextField = ({
  disabled,
  onTouchEnd,
  placeholder,
  value,
  onChangeText,
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
  placeholderTextColor,
  autoCapitalize,
  keyboardType,
  name,
  returnKeyType,
}: InputProps) => {
  const ref = useRef<TextInput | null>(null);
  return (
    <View
      onTouchEnd={() => {
        if (ref.current) {
          ref.current.focus();
        }
        onTouchEnd?.();
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
        ref={ref}
        focusable={!disabled}
        selectionColor={theme.colors.dark.accent.background}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, inputStyle]}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
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

export default TextField;

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
