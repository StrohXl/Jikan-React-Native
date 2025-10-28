import { DataAnime } from "@/services/models/dataAnime";
import { Response } from "@/services/models/response";
import useFetch from "@/services/useFetch";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import AnimeCard from "./AnimeCard";
import AnimeCardSkeleton from "./Skeletons/AnimeCardSkeleton";
import { ThemedText } from "./themed-text";

export function SectionFlatListHorizontalAnimes({
  title,
  fetchFunction,
}: {
  title: string;
  fetchFunction: () => Promise<Response<DataAnime>>;
}) {
  const { data, error, loading } = useFetch<DataAnime>(fetchFunction);

  return (
    <View className="mt-10">
      <ThemedText type="subtitle" className="mb-4">
        {title}
      </ThemedText>
      {error ? (
        <ThemedText type="defaultSemiBold">Error</ThemedText>
      ) : loading ? (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <AnimeCardSkeleton show={true} />
          <AnimeCardSkeleton show={true} />
        </ScrollView>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data?.data}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <AnimeCard anime={item} show={loading} />}
          horizontal={true}
        />
      )}
    </View>
  );
}
