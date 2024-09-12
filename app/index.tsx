import Loading from "@/components/Loading";
import ScreenWrapper from "@/components/ScreenWrapper";
import { wp } from "@/helpers/common";
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

const index = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={[styles.container]}>
        <Loading size="large" />
      </View>
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    gap: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});
