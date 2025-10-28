import React from "react";
import { TextInput, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

const SearchBar = ({
  onPress,
  placeholder,
}: {
  placeholder: string;
  onPress?: () => void;
}) => {
  return (
    <View className="bg-white mt-10 rounded-full px-4 flex-row items-center">
      <IconSymbol name="search" color={"#000"} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#374151"}
        className="flex-1 ml-2 text-gray-700"
        onChange={onPress}
      />
    </View>
  );
};

export default SearchBar;
