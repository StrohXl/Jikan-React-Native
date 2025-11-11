import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { Pressable } from "react-native";
import { ThemedText } from "./themed-text";
import { IconSymbol } from "./ui/icon-symbol";

const ContainerRadioButton = ({
  checked,
  title,
  onPress,
}: {
  title: string;
  checked: boolean;
  onPress?: () => void;
}) => {
  const colors = {
    primary: useThemeColor({}, "primary"),
  };
  return (
    <Pressable
      onPress={onPress}
      style={{ backgroundColor: colors.primary }}
      className="flex-row gap-4 items-center p-4 rounded-md"
    >
      <IconSymbol
        name={checked ? "radio-button-checked" : "radio-button-off"}
      />
      <ThemedText type="defaultSemiBold">{title}</ThemedText>
    </Pressable>
  );
};

export default ContainerRadioButton;
