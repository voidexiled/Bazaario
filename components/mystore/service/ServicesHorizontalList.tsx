import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import StyledText from "../../StyledText";
import type { Tables } from "@/database.types";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/Theme";
import ProductMiniSquare from "../product/ProductMiniSquare";
import { ArrowRight01Icon } from "hugeicons-react-native";
import { FlashList } from "@shopify/flash-list";

import { Animated } from "react-native";
import { useRouter } from "expo-router";
import ServiceMiniSquare from "./ServiceMiniSquare";
const ServicesHorizontalList = ({
  services,
}: {
  services:
    | (Tables<"services"> & {
        service_images: Tables<"service_images">[];
        service_reviews: Tables<"service_reviews">[];
      })[]
    | null
    | undefined;
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
    <Animated.View style={[{ transform: [{ scale }] }, styles.container]}>
      <View style={styles.header}>
        <Pressable
          style={styles.titleButton}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => {
            router.push("/(services)");
          }}
        >
          <StyledText style={styles.titleText}>Servicios</StyledText>
          <View style={[styles.rightArrowView]}>
            <ArrowRight01Icon
              color={theme.colors.dark.base.text}
              size={hp(3)}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.body}>
        {services && services.length === 0 ? (
          <EmptyServices />
        ) : (
          <FlashList
            estimatedItemSize={200}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={services}
            renderItem={(product) => {
              return (
                <ServiceMiniSquare
                  service={product.item}
                  key={product.item.id}
                />
              );
            }}
            contentContainerStyle={{
              paddingHorizontal: wp(4.5),
            }}
          />
        )}
      </View>
    </Animated.View>
  );
};

export default ServicesHorizontalList;

const EmptyServices = () => {
  return (
    <View
      style={{
        height: 200,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StyledText style={{ color: theme.colors.dark.base.secondary_text }}>
        No hay servicios
      </StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: hp(25),
    backgroundColor: theme.colors.dark.base.background,
    width: "100%",

    flexDirection: "column",
    borderRadius: theme.border.radius.xs,
    borderCurve: "continuous",
    gap: 20,
    elevation: 6,
    shadowColor: "#000",
    overflow: "hidden",
  },
  header: {
    paddingTop: wp(4.1),
    paddingHorizontal: wp(4.1),
  },
  titleButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
    height: hp(4),
    backgroundColor: theme.colors.dark.base.background_low_opacity,
    borderRadius: theme.border.radius.md,
    borderCurve: "continuous",
  },
  titleText: {
    fontSize: hp(2.6),
    fontWeight: "bold",
  },
  rightArrowView: {
    position: "absolute",
    right: 0,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: 5,
  },
  body: {
    flexDirection: "row",
    minHeight: 3,
    minWidth: 3,
    height: hp(20),
    marginBottom: wp(4.1),
  },
});
