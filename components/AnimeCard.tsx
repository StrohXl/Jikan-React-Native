import { DataAnime } from "@/services/models/dataAnime";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable } from "react-native";
import { ThemedText } from "./themed-text";

const AnimeCard = ({
  anime,
  widthImage = 200,
}: {
  anime: DataAnime;
  widthImage?: number;
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
        <Image
          source={{
            uri: anime.images.webp.large_image_url,
          }}
          width={widthImage}
          height={height}
          className="rounded-md w-full"
        />
        <ThemedText
          style={{ width: widthImage }}
          className="line-clamp-1 mt-2 !text-sm"
          type="defaultSemiBold"
        >
          {anime.title}
        </ThemedText>
      </Pressable>
    </Link>
  );
};

export default AnimeCard;
