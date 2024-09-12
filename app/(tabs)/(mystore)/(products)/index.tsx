import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "@/constants/Theme";

const index = () => {
  return (
    <View style={[styles.container]}>
      <Text>index</Text>
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
