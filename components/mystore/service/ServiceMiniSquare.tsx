import { Animated, Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import type { Tables } from "@/database.types";
import { theme } from "@/constants/Theme";
import StyledText from "@/components/StyledText";
import { useRouter } from "expo-router";
import ItemImage from "../ItemImage";

const ServiceMiniSquare = ({
  service,
}: {
  service: Tables<"services"> & {
    service_images: Tables<"service_images">[];
    service_reviews: Tables<"service_reviews">[];
  };
}) => {
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
    router.push(`/(products)/product_details/${service.id}`);
  };
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        style={styles.container}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleOnPress}
      >
        <StyledText
          numberOfLines={1}
          style={{
            color: theme.colors.dark.base.secondary_text,
            paddingBottom: 10,
          }}
        >
          {service.name}
        </StyledText>
        <View
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            borderRadius: theme.border.radius.xs,
            borderCurve: "continuous",
            overflow: "hidden",
            backgroundColor: theme.colors.dark.base.background,
          }}
        >
          {service.service_images && service.service_images.length > 0 && (
            <ItemImage
              bucket="services"
              imageUrl={service.service_images[0].image_url}
              style={{
                width: "100%",
                height: "100%",
              }}
              userId={service.user_uuid}
            />
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default ServiceMiniSquare;

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
