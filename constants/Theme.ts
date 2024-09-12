import type { DimensionValue } from "react-native";

// Base Colors
const baseBackground = "#1a1a1a";
const baseBackground_Hover = "#292929";
const baseBackground_Active = "#0f0f0f";
const baseText = "#ffffff";
const baseSecondaryText = "#b3b3b3";

// Accent Colors
const accentBackground = "#ff6666";
const accentBackground_Hover = "#ff6f6f";
const accentBackground_Active = "#e60000";
const accentText = "#ffffff";
const accentSecondaryText = "#ffd1d1";

// Error Colors
const errorBackground = "#d32f2f";
const errorBackground_Hover = "#f44336";
const errorBackground_Active = "#b71c1c";
const errorText = "#ffffff";
const errorSecondaryText = "#ffb3b3";

// Success Colors
const successBackground = "#4caf50";
const successBackground_Hover = "#66bb6a";
const successBackground_Active = "#388e3c";
const successText = "#ffffff";
const successSecondaryText = "#c8e6c9";

// Disabled Colors
const disabledBackground = "#616161";
const disabledText = "#9e9e9e";
const disabledSecondaryText = "#bdbdbd";

export const theme = {
  colors: {
    dark: {
      base: {
        background: baseBackground,
        background_hover: baseBackground_Hover,
        background_active: baseBackground_Active,
        text: baseText,
        secondary_text: baseSecondaryText,
        background_low_opacity: `${baseBackground_Active}50`,
      },
      accent: {
        background: accentBackground,
        background_hover: accentBackground_Hover,
        background_active: accentBackground_Active,
        text: accentText,
        secondary_text: accentSecondaryText,
      },
      error: {
        background: errorBackground,
        background_hover: errorBackground_Hover,
        background_active: errorBackground_Active,
        text: errorText,
        secondary_text: errorSecondaryText,
      },
      success: {
        background: successBackground,
        background_hover: successBackground_Hover,
        background_active: successBackground_Active,
        text: successText,
        secondary_text: successSecondaryText,
      },
      disabled: {
        background: disabledBackground,
        text: disabledText,
        secondary_text: disabledSecondaryText,
      },
      defaults: {
        dark_blue: {
          "100": "#e6f0ff",
          "200": "#b3ccff",
          "300": "#80aaff",
          "400": "#4d86ff",
          "500": "#1a63ff",
          "600": "#0047e6",
          "700": "#0039bf",
          "800": "#002a99",
          "900": "#001c73",
        },
        light_blue: {
          "100": "#e6f7ff",
          "200": "#b3ecff",
          "300": "#80e0ff",
          "400": "#4dc4ff",
          "500": "#00a8ff",
          "600": "#0086cc",
          "700": "#006699",
          "800": "#004466",
          "900": "#002233",
        },
        cyan: {
          "100": "#e6fffb",
          "200": "#b3fff2",
          "300": "#80ffe8",
          "400": "#4dffd9",
          "500": "#00ffcc",
          "600": "#00ccb3",
          "700": "#009999",
          "800": "#006666",
          "900": "#003333",
        },
      },
    },
  },
  fonts: {
    family: {},
    size: {
      xs: 12,
      s: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
      xxxxl: 60,
      xxxxxl: 120,
    },
    weight: {
      medium: "500",
      semibold: "600",
      bold: "700",
      extraBold: "800",
    },
  },
  spacing: {
    xs: 6,
    s: 8,
    md: 12,
    lg: 18,
    xl: 24,
    xxl: 36,
  },
  border: {
    radius: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 22,
    },
    width: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
      xxl: 6,
    },
  },
  sizes: {
    percent: {
      full: "100%" as DimensionValue,
      half: "50%" as DimensionValue,
      third: "33.33%" as DimensionValue,
      fourth: "25%" as DimensionValue,
      fifth: "20%" as DimensionValue,
      sixth: "16.66%" as DimensionValue,
      seventh: "14.28%" as DimensionValue,
      eighth: "12.5%" as DimensionValue,
      ninth: "11.11%" as DimensionValue,
      tenth: "10%" as DimensionValue,
    },
  },
};
