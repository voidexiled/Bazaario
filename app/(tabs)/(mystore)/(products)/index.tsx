import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "@/constants/Theme";
import { FlashList } from "@shopify/flash-list";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getProductsByUserId } from "@/api/products";
import ProductView from "@/components/mystore/product/ProductView";
import { hp, wp } from "@/helpers/common";

const index = () => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const { data, error, refetch } = useQuery({
    queryKey: ["products", user?.id],
    queryFn: () => getProductsByUserId(user?.id!),
  });

  const handleOnRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    data?.map((product) => {
      console.log(product.product_images)
    })
  }, [data])

  return (
    <View style={[styles.container]}>
      <View
        style={{
          minHeight: 100,
          height: "100%",
          width: "100%",
        }}
      >
        <FlashList
          contentContainerStyle={{
            paddingHorizontal: wp(4),
            paddingVertical: hp(3),
          }}
          horizontal={false}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleOnRefresh}
              //tintColor={theme.colors.dark.accent.background}
            />
          }
          estimatedItemSize={300}
          data={data}
          renderItem={(product) => {
            return <ProductView product={product.item} />;
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: theme.colors.dark.base.secondary_text }}>
                No hay productos
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.dark.base.background_active,
  },
});
