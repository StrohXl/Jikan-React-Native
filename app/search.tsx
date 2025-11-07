import FlatListAnimeCard from "@/features/search/FlatListAnimeCard";
import ContextSearch from "@/features/search/hooks/contextSearch";
import ListHeader from "@/features/search/ListHeader";
import { Stack } from "expo-router";
import React, { useRef } from "react";
import { FlatList, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Search = () => {
  const refFlatList = useRef<FlatList>(null);
  return (
    <ContextSearch>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureHandlerRootView>
        <View
          style={{
            paddingTop: 10,
            paddingInline: 10,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#222",
          }}
          className="bg-gray-900"
        >
          <ListHeader refFlatList={refFlatList} />
        </View>
        <FlatListAnimeCard refFlatList={refFlatList} />
      </GestureHandlerRootView>
    </ContextSearch>
  );
};

export default Search;
