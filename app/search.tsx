import { ThemedView } from "@/components/themed-view";
import FlatListAnimeCard from "@/features/search/FlatListAnimeCard";
import ContextSearch from "@/features/search/hooks/contextSearch";
import ListHeader from "@/features/search/ListHeader";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useRef } from "react";
import { FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Search = () => {
  const refFlatList = useRef<FlatList>(null);
  const { genres } = useLocalSearchParams();
  const dark = useThemeColor({}, "dark");

  return (
    <ContextSearch params={{ genres: `${genres}` }}>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureHandlerRootView>
        <ThemedView
          style={{
            paddingTop: 10,
            paddingInline: 10,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: dark,
          }}
        >
          <ListHeader refFlatList={refFlatList} />
        </ThemedView>
        <FlatListAnimeCard refFlatList={refFlatList} />
      </GestureHandlerRootView>
    </ContextSearch>
  );
};

export default Search;
