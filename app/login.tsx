import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Link, useRouter } from "expo-router";
import { hp, wp } from "../helpers/common";
import { theme } from "@/constants/Theme";
import EmailField from "@/components/form/EmailField";
import StyledText from "@/components/StyledText";
import PasswordInput from "@/components/form/PasswordInput";
import Button from "@/components/Button";
import StyledLink from "@/components/StyledLink";
import type { InputError } from "@/types/input";
import FormErrorsDisplay from "@/components/form/ErrorWrapper";
import { supabase } from "@/lib/supabase";

const login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const passwordRef = useRef<string | null>(null);
  const noControlRef = useRef<string | null>(null);
  const [errors, setErrors] = useState<InputError[]>([]);

  // 2 0 0 7 0 5 1 8
  const serializeEmail = (no_control: string) => {
    return `${
      no_control.length > 8 ? no_control.slice(0, 9) : no_control
    }@cdmadero.tecnm.mx`;
  };

  const resetErrors = () => {
    setErrors([]);
  };

  const validateFields = () => {
    resetErrors();
    const temporalErrors: InputError[] = [];
    /* not email empty */
    if (!noControlRef.current) {
      temporalErrors.push({
        fieldName: "email",
        errorMessage: "El campo correo no puede estar vacío, ej. l21070128",
      });
    }

    /* not password empty */
    if (!passwordRef.current) {
      temporalErrors.push({
        fieldName: "password",
        errorMessage: "El campo no puede estar vacío",
      });
    }
    /* noControl Start with 'l' */
    if (noControlRef.current && noControlRef.current.charAt(0) !== "l") {
      console.log(`Email ${noControlRef.current}@cdmadero.tecnm.mx is invalid`);
      temporalErrors.push({
        fieldName: "email",
        errorMessage: "El campo correo debe iniciar con 'l'",
      });
    }
    // if (noControlRef.current && noControlRef.current.length < 9) {
    //   temporalErrors.push({
    //     fieldName: "email",
    //     errorMessage: "El campo correo debe tener 9 caracteres",
    //   });
    // }

    setErrors(temporalErrors);
    if (temporalErrors.length > 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }
    // validate again just for safe type
    if (!noControlRef.current || !passwordRef.current) {
      return;
    }

    const email = serializeEmail(noControlRef.current);
    console.log(email);
    setEmail(email);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: passwordRef.current,
    });
    if (error) {
      console.log("Error: ", error.message);
      Alert.alert("Error", error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ height: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View style={styles.container}>
            <BackButton router={router} />
            <View>
              <StyledText style={styles.welcomeText}>Hola!, </StyledText>
              <StyledText style={styles.welcomeText}>
                Bienvenido de nuevo
              </StyledText>
            </View>
            <View style={styles.form}>
              <StyledText
                style={{
                  fontSize: hp(1.5),
                  color: theme.colors.dark.base.secondary_text,
                }}
              >
                Inicia sesión para continuar
              </StyledText>

              <EmailField
                onEndEditing={validateFields}
                inputStyle={{
                  color: theme.colors.dark.base.text,
                }}
                placeholderTextColor={theme.colors.dark.base.secondary_text}
                placeholder="lxx07xxxx"
                name="email"
                matchDomain="cdmadero.tecnm.mx"
                rightDecorator="@cdmadero.tecnm.mx"
                maxLength={9}
                onChangeText={(text) => {
                  noControlRef.current = text;
                }}
                containerStyle={{
                  marginTop: 25,
                }}
              />
              <FormErrorsDisplay errors={errors} fieldName="email" />

              <PasswordInput
                onEndEditing={validateFields}
                inputStyle={{
                  color: theme.colors.dark.base.text,
                }}
                placeholderTextColor={theme.colors.dark.base.secondary_text}
                placeholder="********"
                name="password"
                toggleVisibilityMode="eye-icon"
                secureTextEntry={hidePassword}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
                onChangeText={(text) => {
                  passwordRef.current = text;
                }}
                containerStyle={{
                  marginTop: 25,
                }}
              />
              <FormErrorsDisplay errors={errors} fieldName="password" />
              <StyledLink
                style={styles.forgotPasswordText}
                href="/forgotPassword"
              >
                Olvidaste tu contraseña?
              </StyledLink>
              <Button
                title="Iniciar sesión"
                buttonStyle={{
                  height: hp(4.5),
                  borderRadius: theme.border.radius.md,
                  marginTop: 25,
                }}
                onPress={handleSubmit}
                loading={loading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    gap: 45,
  },
  form: {
    gap: 0,
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: "bold",
    color: theme.colors.dark.base.text,
  },
  forgotPasswordText: {
    alignSelf: "flex-end",
    color: theme.colors.dark.base.secondary_text,
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
