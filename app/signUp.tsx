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
import TextField from "@/components/form/TextField";
import DatePicker from "react-native-date-picker";
import type { InputError } from "@/types/input";
import FormErrorsDisplay from "@/components/form/ErrorWrapper";
import { supabase } from "@/lib/supabase";

const signUp = () => {
  const tempDate = new Date();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<InputError[]>([]);
  const [openPickDate, setOpenPickDate] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [date, setDate] = useState<Date>(new Date());

  const usernameRef = useRef<string | null>(null);
  const firstNameRef = useRef<string | null>(null);
  const lastNameRef = useRef<string | null>(null);
  const emailRef = useRef<string | null>(null);
  const passwordRef = useRef<string | null>(null);
  const confirmPasswordRef = useRef<string | null>(null);

  const resetErrors = () => {
    setErrors([]);
  };

  const validateFields = () => {
    resetErrors();
    const temporalErrors: InputError[] = [];

    /* validations to username: minimum 3 len, only numbers & letter, only lowercase */
    if (!usernameRef.current) {
      temporalErrors.push({
        fieldName: "username",
        errorMessage: "El nombre de usuario no puede estar vacío",
      });
    }
    if (usernameRef.current && usernameRef.current.length < 3) {
      temporalErrors.push({
        fieldName: "username",
        errorMessage: "El nombre de usuario debe tener al menos 3 caracteres",
      });
    }
    if (usernameRef.current && !/^[a-z0-9]+$/.test(usernameRef.current)) {
      temporalErrors.push({
        fieldName: "username",
        errorMessage:
          "El nombre de usuario solo puede contener letras minusculas y números",
      });
    }
    /* validations to first_name: at least 1 word, minium 3 characters, only letters, can contain spaces */
    if (!firstNameRef.current) {
      temporalErrors.push({
        fieldName: "first_name",
        errorMessage: "El nombre no puede estar vacío",
      });
    }
    if (firstNameRef.current && firstNameRef.current.length < 3) {
      temporalErrors.push({
        fieldName: "first_name",
        errorMessage: "El nombre debe tener al menos 3 caracteres",
      });
    }
    if (firstNameRef.current && !/^[a-zA-Z ]+$/.test(firstNameRef.current)) {
      temporalErrors.push({
        fieldName: "first_name",
        errorMessage: "El nombre solo puede contener letras",
      });
    }

    /* validations to last_name: at least 1 word, minium 3 characters, only letters, can contain spaces */
    if (!lastNameRef.current) {
      temporalErrors.push({
        fieldName: "last_name",
        errorMessage: "El apellido no puede estar vacío",
      });
    }
    if (lastNameRef.current && lastNameRef.current.length < 3) {
      temporalErrors.push({
        fieldName: "last_name",
        errorMessage: "El apellido debe tener al menos 3 caracteres",
      });
    }
    if (lastNameRef.current && !/^[a-zA-Z ]+$/.test(lastNameRef.current)) {
      temporalErrors.push({
        fieldName: "last_name",
        errorMessage: "El apellido solo puede contener letras",
      });
    }

    /* validations to email: must be a valid no_control (first letter should be "l", min and max 9 characters, only letters and numbers) */
    if (!emailRef.current) {
      temporalErrors.push({
        fieldName: "email",
        errorMessage: "El numero de control no puede estar vacío",
      });
    }
    if (emailRef.current && emailRef.current.length !== 9) {
      temporalErrors.push({
        fieldName: "email",
        errorMessage: "El numero de control debe tener 9 caracteres",
      });
    }
    if (emailRef.current && emailRef.current.charAt(0) !== "l") {
      temporalErrors.push({
        fieldName: "email",
        errorMessage: "El numero de control debe iniciar con 'l'",
      });
    }
    if (emailRef.current && !/^[a-zA-Z0-9]+$/.test(emailRef.current)) {
      temporalErrors.push({
        fieldName: "email",
        errorMessage:
          "El numero de control solo puede contener letras y números",
      });
    }

    /* validations to password: at least 8 characters, at least 1 number, at least 1 uppercase, at least 1 lowercase */
    if (!passwordRef.current) {
      temporalErrors.push({
        fieldName: "password",
        errorMessage: "La contraseña no puede estar vacía",
      });
    }
    if (passwordRef.current && passwordRef.current.length < 8) {
      temporalErrors.push({
        fieldName: "password",
        errorMessage: "La contraseña debe tener al menos 8 caracteres",
      });
    }
    if (passwordRef.current && !/(?=.*\d)/.test(passwordRef.current)) {
      temporalErrors.push({
        fieldName: "password",
        errorMessage: "La contraseña debe tener al menos 1 número",
      });
    }
    if (passwordRef.current && !/(?=.*[a-z])/.test(passwordRef.current)) {
      temporalErrors.push({
        fieldName: "password",
        errorMessage: "La contraseña debe tener al menos 1 minúscula",
      });
    }
    if (passwordRef.current && !/(?=.*[A-Z])/.test(passwordRef.current)) {
      temporalErrors.push({
        fieldName: "password",
        errorMessage: "La contraseña debe tener al menos 1 mayúscula",
      });
    }

    /* validations to confirm_password: must match password */
    if (!confirmPasswordRef.current) {
      temporalErrors.push({
        fieldName: "confirm_password",
        errorMessage: "La confirmación de contraseña no puede estar vacía",
      });
    }

    if (
      confirmPasswordRef.current &&
      confirmPasswordRef.current !== passwordRef.current
    ) {
      temporalErrors.push({
        fieldName: "confirm_password",
        errorMessage: "Las contraseñas no coinciden",
      });
    }

    /* validations to birth_date: must be a valid date, debe tener almenos 18 años */
    if (!date) {
      temporalErrors.push({
        fieldName: "birth_date",
        errorMessage: "La fecha de nacimiento no puede estar vacía",
      });
    }
    if (date && tempDate.getFullYear() - date.getFullYear() < 17) {
      temporalErrors.push({
        fieldName: "birth_date",
        errorMessage: "Debes tener al menos 17 años para registrarte",
      });
    }

    setErrors(temporalErrors);
    if (temporalErrors.length > 0) {
      return false;
    }
    return true;
  };
  const serializeEmail = (no_control: string) => {
    return `${
      no_control.length > 8 ? no_control.slice(0, 9) : no_control
    }@cdmadero.tecnm.mx`;
  };
  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }
    // validate again just for safe type
    if (
      !usernameRef.current ||
      !firstNameRef.current ||
      !lastNameRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !confirmPasswordRef.current
    ) {
      return;
    }
    setLoading(true);
    const emailParsed = serializeEmail(emailRef.current);
    const { data, error } = await supabase.auth.signUp({
      email: emailParsed,
      password: passwordRef.current,
      options: {
        data: {
          full_name:
            `${firstNameRef.current.trim()} ${lastNameRef.current.trim()}`,
          username: usernameRef.current.trim(),
          no_control: emailRef.current.replace("l", "").trim(),
          birth_date: date,
        },
      },
    });
    if (error) {
      console.log("Error: ", error);
      Alert.alert("Error", error.message);
      setLoading(false);
      return;
    }
    console.log("Data: ", data);
    Alert.alert(
      "Exito",
      "Te has registrado correctamente, verifica tu correo para poder iniciar sesión. Revisa tu bandeja de entrada o spam (correo no deseado)."
    );

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
                Bienvenido a Bazaar.io
              </StyledText>
            </View>

            <View style={styles.form}>
              <StyledText
                style={{
                  fontSize: hp(1.5),
                  color: theme.colors.dark.base.secondary_text,
                }}
              >
                Ingresa tus datos a continuación
              </StyledText>

              <TextField
                inputStyle={{
                  color: theme.colors.dark.base.text,
                }}
                placeholderTextColor={theme.colors.dark.base.secondary_text}
                placeholder="Nombre de usuario"
                name="username"
                leftDecorator="@"
                containerStyle={{
                  marginTop: 25,
                }}
                onChangeText={(text) => {
                  usernameRef.current = text;
                  validateFields();
                }}
                //onEndEditing={validateFields}
              />
              <FormErrorsDisplay errors={errors} fieldName="username" />

              <TextField
                inputStyle={{
                  color: theme.colors.dark.base.text,
                }}
                placeholderTextColor={theme.colors.dark.base.secondary_text}
                placeholder="Nombre/s"
                name="first_name"
                containerStyle={{
                  marginTop: 25,
                }}
                onChangeText={(text) => {
                  firstNameRef.current = text;
                  validateFields();
                }}
              />
              <FormErrorsDisplay errors={errors} fieldName="first_name" />
              <TextField
                inputStyle={{
                  color: theme.colors.dark.base.text,
                }}
                placeholderTextColor={theme.colors.dark.base.secondary_text}
                placeholder="Apellido/s"
                name="last_name"
                containerStyle={{
                  marginTop: 25,
                }}
                onChangeText={(text) => {
                  lastNameRef.current = text;
                  validateFields();
                }}
              />
              <FormErrorsDisplay errors={errors} fieldName="last_name" />

              <EmailField
                inputStyle={{
                  color: theme.colors.dark.base.text,
                }}
                placeholderTextColor={theme.colors.dark.base.secondary_text}
                placeholder="lxx07xxxx"
                name="email"
                matchDomain="cdmadero.tecnm.mx"
                rightDecorator="@cdmadero.tecnm.mx"
                maxLength={9}
                containerStyle={{
                  marginTop: 25,
                }}
                onChangeText={(text) => {
                  emailRef.current = text;
                  validateFields();
                }}
              />
              <FormErrorsDisplay errors={errors} fieldName="email" />
              <PasswordInput
                inputStyle={{
                  color: theme.colors.dark.base.text,
                }}
                placeholderTextColor={theme.colors.dark.base.secondary_text}
                placeholder="Contraseña"
                name="password"
                toggleVisibilityMode="eye-icon"
                secureTextEntry={hidePassword}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
                containerStyle={{
                  marginTop: 25,
                }}
                onChangeText={(text) => {
                  passwordRef.current = text;
                  validateFields();
                }}
              />
              <FormErrorsDisplay errors={errors} fieldName="password" />

              <PasswordInput
                inputStyle={{
                  color: theme.colors.dark.base.text,
                }}
                placeholderTextColor={theme.colors.dark.base.secondary_text}
                placeholder="Confirmar contraseña"
                name="password"
                toggleVisibilityMode="eye-icon"
                secureTextEntry={hideConfirmPassword}
                hidePassword={hideConfirmPassword}
                setHidePassword={setHideConfirmPassword}
                containerStyle={{
                  marginTop: 25,
                }}
                onChangeText={(text) => {
                  confirmPasswordRef.current = text;
                  validateFields();
                }}
              />
              <FormErrorsDisplay errors={errors} fieldName="confirm_password" />
              <TextField
                inputStyle={{
                  color: theme.colors.dark.base.text,
                }}
                placeholderTextColor={theme.colors.dark.base.secondary_text}
                placeholder="Fecha de nacimiento"
                name="birth_date"
                disabled
                onTouchEnd={() => setOpenPickDate(true)}
                value={date?.toLocaleDateString()}
                onChangeText={() => {
                  validateFields();
                }}
                containerStyle={{
                  marginTop: 25,
                }}
              />
              <FormErrorsDisplay errors={errors} fieldName="birth_date" />
              <Button
                title="Registrarse"
                buttonStyle={{
                  height: hp(4.5),
                  borderRadius: theme.border.radius.md,
                  marginTop: 25,
                }}
                onPress={handleSubmit}
                loading={loading}
              />
              <StyledLink style={styles.forgotPasswordText} href="/login">
                Ya estas registrado?, Inicia sesión
              </StyledLink>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <DatePicker
        modal
        open={openPickDate}
        date={date}
        onConfirm={(date) => {
          setOpenPickDate(false);
          setDate(date);
          validateFields();
        }}
        onCancel={() => {
          setOpenPickDate(false);
        }}
        mode="date"
        confirmText="Confirmar"
        theme="light"
      />
    </ScreenWrapper>
  );
};

export default signUp;

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
    alignSelf: "center",
    color: theme.colors.dark.base.secondary_text,
    textDecorationLine: "underline",
    marginTop: 25,
  },
});
