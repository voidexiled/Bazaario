import { StyleSheet, Text, View } from "react-native";
import type { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/constants/Theme";
type ScreenWrapperProps = {
  children?: ReactNode;
  bgColor?: string;
};

const ScreenWrapper = ({ children, bgColor }: ScreenWrapperProps) => {
  const { top, bottom } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View
      style={{
        flex: 1,
        paddingTop,
        paddingBottom: bottom,
        backgroundColor: bgColor ?? theme.colors.dark.base.background,
      }}
    >
      {children}
    </View>
  );
};

export default ScreenWrapper;
