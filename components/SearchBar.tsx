import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import {
  TextInput,
  TextInputChangeEvent,
  TouchableOpacity,
  View,
} from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

const SearchBar = ({
  onSubmitEditing,
  placeholder,
  onChange,
  defaultValue = "",
  ref,
  text,
  onPressClose,
}: {
  text: string;
  ref?: React.Ref<TextInput | null>;
  placeholder: string;
  onSubmitEditing?: () => void;
  onChange?: (value: TextInputChangeEvent) => void;
  defaultValue?: string;
  onPressClose?: () => void;
}) => {
  const primaryColorTheme = useThemeColor({}, "primary");
  const darkLightColorTheme = useThemeColor({}, "darkLight");
  const textColor = useThemeColor({}, "text");
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: darkLightColorTheme,
        backgroundColor: primaryColorTheme,
      }}
      className=" rounded-full ps-4 px-1 flex-row items-center"
    >
      <IconSymbol name="search" size={20} />
      <TextInput
        returnKeyType="search"
        ref={ref}
        value={text}
        placeholder={placeholder}
        style={{ padding: 0, height: 32, color: textColor }}
        placeholderTextColor={`${textColor}80`}
        className="flex-1 ps-2"
        onChange={onChange}
        onSubmitEditing={onSubmitEditing}
        defaultValue={defaultValue}
      />
      {text !== "" && (
        <TouchableOpacity onPress={onPressClose}>
          <View className="justify-center px-4" style={{ height: 32 }}>
            <IconSymbol name="close" size={16} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
