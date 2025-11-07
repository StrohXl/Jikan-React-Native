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
  colorIcon = "#fff",
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
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center gap-1 justify-center bg-gray-900 ${status && "!bg-gray-700"} rounded-full px-5`}
      style={{
        borderWidth: 1,
        height,
        borderColor: status ? "#374151" : "#9ca3af",
      }}
    >
      <ThemedText
        color={"#fff"}
        className="capitalize !text-[15px]"
        type="default"
      >
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
            color={colorIcon}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Tag;
