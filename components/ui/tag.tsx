import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { StyleProp, TextStyle, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";
import { IconSymbol } from "./icon-symbol";
import { NameMaterialIcons } from "./models/name-material-icons";

const Tag = ({
  status,
  title,
  onPress,
  showIcon = false,
  nameIcon,
  sizeIcon,
  styleIcon,
  colorIcon,
}: {
  nameIcon?: NameMaterialIcons;
  showIcon?: boolean;
  sizeIcon?: number;
  title: string;
  status: boolean;
  onPress?: () => void;
  styleIcon?: StyleProp<TextStyle>;
  colorIcon?: string;
}) => {
  const height = 30;

  const colorsTheme = {
    primary: useThemeColor({}, "primary"),
    background: useThemeColor({}, "background"),
    dark: useThemeColor({}, "dark"),
    darkLight: useThemeColor({}, "darkLight"),
    text: useThemeColor({}, "text"),
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row  items-center gap-1 justify-center rounded-full px-5`}
      style={{
        backgroundColor: !status ? colorsTheme.background : colorsTheme.primary,
        borderWidth: 1,
        borderColor: !status ? colorsTheme.dark : colorsTheme.darkLight,
        height,
      }}
    >
      <ThemedText className="capitalize !text-[15px]" type="default">
        {title}
      </ThemedText>
      {showIcon && (
        <View
          style={{
            padding: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconSymbol
            style={styleIcon}
            size={sizeIcon}
            name={nameIcon ?? "10k"}
            color={colorIcon ? colorIcon : colorsTheme.text}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Tag;
