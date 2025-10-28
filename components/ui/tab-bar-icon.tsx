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
      className={`flex-row w-fit rounded-full  my-auto  text-gray-700 items-center gap-1 justify-center ${focused && "bg-gray-200"}`}
    >
      <IconSymbol
        size={28}
        style={{
          width: 40,
        }}
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
