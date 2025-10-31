import AnimeCard from "@/components/AnimeCard";
import SearchBar from "@/components/SearchBar";
import { ThemedText } from "@/components/themed-text";
import ListEmpty from "@/components/ui/ListEmpty";
import ColumnGapAnimeCardSkeleton from "@/components/ui/skeletons/ColumnGapAnimeCardSkeleton";
import { fetchAnime } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const Search = () => {
  const { search } = useLocalSearchParams();
  let newSearch = search ? `${search}` : "";
  const [text, setText] = useState<string>("");
  const [textSearch, setTextSearch] = useState<string>("");
  const paddingHorizontal = 10;
  const { width } = useWindowDimensions();
  const columnGap = 15;
  const cardWidth = (width - paddingHorizontal * 2 - columnGap) / 2;

  const { data, loading, error, fetchData } = useFetch({
    fetchFunction: () => fetchAnime({ q: newSearch ? newSearch : text }),
  });

  const onSubmit = () => {
    if (text !== "") {
      newSearch = "";
      setTextSearch(text);
      fetchData();
    }
  };

  useEffect(() => {
    if (newSearch !== "") {
      setTextSearch(newSearch);
      fetchData();
    }
    console.log(newSearch);
  }, [search]);

  return (
    <View>
      <FlatList
        data={error ? [] : loading ? [] : data?.data}
        scrollEnabled={loading ? false : true}
        keyExtractor={(item) => item.title}
        ListHeaderComponent={
          <>
            <View className=" mx-auto w-full mt-6">
              <SearchBar
                text={text}
                placeholder="Search..."
                onChange={(event) => {
                  setText(event.nativeEvent.text);
                }}
                onPressClose={() => setText("")}
                onSubmitEditing={onSubmit}
                defaultValue={`${newSearch}`}
              />
            </View>
            <ThemedText
              type="defaultSemiBold"
              className="mt-4 gray-200 line-clamp-1"
            >
              Search Results for {textSearch}
            </ThemedText>
          </>
        }
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn.duration(500)}>
            <AnimeCard widthImage={cardWidth} show={loading} anime={item} />
          </Animated.View>
        )}
        ListEmptyComponent={
          <>
            {loading ? (
              <>
                <ColumnGapAnimeCardSkeleton
                  cardWidth={cardWidth}
                  columnGap={columnGap}
                />
                <ColumnGapAnimeCardSkeleton
                  cardWidth={cardWidth}
                  columnGap={columnGap}
                />
                <ColumnGapAnimeCardSkeleton
                  cardWidth={cardWidth}
                  columnGap={columnGap}
                />
              </>
            ) : (
              <ListEmpty
                colorIcon="#e5e7eb"
                title="No Results found"
                sizeIcon={100}
              />
            )}
          </>
        }
        className="grid-cols-2"
        style={{
          paddingInline: paddingHorizontal,
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
    </View>
  );
};

export default Search;
