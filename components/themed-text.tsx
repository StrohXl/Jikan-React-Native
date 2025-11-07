import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TextProps,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  color?: string;
};

export function ThemedText({
  style,
  color,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const colorTheme = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  if (type === "link") {
    return (
      <TouchableOpacity>
        <Text style={[styles.link, style, { color: "#9ca3af" }]} {...rest} />
      </TouchableOpacity>
    );
  } else {
    return (
      <Text
        style={[
          color ? { color: color } : { color: colorTheme },
          type === "default" ? styles.default : undefined,
          type === "title" ? styles.title : undefined,
          type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
          type === "subtitle" ? styles.subtitle : undefined,
          style,
        ]}
        {...rest}
      />
    );
  }
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontWeight: 500,
  },
});
