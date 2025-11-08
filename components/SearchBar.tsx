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
  return (
    <View
      style={{ borderWidth: 1, borderColor: "#9ca3af" }}
      className="bg-gray-950 gray-400 rounded-full ps-4 px-1 flex-row items-center"
    >
      <IconSymbol name="search" size={20} color={"#9ca3af"} />
      <TextInput
        returnKeyType="search"
        ref={ref}
        value={text}
        placeholder={placeholder}
        style={{ padding: 0, height: 32 }}
        placeholderTextColor={"#9ca3af"}
        className="flex-1 ps-2 text-gray-200"
        onChange={onChange}
        onSubmitEditing={onSubmitEditing}
        defaultValue={defaultValue}
      />
      {text !== "" && (
        <TouchableOpacity onPress={onPressClose}>
          <View className="justify-center px-4" style={{ height: 32 }}>
            <IconSymbol name="close" size={16} color={"#9ca3af"} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
