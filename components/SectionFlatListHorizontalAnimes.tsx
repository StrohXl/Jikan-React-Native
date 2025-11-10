import { AnimeRecommendations } from "@/services/models/AnimeRecommedations";
import { DataAnime } from "@/services/models/dataAnime";
import { Response } from "@/services/models/response";
import useFetch from "@/services/useFetch";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import AnimeCard from "./AnimeCard";
import { ThemedText } from "./themed-text";
import AnimeCardSkeleton from "./ui/skeletons/AnimeCardSkeleton";

export function SectionFlatListHorizontalAnimes({
  title,
  fetchFunction,
}: {
  title: string;
  fetchFunction: () => Promise<Response<DataAnime | AnimeRecommendations>>;
}) {
  const { data, error, loading } = useFetch<
    Response<DataAnime | AnimeRecommendations>
  >({
    fetchFunction,
  });

  return (
    <View className="mt-4">
      <ThemedText type="subtitle" className="mb-4">
        {title}
      </ThemedText>
      {error ? (
        <ThemedText type="defaultSemiBold">Error</ThemedText>
      ) : loading ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{
            gap: 15,
          }}
        >
          <AnimeCardSkeleton show={true} />
          <AnimeCardSkeleton show={true} />
        </ScrollView>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data?.data}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <Animated.View entering={FadeIn.duration(500)}>
              <AnimeCard anime={item} />
            </Animated.View>
          )}
          horizontal={true}
          ItemSeparatorComponent={() => <View className="h-1 mx-2"></View>}
        />
      )}
    </View>
  );
}
