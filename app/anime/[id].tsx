import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { fetchAnimeById, fetchAnimeByIdRecommendations } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, useLocalSearchParams } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  ActivityIndicator,
  Image,
  useWindowDimensions,
  View,
} from "react-native";

import ParallaxScrollGradient from "@/components/ParallaxScrollGradient";
import { SectionFlatListHorizontalAnimes } from "@/components/SectionFlatListHorizontalAnimes";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Tag from "@/components/ui/tag";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useState } from "react";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from "react-native-reanimated";
import YoutubePlayer from "react-native-youtube-iframe";

export default function AnimeById() {
  const { id } = useLocalSearchParams();
  const [fullScreen, setFullScreen] = useState(false);

  // Fetch Anime By Id
  const { data, loading } = useFetch({
    fetchFunction: () => fetchAnimeById(Number(id)),
  });

  const textColor = useThemeColor({}, "text");
  const background = useThemeColor({}, "background");

  const { width } = useWindowDimensions();
  const anime = data?.data;
  const videoId = anime?.trailer.embed_url
    ? anime?.trailer.embed_url.split("/embed/")[1].split("?")[0]
    : "";

  const onFullScreen = () => {
    if (fullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    setFullScreen((prev) => !prev);
  };

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollOffset = useScrollOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value / 3,
            [-width, 0, width],
            [-width / 2, 0, width * 0.75],
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-width, 0, width], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      className="flex-1"
      style={{ backgroundColor: background }}
    >
      {loading ? (
        <View
          style={{ flex: 1 }}
          className="min-h-full w-full items-center justify-center"
        >
          <ActivityIndicator color={textColor} size={40} />
        </View>
      ) : (
        <>
          <View className="relative" style={{ height: 400 }}>
            <ParallaxScrollGradient headerAnimatedStyle={headerAnimatedStyle}>
              <Image
                source={{
                  uri: anime?.images.webp.large_image_url,
                }}
                style={{ height: 400 }}
                className="w-full h-full object-cover"
              />
            </ParallaxScrollGradient>
          </View>
          <ThemedView
            className="py-6 mx-auto max-w-[1200px]"
            style={{ paddingInline: 10 }}
          >
            <ThemedText type="title" className="mt-4">
              {anime?.title}
            </ThemedText>
            <View className="flex-row gap-2 mt-4">
              {anime?.score && (
                <View className="items-center flex-row gap-1 ">
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
            <View className="mt-4">
              <ThemedText type="default">Type: {anime?.type}</ThemedText>
            </View>
            {anime?.episodes && anime.type !== "Movie" && (
              <View className="mt-4">
                <ThemedText type="default">
                  {anime.episodes} Episodes
                </ThemedText>
              </View>
            )}
            {anime?.duration && anime.type === "Movie" && (
              <View className="mt-4">
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
                <View className="rounded-xl overflow-hidden ">
                  <YoutubePlayer
                    onFullScreenChange={onFullScreen}
                    videoId={videoId}
                    height={(width >= 1180 ? 1185 : width - 20) / 1.78}
                  />
                </View>
              </View>
            )}

            <View className="mt-4">
              <SectionFlatListHorizontalAnimes
                title="Recommended Animes"
                fetchFunction={() => fetchAnimeByIdRecommendations({ id })}
              />
            </View>
          </ThemedView>
        </>
      )}
    </Animated.ScrollView>
  );
}
