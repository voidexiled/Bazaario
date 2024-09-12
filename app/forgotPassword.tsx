import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import StyledText from "@/components/StyledText";
import { wp } from "@/helpers/common";
import BackButton from "@/components/BackButton";
import { useRouter } from "expo-router";

const forgotPassword = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={[styles.container]}>
        <BackButton router={router} />
        <View>
          <StyledText>forgotPassword</StyledText>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default forgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    gap: 45,
  },
});
