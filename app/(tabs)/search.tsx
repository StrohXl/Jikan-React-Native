import AnimeCard from "@/components/AnimeCard";
import SearchBar from "@/components/SearchBar";
import { ThemedText } from "@/components/themed-text";
import AnimeCardSkeleton from "@/components/ui/skeletons/AnimeCardSkeleton";
import { fetchAnimeSearch } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, useWindowDimensions, View } from "react-native";

const Search = () => {
  const { search } = useLocalSearchParams();
  const newSearch = search ? `${search}` : "";

  const [text, setText] = useState<string>(newSearch);
  const [autoFetch, setAutoFetch] = useState(true);

  useEffect(() => {
    setText(newSearch);
    setAutoFetch((value) => !value);
  }, [newSearch]);

  const { data, loading, error } = useFetch(
    () => fetchAnimeSearch(text),
    autoFetch
  );

  const padding = 10;
  const { width } = useWindowDimensions();
  const columnGap = 15;
  const cardWidth = (width - padding * 2 - columnGap) / 2;

  return (
    <View>
      <View className="max-w-[300] mx-auto w-full mt-20">
        <SearchBar
          placeholder="Search."
          onChange={(event) => {
            setText(event.nativeEvent.text);
          }}
          onKeyPress={(event) => {
            event.nativeEvent.key === "Enter" &&
              setAutoFetch((value) => !value);
          }}
          defaultValue={`${newSearch}`}
        />
      </View>
      {error ? (
        <View>
          <ThemedText type="subtitle">Error</ThemedText>
        </View>
      ) : loading ? (
        <ScrollView
          className="mt-10"
          style={{ paddingInline: padding }}
          contentContainerStyle={{ gap: 15 }}
          scrollEnabled={false}
        >
          <View className="flex-row" style={{ columnGap: columnGap }}>
            <AnimeCardSkeleton widthImage={cardWidth} />
            <AnimeCardSkeleton widthImage={cardWidth} />
          </View>
          <View className="flex-row" style={{ columnGap: columnGap }}>
            <AnimeCardSkeleton widthImage={cardWidth} />
            <AnimeCardSkeleton widthImage={cardWidth} />
          </View>
          <View className="flex-row" style={{ columnGap: columnGap }}>
            <AnimeCardSkeleton widthImage={cardWidth} />
            <AnimeCardSkeleton widthImage={cardWidth} />
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={data?.data}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View className="">
              <AnimeCard widthImage={cardWidth} show={loading} anime={item} />
            </View>
          )}
          className="pt-5 mt-5 grid-cols-2"
          style={{
            paddingInline: padding,
          }}
          horizontal={false}
          contentContainerStyle={{
            gap: 15,
          }}
          columnWrapperStyle={{
            gap: 15,
          }}
          numColumns={2}
        />
      )}
    </View>
  );
};

export default Search;
