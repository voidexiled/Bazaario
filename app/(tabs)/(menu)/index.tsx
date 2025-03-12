import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "@/constants/Theme";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { hp, wp } from "@/helpers/common";

const index = () => {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error.message);
      return;
    }
    console.log("Signed out successfully");
  };
  return (
    <View style={styles.container}>
      <Button title="Cerrar Sesión" onPress={signOut} />
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
    paddingVertical: hp(3),
    paddingHorizontal: wp(4),
  },
});
