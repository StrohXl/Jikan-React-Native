import React from "react";
import {
  TextInput,
  TextInputChangeEvent,
  TextInputKeyPressEvent,
  View,
} from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

const SearchBar = ({
  onKeyPress,
  placeholder,
  onChange,
  defaultValue = "",
  ref,
}: {
  ref?: React.Ref<TextInput | null>;
  placeholder: string;
  onKeyPress?: (value: TextInputKeyPressEvent) => void;
  onChange?: (value: TextInputChangeEvent) => void;
  defaultValue?: string;
}) => {
  return (
    <View className="bg-gray-900 text-gray-200 rounded-full px-4 flex-row items-center">
      <IconSymbol name="search" color={"#fff"} />
      <TextInput
        ref={ref}
        placeholder={placeholder}
        placeholderTextColor={"#374151"}
        className="flex-1 ml-2 text-gray-200"
        onChange={onChange}
        onKeyPress={onKeyPress}
        defaultValue={defaultValue}
      />
    </View>
  );
};

export default SearchBar;
