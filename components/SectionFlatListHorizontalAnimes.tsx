import { DataAnime } from "@/services/models/dataAnime";
import { Response } from "@/services/models/response";
import useFetch from "@/services/useFetch";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import AnimeCard from "./AnimeCard";
import { ThemedText } from "./themed-text";
import AnimeCardSkeleton from "./ui/skeletons/AnimeCardSkeleton";

export function SectionFlatListHorizontalAnimes({
  title,
  fetchFunction,
}: {
  title: string;
  fetchFunction: () => Promise<Response<DataAnime>>;
}) {
  const { data, error, loading } = useFetch<Response<DataAnime>>(fetchFunction);

  return (
    <View>
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
          renderItem={({ item }) => <AnimeCard anime={item} />}
          horizontal={true}
          ItemSeparatorComponent={() => <View className="h-1 mx-2"></View>}
        />
      )}
    </View>
  );
}
