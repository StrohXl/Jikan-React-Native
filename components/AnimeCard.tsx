import { DataAnime } from "@/services/models/dataAnime";
import { Link } from "expo-router";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { ThemedText } from "./themed-text";

const SkeletonProps = {
  backgroundColor: "#d4d4d4",
  colorMode: "light",
} as const;

const AnimeCard = ({
  anime,
  widthImage = 200,
  show = false,
}: {
  anime: DataAnime;
  widthImage?: number;
  show?: boolean;
}) => {
  const height = widthImage / 0.7;
  return (
    <Link
      href={{
        pathname: "/anime/[id]",
        params: { id: anime.mal_id },
      }}
      asChild
    >
      <Pressable>
        <Skeleton
          show={show}
          width={widthImage}
          height={height}
          {...SkeletonProps}
        >
          <Image
            source={{
              uri: anime.images.webp.large_image_url,
            }}
            width={widthImage}
            height={height}
            className="rounded-md w-full"
          />
        </Skeleton>
        <View className="mt-2">
          <Skeleton
            radius={5}
            show={show}
            width={widthImage}
            height={25}
            {...SkeletonProps}
          >
            <ThemedText
              style={{ width: widthImage }}
              className="line-clamp-1"
              type="defaultSemiBold"
            >
              {anime.title}
            </ThemedText>
          </Skeleton>
        </View>
      </Pressable>
    </Link>
  );
};

export default AnimeCard;
