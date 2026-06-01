import { DataAnime } from "@/services/models/dataAnime";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { ThemedText } from "./themed-text";
import { IconSymbol } from "./ui/icon-symbol";

const AnimeCardHorizontal = ({ anime }: { anime: DataAnime }) => {
  return (
    <Link
      style={{ flex: 1 }}
      href={{
        pathname: "/anime/[id]",
        params: { id: anime.mal_id },
      }}
      asChild
    >
      <Pressable className="rounded-xl overflow-hidden">
        {({ pressed }) => (
          <View className={`flex-row gap-4 overflow-hidden w-full`}>
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: anime.images.webp.image_url }}
                style={{
                  height: "auto",
                  maxWidth: 280,
                }}
                className="rounded-md h-auto aspect-[0.6416]"
              />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText
                className="line-clamp-4 !text-[16px]"
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
              <View className="flex-row flex-wrap gap-2">
                {anime.genres.map((item) => (
                  <Link
                    href={{
                      pathname: "/search",
                      params: { genres: item.mal_id },
                    }}
                    key={item.name}
                    asChild
                  >
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
