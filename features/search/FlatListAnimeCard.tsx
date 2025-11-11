import AnimeCard from "@/components/AnimeCard";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import React, { useEffect } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import ListEmptyComponent from "./ListEmpty";
import { useContextSearch } from "./hooks/contextSearch";

const FlatListAnimeCard = ({
  refFlatList,
}: {
  refFlatList: React.RefObject<FlatList | null>;
}) => {
  const { width } = useWindowDimensions();
  const paddingHorizontal = 10;
  const columnGap = 15;
  const cardWidth = (width - paddingHorizontal * 2 - columnGap) / 2;
  const background = useThemeColor({}, "background");

  const { filters, fetchData, textSearch, loadingData, error, data, genres } =
    useContextSearch();

  useEffect(() => {
    fetchData();
    refFlatList.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  }, [filters, genres.value, genres.status]);

  return (
    <FlatList
      ref={refFlatList}
      data={error ? [] : loadingData ? [] : data?.data}
      scrollEnabled={loadingData ? false : true}
      keyExtractor={(item) => item.title}
      ListHeaderComponent={
        <ThemedText
          type="defaultSemiBold"
          className="pt-2 gray-200 line-clamp-1"
        >
          Search Results for {textSearch}
        </ThemedText>
      }
      renderItem={({ item }) => (
        <Animated.View entering={FadeIn.duration(500)}>
          <AnimeCard widthImage={cardWidth} anime={item} />
        </Animated.View>
      )}
      ListEmptyComponent={
        <ListEmptyComponent
          cardWidth={cardWidth}
          columnGap={columnGap}
          loading={loadingData}
        />
      }
      style={{
        paddingInline: paddingHorizontal,
        backgroundColor: background,
      }}
      horizontal={false}
      contentContainerStyle={{
        gap: 15,
        paddingTop: 10,
        paddingBottom: 20,
      }}
      columnWrapperStyle={{
        gap: 15,
      }}
      numColumns={2}
    />
  );
};

export default FlatListAnimeCard;
