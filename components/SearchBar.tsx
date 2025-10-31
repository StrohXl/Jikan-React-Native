import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TextInputChangeEvent,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="bg-[#151718] gray-400 rounded-full ps-4 flex-row items-center">
          <IconSymbol name="search" color={"#e5e7eb"} />
          <TextInput
            returnKeyType="search"
            ref={ref}
            value={text}
            placeholder={placeholder}
            placeholderTextColor={"#9ca3af"}
            className="flex-1 ps-2 text-gray-200"
            onChange={onChange}
            onSubmitEditing={onSubmitEditing}
            defaultValue={defaultValue}
          />
          {text !== "" && (
            <TouchableOpacity onPress={onPressClose}>
              <View className="justify-center px-4" style={{ height: 40 }}>
                <IconSymbol name="close" size={18} color={"#e5e7eb"} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SearchBar;
