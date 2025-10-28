import { DataAnime } from "@/services/models/dataAnime";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Image, View } from "react-native";
import { ThemedText } from "./themed-text";

const SkeletonProps = {
  transition: { type: "timing", duration: 2000 },
  backgroundColor: "#d4d4d4",
} as const;

const AnimeCard = ({ anime, show }: { anime: DataAnime; show: boolean }) => {
  return (
    <View className="me-4 max-w-[200]">
      <Skeleton show={show} width={200} height={300} {...SkeletonProps}>
        <Image
          source={{
            uri: anime.images.webp.large_image_url,
          }}
          width={200}
          height={300}
          className="rounded-md"
        />
      </Skeleton>
      <View className="mt-2">
        <Skeleton show={show} width={200} height={20} {...SkeletonProps}>
          <ThemedText className="line-clamp-1" type="defaultSemiBold">
            {anime.title}
          </ThemedText>
        </Skeleton>
      </View>
    </View>
  );
};

export default AnimeCard;
