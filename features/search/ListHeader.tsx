import ScrollFilters from "@/components/scroll-filters/ScrollFilters";
import SearchBar from "@/components/SearchBar";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router } from "expo-router";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useContextSearch } from "./hooks/contextSearch";

const ListHeader = ({
  refFlatList,
}: {
  refFlatList: React.RefObject<FlatList | null>;
}) => {
  const { text, setTextSearch, setText, fetchData } = useContextSearch();

  const onSubmit = () => {
    if (text !== "") {
      setTextSearch(text);
      fetchData();
      refFlatList.current?.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }
  };

  return (
    <>
      <View className="mx-auto w-full mt-6 items-center  gap-4 flex-row">
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol color={"#fff"} name="arrow-back" />
        </TouchableOpacity>
        <View className="flex-[1]">
          <SearchBar
            text={text}
            placeholder="Search..."
            onChange={(event) => {
              setText(event.nativeEvent.text);
            }}
            onPressClose={() => setText("")}
            onSubmitEditing={onSubmit}
          />
        </View>
      </View>
      <ScrollFilters />
    </>
  );
};

export default ListHeader;
