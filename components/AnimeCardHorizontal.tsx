import { DataAnime } from "@/services/models/dataAnime";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { ThemedText } from "./themed-text";
import { IconSymbol } from "./ui/icon-symbol";

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
              <ThemedText
                className="line-clamp-1 !text-[16px]"
                type="defaultSemiBold"
              >
                {anime.title}
              </ThemedText>
              <ThemedText
                className="line-clamp-1 !text-[14px] mt-0"
                type="default"
              >
                {anime.status}
              </ThemedText>
              <View className="mt-1 flex-row  items-center gap-1">
                <IconSymbol color={"#eab308"} name="star-border" size={18} />
                <ThemedText
                  type="defaultSemiBold"
                  style={{ color: "#eab308" }}
                  className="!text-yellow-500"
                >
                  {anime.score}
                </ThemedText>
              </View>
              <ThemedText
                className="line-clamp-1 !text-[14px] mt-2"
                type="default"
              >
                {anime.episodes && `${anime.episodes + " Episodes"}`}
              </ThemedText>
              <View className="flex-row gap-2">
                {anime.genres.map((item) => (
                  <Link href={"/"} key={item.name} asChild>
                    <ThemedText className="!text-sm" type="link">
                      {item.name}
                    </ThemedText>
                  </Link>
                ))}
              </View>
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );
};

export default AnimeCardHorizontal;
