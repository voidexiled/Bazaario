import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import React from "react";
import type { Tables } from "@/database.types";
import StyledText from "../StyledText";
import { theme } from "@/constants/Theme";
import { hp, wp } from "@/helpers/common";
type TagsScrollTypes = {
  tags: Tables<"tags">[] | undefined;
  horizontal?: boolean;
  style?: ViewStyle;
};
const TagsScroll = ({ tags, style, horizontal = true }: TagsScrollTypes) => {
  console.log(tags);
  return (
    <ScrollView
      style={{ width: "100%" }}
      horizontal
      contentContainerStyle={[styles.container, style]}
      showsHorizontalScrollIndicator={false}
    >
      <View
        style={{
          height: hp(3),
          width: "100%",
          flexDirection: horizontal ? "row" : "column",
          alignItems: "center",
        }}
      >
        {tags?.map((tag, index) => {
          return (
            <View
              key={index}
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
                paddingHorizontal: 12,
                paddingVertical: 6,
                height: 30,

                borderRadius: theme.border.radius.sm,
                //              backgroundColor: theme.colors.dark.base.background_low_opacity,
                backgroundColor: "#2a2a2a60",
              }}
            >
              <StyledText>{tag.name}</StyledText>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default TagsScroll;

const styles = StyleSheet.create({ container: { paddingHorizontal: wp(4.5) } });
