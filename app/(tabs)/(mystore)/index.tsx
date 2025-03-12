import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { theme } from "@/constants/Theme";
import { hp, wp } from "@/helpers/common";
import ProductsHorizontalList from "@/components/mystore/product/ProductsHorizontalList";
import { useQuery } from "@tanstack/react-query";
import { getProductsByUserId } from "@/api/products";
import { useAuth } from "@/contexts/AuthContext";
import { getServicesByUserId } from "@/api/services";
import ServicesHorizontalList from "@/components/mystore/service/ServicesHorizontalList";
import TabPageWrapper from "@/components/wrappers/TabPageWrapper";
import styled from "styled-components/native";

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
    queryKey: ["products", user?.id],
    queryFn: () => getProductsByUserId(user?.id!),
    retry: true,
  });

  const {
    data: servicesData,
    error: servicesError,
    isFetching: servicesFetching,
    refetch: refetchServices,
  } = useQuery({
    queryKey: ["services", user?.id],
    queryFn: () => getServicesByUserId(user?.id!),
    retry: true,
  });

  const handleOnRefresh = async () => {
    setRefreshing(true);
    await refetchProducts();
    await refetchServices();
    setRefreshing(false);
  };

  return (
    <TabPageWrapper
      refreshControl={true}
      refreshing={refreshing}
      onRefresh={handleOnRefresh}
    >
      <ContainerView>
        <ProductsHorizontalList products={productsData} />
        <ServicesHorizontalList services={servicesData} />
      </ContainerView>
    </TabPageWrapper>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingVertical: hp(3),
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.dark.base.background_active,
  },
});

const ContainerView = styled.View`
  gap: 15px;
`;
