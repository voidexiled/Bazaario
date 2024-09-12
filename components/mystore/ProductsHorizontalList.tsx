import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import StyledText from "../StyledText";
import type { Tables } from "@/database.types";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/Theme";
import ProductMiniSquare from "./ProductMiniSquare";
import { ArrowRight01Icon } from "hugeicons-react-native";
import { FlashList } from "@shopify/flash-list";

import { Animated } from "react-native";
import { useRouter } from "expo-router";
const ProductsHorizontalList = ({
  products,
}: {
  products: Tables<"products">[] | null | undefined;
}) => {
  const router = useRouter();
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
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

  return (
    <View
      style={{
        minHeight: hp(25),
        backgroundColor: theme.colors.dark.base.background,
        width: "100%",
        padding: 20,
        flexDirection: "column",
        borderRadius: theme.border.radius.lg,
        borderCurve: "continuous",
        gap: 20,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          flexDirection: "row",
          height: hp(4),
        }}
      >
        <StyledText style={{ fontSize: hp(2.6), fontWeight: "bold" }}>
          Productos
        </StyledText>
        <Animated.View
          style={[
            { transform: [{ scale }] },
            {
              position: "absolute",
              right: 0,
              top: 0,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: hp(4.5),
              backgroundColor: theme.colors.dark.base.background_low_opacity,
              borderRadius: theme.border.radius.sm,
              borderCurve: "continuous",
            },
          ]}
        >
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => {
              router.push("/(products)");
            }}
          >
            <ArrowRight01Icon
              color={theme.colors.dark.base.text}
              size={hp(2.6)}
            />
          </Pressable>
        </Animated.View>
      </View>
      <View
        style={{
          height: hp(20),
          width: wp(100),
        }}
      >
        <FlashList
          estimatedItemSize={20}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={products}
          ListEmptyComponent={() => (
            <View
              style={{
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledText
                style={{ color: theme.colors.dark.base.secondary_text }}
              >
                No hay productos
              </StyledText>
            </View>
          )}
          renderItem={(product) => {
            return (
              <ProductMiniSquare product={product.item} key={product.item.id} />
            );
          }}
        />
      </View>
    </View>
  );
};

export default ProductsHorizontalList;

const styles = StyleSheet.create({});
