import { RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { theme } from "@/constants/Theme";
import { FlashList } from "@shopify/flash-list";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { hp, wp } from "@/helpers/common";
import { getServicesByUserId } from "@/api/services";
import ServiceView from "@/components/mystore/service/ServiceView";

const index = () => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const { data, error, refetch } = useQuery({
    queryKey: ["services", user?.id],
    queryFn: () => getServicesByUserId(user?.id!),
    retry: true,
  });

  const handleOnRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

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
          horizontal={false}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleOnRefresh}
            />
          }
          estimatedItemSize={300}
          data={data}
          renderItem={(service) => {
            return <ServiceView service={service.item} />;
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
                No hay servicios
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

    paddingHorizontal: wp(4),
    paddingVertical: hp(3),
  },
});
