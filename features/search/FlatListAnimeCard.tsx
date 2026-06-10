import AnimeCard from "@/components/AnimeCard";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import React, { useEffect } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useContextSearch } from "./hooks/contextSearch";
import ListEmptyComponent from "./ListEmpty";

const paddingHorizontal = 10;
const columnGap = 15;

const FlatListAnimeCard = ({
  refFlatList,
}: {
  refFlatList: React.RefObject<FlatList | null>;
}) => {
  const { width } = useWindowDimensions();

  const background = useThemeColor({}, "background");

  const { filters, textSearch, loadingData, error, data, genres } =
    useContextSearch();

  useEffect(() => {
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
      horizontal={false}
      style={{
        paddingInline: paddingHorizontal,
        backgroundColor: background,
      }}
      contentContainerStyle={{
        gap: 15,
        paddingTop: 10,
        maxWidth: 1200,
        width: "100%",
        marginInline: "auto",
        paddingBottom: 20,
      }}
      columnWrapperStyle={{
        gap: 15,
      }}
      numColumns={width >= 768 ? 5 : 2}
      ListHeaderComponent={
        <ThemedText
          type="defaultSemiBold"
          className="pt-2 gray-200 line-clamp-1"
        >
          Search Results for {textSearch}
        </ThemedText>
      }
      renderItem={({ item }) => (
        <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(500)}>
          <AnimeCard anime={item} />
        </Animated.View>
      )}
      ListEmptyComponent={
        <ListEmptyComponent columnGap={columnGap} loading={loadingData} />
      }
    />
  );
};

export default FlatListAnimeCard;
