import { AnimeRecommendations } from "@/services/models/AnimeRecommedations";
import { DataAnime } from "@/services/models/dataAnime";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable } from "react-native";
import { ThemedText } from "./themed-text";

const AnimeCard = ({ anime }: { anime: DataAnime | AnimeRecommendations }) => {
  return (
    <Link
      href={{
        pathname: "/anime/[id]",
        params: { id: anime.mal_id },
      }}
      asChild
      style={{ flex: 1 }}
    >
      <Pressable>
        <Image
          source={{
            uri: anime.images.webp.large_image_url,
          }}
          style={{
            height: "auto",
            width: "100%",
            aspectRatio: 0.6416,
            objectFit: "cover",
          }}
          className="rounded-md w-full"
        />
        <ThemedText
          style={{ fontWeight: 600 }}
          className="line-clamp-1 mt-2 !text-sm"
          type="subtitle"
        >
          {anime.title}
        </ThemedText>
      </Pressable>
    </Link>
  );
};

export default AnimeCard;
