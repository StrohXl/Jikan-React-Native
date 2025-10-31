import { DataAnime } from "@/services/models/dataAnime";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { ThemedText } from "./themed-text";

const AnimeCardHorizontal = ({
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
      <Pressable className="rounded-xl overflow-hidden">
        {({ pressed }) => (
          <View
            className={`flex-row gap-4 overflow-hidden`}
            style={{ borderRadius: 10 }}
          >
            <Image
              source={{ uri: anime.images.webp.image_url }}
              width={widthImage}
              height={height}
              className="rounded-md"
            />
            <View className="flex-shrink">
              <ThemedText className="line-clamp-1" type="defaultSemiBold">
                {anime.title}
              </ThemedText>
              <View className="mt-2 py-1 px-2 bg-green-700 rounded-md w-[60]">
                <ThemedText type="subtitle" className="text-white text-center">
                  {anime.score}
                </ThemedText>
              </View>
              <ThemedText
                className="line-clamp-[7] mt-2"
                style={{ fontSize: 16, lineHeight: 20 }}
                type="default"
              >
                {anime.synopsis}
              </ThemedText>
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );
};

export default AnimeCardHorizontal;
