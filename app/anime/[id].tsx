import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { fetchAnimeById, fetchAnimeByIdRecommendations } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, useLocalSearchParams } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

import { SectionFlatListHorizontalAnimes } from "@/components/SectionFlatListHorizontalAnimes";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Tag from "@/components/ui/tag";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

export default function AnimeById() {
  const { id } = useLocalSearchParams();
  const [fullScreen, setFullScreen] = useState(false);

  // Fetch Anime By Id
  const { data, loading } = useFetch({
    fetchFunction: () => fetchAnimeById(Number(id)),
  });

  const { width } = useWindowDimensions();
  const anime = data?.data;
  const videoId = anime?.trailer.embed_url
    ? anime?.trailer.embed_url.split("/embed/")[1].split("?")[0]
    : "";

  const onFullScreen = () => {
    console.log(fullScreen);
    if (fullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    setFullScreen((prev) => !prev);
  };

  return (
    <ScrollView className="flex-1 min-h-full bg-gray-950">
      {loading ? (
        <View className="min-h-full w-full items-center justify-center">
          <ActivityIndicator color={"#fff"} size={40} />
        </View>
      ) : (
        <>
          <View className="relative">
            <Image
              source={{
                uri: anime?.images.webp.large_image_url,
                width: 300,
                height: width,
              }}
              className="w-full"
            />
            <LinearGradient
              colors={["#030712", "rgba(0,0,0,0.1)"]}
              locations={[0, 1]}
              className="absolute top-0 w-full h-[50%]"
            />
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "#030712"]}
              className="absolute bottom-0 w-full h-[50%]"
            />
          </View>
          <ThemedView className="py-4" style={{ paddingInline: 10 }}>
            <ThemedText type="subtitle">{anime?.title}</ThemedText>
            <View className="flex-row gap-2">
              {anime?.score && (
                <View className="items-center flex-row gap-1 mt-2">
                  <IconSymbol name="star-border" color={"#ca8a04"} />
                  <ThemedText
                    type="default"
                    style={{ color: "#ca8a04", fontSize: 20 }}
                  >
                    {anime?.score}
                  </ThemedText>
                </View>
              )}
            </View>
            <View className="mt-2">
              <ThemedText type="default">Type: {anime?.type}</ThemedText>
            </View>
            {anime?.episodes && anime.type !== "Movie" && (
              <View className="mt-2">
                <ThemedText type="default">
                  {anime.episodes} Episodes
                </ThemedText>
              </View>
            )}
            {anime?.duration && anime.type === "Movie" && (
              <View className="mt-2">
                <ThemedText type="default">
                  Duration: {anime.duration}
                </ThemedText>
              </View>
            )}

            <View className="flex-row gap-2 mt-4 flex-wrap">
              {anime?.genres.map((item) => (
                <Link
                  href={{
                    pathname: "/search",
                    params: { genres: item.mal_id },
                  }}
                  key={item.name}
                  asChild
                >
                  <Tag title={item.name} status={false} />
                </Link>
              ))}
            </View>
            <ThemedText type="default" className="mt-4">
              {anime?.synopsis}
            </ThemedText>
            {videoId !== "" && (
              <View className="mt-4">
                <ThemedText type="subtitle" className="mb-4">
                  Trailer:
                </ThemedText>
                <View className="rounded-lg overflow-hidden">
                  <YoutubePlayer
                    onFullScreenChange={onFullScreen}
                    height={(width - 20) / 1.78}
                    videoId={videoId}
                  />
                </View>
              </View>
            )}

            <SectionFlatListHorizontalAnimes
              title="Recommended Animes"
              fetchFunction={() => fetchAnimeByIdRecommendations({ id })}
            />
          </ThemedView>
        </>
      )}
    </ScrollView>
  );
}
