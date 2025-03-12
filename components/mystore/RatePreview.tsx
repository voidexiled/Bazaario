import { StyleSheet, Text, View, type ViewStyle } from "react-native";
import React, { useState } from "react";
import { StarIcon, UserCircleIcon, UserIcon } from "hugeicons-react-native";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/Theme";
import type { Tables } from "@/database.types";
import StyledText from "../StyledText";

type RatePreviewProps = {
  rates: Tables<"product_reviews">[] | Tables<"service_reviews">[];
  style?: ViewStyle;
  starViewStyle?: ViewStyle;
  showCount?: boolean;
};
const RatePreview = ({
  showCount,
  rates,
  style,
  starViewStyle,
}: RatePreviewProps) => {
  const [rate, setRate] = useState<number>(
    rates.reduce((a, b) => a + b.rating, 0) / rates.length
  );
  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          {
            flexDirection: "row",
            gap: 4,
          },
        ]}
      >
        {Array.from({ length: 5 }, (_, i) => {
          return (
            <View key={i} style={[styles.starView, starViewStyle]}>
              {i < rate ? (
                <StarIcon size={hp(2)} color="#FFD700" fill="#FFD700" />
              ) : (
                <StarIcon
                  size={hp(2)}
                  color={theme.colors.dark.base.secondary_text}
                />
              )}
            </View>
          );
        })}
      </View>
      {showCount && (
        <View style={styles.count}>
          <StyledText style={{ color: theme.colors.dark.base.secondary_text }}>
            ({rates.length})
          </StyledText>
        </View>
      )}
    </View>
  );
};

export default RatePreview;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  starView: {},
  count: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
