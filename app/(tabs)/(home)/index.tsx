import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import { theme } from "@/constants/Theme";
import StyledText from "@/components/StyledText";

const index = () => {
  return (
    <View style={styles.container}>
      <StyledText>Inicio</StyledText>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.dark.base.background_active,
  },
});
