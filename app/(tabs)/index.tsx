import CarouselGradientAbsolute from "@/components/CarouselGradientAbsolute";
import SearchBar from "@/components/SearchBar";
import { SectionFlatListHorizontalAnimes } from "@/components/SectionFlatListHorizontalAnimes";
import { ThemedText } from "@/components/themed-text";
import { fetchAnime, fetchTopAnimes } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from "react-native-reanimated";

export default function HomeScreen() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);

  const { width } = useWindowDimensions();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-width, 0, width],
            [-width / 2, 0, width * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-150, 0, 250], [2, 1, 1]),
        },
      ],
    };
  });

  const { data: animes } = useFetch({
    fetchFunction: () => fetchTopAnimes({ limit: "5" }),
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      className="flex-[1] min-h-full relative"
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 20 }}
      scrollEventThrottle={16}
    >
      <CarouselGradientAbsolute
        headerAnimatedStyle={headerAnimatedStyle}
        animes={animes ? animes.data : []}
      />

      <View className="pt-20 relative z-10 w-full">
        <ThemedText type="title" className="text-center">
          Jikan
        </ThemedText>
        <View className="max-w-[300] mx-auto w-full mt-10">
          <SearchBar
            text={search}
            placeholder="Search..."
            onPressClose={() => setSearch("")}
            onChange={(event) => setSearch(event.nativeEvent.text)}
            onSubmitEditing={() =>
              search !== "" &&
              router.push({ pathname: "/search", params: { search } })
            }
          />
        </View>
      </View>

      <View className="gap-6 relative z-10 pt-10" style={{ paddingInline: 10 }}>
        <SectionFlatListHorizontalAnimes
          fetchFunction={() =>
            fetchAnime({
              status: "airing",
              sfw: "true",
              order_by: "popularity",
            })
          }
          title="Animes Airing:"
        />
        <SectionFlatListHorizontalAnimes
          fetchFunction={() =>
            fetchAnime({ order_by: "popularity", sfw: "true" })
          }
          title="Popularity Anime:"
        />
      </View>
    </Animated.ScrollView>
  );
}
