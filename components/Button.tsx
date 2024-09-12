import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextProps,
  type TextStyle,
  type TouchableNativeFeedbackProps,
  type TouchableOpacityProps,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import type React from "react";
import { theme } from "@/constants/Theme";
import { hp } from "@/helpers/common";
import Loading from "@/components/Loading";
import StyledText from "./StyledText";

type CustomButtonProps = {
  buttonStyle?: ViewStyle | undefined;
  textStyle?: TextStyle | undefined;
  title: string;
  onPress?: () => void;
  loading?: boolean;
  hasShadow?: boolean;
  loadingSize?: number | "large" | "small" | undefined;
};
const Button = ({
  buttonStyle,
  textStyle,
  title = "",
  loading = false,
  hasShadow = false,
  loadingSize = "small",
  onPress = () => {},
}: CustomButtonProps) => {
  const shadowStyle: ViewStyle = {
    shadowColor: theme.colors.dark.base.background,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  };

  if (loading) {
    return (
      <View
        style={[styles.button, buttonStyle, { backgroundColor: "#00000000" }]}
      >
        <Loading size={loadingSize} />
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, buttonStyle, hasShadow && shadowStyle]}
    >
      <StyledText style={[styles.text, textStyle]}>{title}</StyledText>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.dark.accent.background,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: theme.border.radius.xl,
    height: hp(4.5),
  },
  text: {
    color: theme.colors.dark.accent.text,
    fontSize: hp(1.7),
    fontWeight: "700",
  },
});
