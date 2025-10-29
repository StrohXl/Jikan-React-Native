import React from "react";
import { View } from "react-native";
import { ThemedText } from "../themed-text";
import { IconSymbol } from "./icon-symbol";
import { NameMaterialIcons } from "./models/name-material-icons";

const TabBarIcon = ({
  title,
  icon,
  focused,
}: {
  title: string;
  icon: NameMaterialIcons;
  focused: boolean;
}) => {
  return (
    <View
      className={`flex-row min-w-[125] h-[45] mt-2 rounded-full text-gray-700 items-center gap-1 justify-center ${focused && "bg-gray-200"}`}
      style={{ width: "100%" }}
    >
      <IconSymbol
        size={28}
        name={icon}
        color={focused ? "#1f2937" : "#6b7280"}
      />
      {focused && (
        <ThemedText type="defaultSemiBold" color="#1f2937">
          {title}
        </ThemedText>
      )}
    </View>
  );
};

export default TabBarIcon;
