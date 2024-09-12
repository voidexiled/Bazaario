import { StyleSheet, View, type ViewStyle } from "react-native";
import React from "react";
import type { InputError, FieldName } from "@/types/input";
import StyledText from "../StyledText";
import { theme } from "@/constants/Theme";

const FormErrorsDisplay = ({
  errors,
  fieldName,
  style,
}: {
  errors: InputError[];
  fieldName: FieldName;
  style?: ViewStyle;
}) => {
  return (
    <View style={[errors.length > 0 && styles.container, style]}>
      {errors
        .filter((error) => error.fieldName === fieldName)
        .map((error, index) => {
          return (
            <StyledText
              key={index}
              style={{ color: theme.colors.dark.error.background }}
            >
              {error.errorMessage}
            </StyledText>
          );
        })}
    </View>
  );
};

export default FormErrorsDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 5,

    paddingHorizontal: 5,
  },
});
