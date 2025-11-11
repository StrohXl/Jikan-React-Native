/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { ContainerTheme } from "@/app/_layout";
import { Colors } from "@/constants/theme";
import { useContext } from "react";
import { useColorScheme } from "react-native";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const themeDefault = useColorScheme();
  const context = useContext(ContainerTheme);
  const theme =
    context?.theme === "dark"
      ? "dark"
      : context?.theme === "light"
        ? "light"
        : (themeDefault ?? "dark");
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
