import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "@/constants/Theme";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { hp, wp } from "@/helpers/common";
import Button from "@/components/Button";
import { Link, useRouter } from "expo-router";
import WelcomeSvgImage from "@/components/svgs/WelcomeImage";
import StyledText from "@/components/StyledText";

const welcome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handlePress = () => {
    // if (isLoading) return;
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);
    router.push("/signUp");
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.topTextContainer}>
          <StyledText style={styles.title}>Bazaar.io</StyledText>
          <StyledText style={styles.punchline}>
            Vende lo que sabes, compra lo que necesitas
          </StyledText>
        </View>
        <View style={styles.footer}>
          <WelcomeSvgImage
            style={{
              marginBottom: hp(5),
            }}
          />
          <Button
            title="Vamos!"
            buttonStyle={{
              height: hp(5.5),
              borderRadius: theme.border.radius.md,
              //              backgroundColor: theme.colors.dark.defaults.dark_blue[600],
            }}
            textStyle={{
              fontSize: hp(2),
              fontWeight: "700",
            }}
            onPress={handlePress}
            loading={isLoading}
            loadingSize="large"
          />
          <Link href="/login" style={styles.bottomTextContainer}>
            <StyledText style={styles.alreadyHaveAccountText}>
              ¿Ya tienes una cuenta?,
              <StyledText style={styles.loginText}> Inicia sesión</StyledText>
            </StyledText>
          </Link>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.dark.base.background,
    paddingHorizontal: wp(4),
    color: theme.colors.dark.base.text,
  },
  welcomeImage: {
    height: hp(30),
    width: wp(100),
  },
  topTextContainer: {
    gap: theme.spacing.lg,
    paddingTop: hp(10),
  },
  title: {
    fontSize: hp(6),
    textAlign: "center",
    color: theme.colors.dark.base.text,
    fontWeight: "800",
  },
  punchline: {
    textAlign: "center",
    color: theme.colors.dark.base.secondary_text,
    paddingHorizontal: wp(10),
    fontSize: hp(1.9),
  },
  footer: {
    gap: 15,
    width: theme.sizes.percent.full,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(8),
  },

  bottomTextContainer: {
    paddingBottom: hp(6.5),
  },
  alreadyHaveAccountText: {
    textAlign: "center",
    color: theme.colors.dark.base.secondary_text,
    fontSize: hp(1.6),
  },
  loginText: {
    color: theme.colors.dark.accent.background,
    fontSize: hp(1.6),
    fontWeight: "semibold",
  },
});
