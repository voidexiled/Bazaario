import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/products";
import StyledText from "@/components/StyledText";
import { wp } from "@/helpers/common";
import { theme } from "@/constants/Theme";
import { getServiceById } from "@/api/services";

const ServiceDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: service, error: error } = useQuery({
    queryKey: ["service_", id],
    queryFn: () => getServiceById(id as string),
    retry: true,
  });

  return (
    <View style={[styles.container]}>
      <StyledText>
        {service?.name} - {service?.price}
      </StyledText>
    </View>
  );
};

export default ServiceDetailsScreen;

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
