// Fallback for using MaterialIcons on Android and web.

import { useThemeColor } from "@/hooks/use-theme-color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";
import { NameMaterialIcons } from "./models/name-material-icons";

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: NameMaterialIcons;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const textColor = useThemeColor(
    { light: undefined, dark: undefined },
    "text"
  );

  return (
    <MaterialIcons
      color={color ? color : textColor}
      size={size}
      name={name}
      style={style}
    />
  );
}
