import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "@/constants/Theme";
import StyledText from "@/components/StyledText";
import { hp, wp } from "@/helpers/common";
import { FlashList } from "@shopify/flash-list";
import ProductsHorizontalList from "@/components/mystore/ProductsHorizontalList";
import { useQuery } from "@tanstack/react-query";
import { getProductsByUserId } from "@/api/products";
import { useAuth } from "@/contexts/AuthContext";

const store_sections = [
  { key: "products", name: "Productos" },
  { key: "services", name: "Servicios" },
  { key: "posts", name: "Publicaciones" },
];

const index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const {
    data: productsData,
    error: productsError,
    isFetching: productsFetching,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductsByUserId(user?.id!),
    retry: true,
  });

  const handleOnRefresh = async () => {
    setRefreshing(true);
    await refetchProducts();
    setRefreshing(false);
  };
  useEffect(() => {
    if (productsError) {
      console.log(productsError);
    }
    console.log(productsData);
  }, [productsData]);

  return (
    <ScrollView
      style={[styles.container]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleOnRefresh}
          //tintColor={theme.colors.dark.accent.background}
        />
      }
    >
      <ProductsHorizontalList products={productsData} />
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
    paddingVertical: 10,
    paddingHorizontal: wp(4),

    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.dark.base.background_active,
  },
});
