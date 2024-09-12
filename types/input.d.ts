import type { TextStyle, ViewProps, ViewStyle } from "react-native";

export type InputProps = {
  onEndEditing?: () => void;
  onTouchEnd?: () => void;
  disabled?: boolean;
  name?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftDecorator?: string;
  rightDecorator?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad"
    | "decimal-pad"
    | "visible-password"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "name-phone-pad"
    | "twitter"
    | "web-search"
    | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  autoCorrect?: boolean;
  autoFocus?: boolean;
  inputStyle?: ViewStyle | TextStyle | undefined;
  containerStyle?: ViewStyle | undefined;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  returnKeyType?:
    | "done"
    | "go"
    | "next"
    | "search"
    | "send"
    | "none"
    | "previous"
    | "default"
    | "emergency-call"
    | "google"
    | "join"
    | "route"
    | "yahoo"
    | "bar"
    | "clear"
    | undefined;
};

export type EmailInputProps = InputProps & {
  matchDomain?: string;
};

export type PasswordInputProps = InputProps & {
  toggleVisibilityMode: "none" | "text" | "eye-icon" | "lock-icon";
  hidePassword: boolean;
  setHidePassword: (hidePassword: boolean) => void;
};

export type PhoneInputProps = InputProps & {};

export type FieldName =
  | "email"
  | "password"
  | "phone"
  | "username"
  | "first_name"
  | "last_name"
  | "birth_date"
  | "confirm_password";
export type InputError = {
  fieldName: FieldName;
  errorMessage: string;
};
