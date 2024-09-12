import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import type React from "react";
import type { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/constants/Theme";
import StyledText from "./StyledText";
import { hp, wp } from "@/helpers/common";
import {
  Profile02Icon,
  ProfileIcon,
  UserAccountIcon,
  UserCircle02Icon,
  UserCircleIcon,
} from "hugeicons-react-native";
const HeaderBar: React.FC<BottomTabHeaderProps> = ({
  layout,
  navigation,
  options,
  route,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          height: 65 + insets.top,
          paddingTop: insets.top,
        },
      ]}
    >
      <StyledText
        style={{
          fontSize: hp(2.5),
        }}
      >
        {options.title}
      </StyledText>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <UserCircleIcon color={theme.colors.dark.base.text} size={hp(3)} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.dark.base.background,
    width: "100%",
    paddingHorizontal: wp(4),
    shadowColor: theme.colors.dark.base.text,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
  },
});
