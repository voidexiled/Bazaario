import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/products";
import StyledText from "@/components/StyledText";
import { wp } from "@/helpers/common";
import { theme } from "@/constants/Theme";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: product, error: error } = useQuery({
    queryKey: ["product_", id],
    queryFn: () => getProductById(id as string),
    retry: true,
  });

  return (
    <View style={[styles.container]}>
      <StyledText>
        {product?.name} - {product?.price}
      </StyledText>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: wp(4),
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.dark.base.background_active,
  },
});
