import {
  Animated,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import type { Tables } from "@/database.types";
import { theme } from "@/constants/Theme";
import StyledText from "@/components/StyledText";
import { useRouter } from "expo-router";

const ProductMiniSquare = ({ product }: { product: Tables<"products"> }) => {
  const router = useRouter();
  const [scale] = useState(new Animated.Value(1));
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };
  const handleOnPress = () => {
    router.push(`/(products)/product_details/${product.id}`);
  };
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        style={styles.container}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleOnPress}
      >
        <StyledText style={{ color: theme.colors.dark.base.secondary_text }}>
          {product.name}
        </StyledText>
      </Pressable>
    </Animated.View>
  );
};

export default ProductMiniSquare;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: theme.colors.dark.base.background_low_opacity,
    alignItems: "center",
    padding: 10,
    borderRadius: theme.border.radius.md,
    borderCurve: "continuous",
    marginRight: 25,
  },
});
