import CarouselGradientAbsolute from "@/components/CarouselGradientAbsolute";
import SearchBar from "@/components/SearchBar";
import { SectionFlatListHorizontalAnimes } from "@/components/SectionFlatListHorizontalAnimes";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { fetchAnime, fetchTopAnimes } from "@/services/api";
import useFetch from "@/services/useFetch";
import handleScrollHiddenTabBar from "@/utils/handleScrollHiddenTabBar";
import { router } from "expo-router";
import { Pressable, useWindowDimensions, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from "react-native-reanimated";
import { useTabBar } from "./_layout";

export default function HomeScreen() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  const { setTabBarVisible } = useTabBar();

  const { width } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value / 3,
            [-width, 0, width],
            [-width / 2, 0, width * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-width, 0, width], [2, 1, 1]),
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
      contentContainerStyle={{ paddingBottom: 20 }}
      scrollEventThrottle={16}
      onScroll={(event) =>
        handleScrollHiddenTabBar({ event, setTabBarVisible })
      }
      style={{ backgroundColor }}
    >
      <CarouselGradientAbsolute
        headerAnimatedStyle={headerAnimatedStyle}
        animes={animes ? animes.data : []}
      />

      <View className="pt-20 relative z-10 w-full">
        <ThemedText type="title" className="text-center">
          Jikan
        </ThemedText>
        <View className="max-w-[270] relative mx-auto w-full mt-10">
          <SearchBar text="" placeholder="Search..." />
          <Pressable
            className="absolute  w-full left-0 h-full"
            onPress={() => router.push("/search")}
          ></Pressable>
        </View>
      </View>

      <View className="relative z-10 pt-4" style={{ paddingInline: 10 }}>
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
