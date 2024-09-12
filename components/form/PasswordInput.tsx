import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import type { PasswordInputProps } from "@/types/input";
import StyledText from "@/components/StyledText";
import { theme } from "@/constants/Theme";
import { hp, wp } from "@/helpers/common";
import {
  EyeIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
} from "hugeicons-react-native";

const PasswordInput = ({
  placeholderTextColor,
  autoCapitalize,
  keyboardType,
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
  toggleVisibilityMode,
  secureTextEntry,
  hidePassword,
  setHidePassword,
  name,
  returnKeyType,
  onEndEditing,
}: PasswordInputProps) => {
  const ref = useRef<TextInput | null>(null);
  return (
    <View
      style={[styles.container, containerStyle]}
      onTouchEnd={() => {
        if (ref.current) {
          ref.current.focus();
        }
      }}
    >
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <TextInput
        onEndEditing={onEndEditing}
        style={[styles.input, inputStyle]}
        selectionColor={theme.colors.dark.accent.background}
        placeholderTextColor={placeholderTextColor}
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
      {toggleVisibilityMode &&
      toggleVisibilityMode === "none" ? null : toggleVisibilityMode ===
        "text" ? (
        <TouchableOpacity
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
          style={{
            position: "absolute",
            right: wp(2),
            top: hp(1),
          }}
        >
          <StyledText
            style={{
              color: theme.colors.dark.base.secondary_text,
              textAlign: "center",
            }}
          >
            {hidePassword ? "Mostrar" : "Ocultar"}
          </StyledText>
        </TouchableOpacity>
      ) : toggleVisibilityMode === "eye-icon" ? (
        <TouchableOpacity
          style={[styles.rightDecorator]}
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          {hidePassword ? (
            <ViewIcon size={24} color={theme.colors.dark.base.secondary_text} />
          ) : (
            <ViewOffIcon
              size={24}
              color={theme.colors.dark.base.secondary_text}
            />
          )}
        </TouchableOpacity>
      ) : toggleVisibilityMode === "lock-icon" ? (
        <TouchableOpacity
          style={[styles.rightDecorator]}
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <LockIcon size={24} color={theme.colors.dark.base.secondary_text} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
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
    textAlignVertical: "center",
  },
  leftIcon: {},
  rightDecorator: {
    height: "100%",
    paddingHorizontal: wp(3),
    justifyContent: "center",
    alignItems: "center",
  },
});
