import AnimeCardHorizontal from "@/components/AnimeCardHorizontal";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { fetchTopAnimes } from "@/services/api";
import useFetch from "@/services/useFetch";
import handleScrollHiddenTabBar from "@/utils/handleScrollHiddenTabBar";
import { FlatList, useWindowDimensions, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useTabBar } from "./_layout";

const Top = () => {
  const { data: animes } = useFetch({ fetchFunction: fetchTopAnimes });
  const { setTabBarVisible } = useTabBar();
  const backgroundColor = useThemeColor({}, "background");
  const { width } = useWindowDimensions();
  return (
    <FlatList
      keyExtractor={(item) => item.title}
      contentContainerStyle={{
        gap: 20,
        paddingBottom: 20,
        maxWidth: 1200,
        marginInline: "auto",
      }}
      style={{ paddingInline: 10, paddingBottom: 20, backgroundColor }}
      horizontal={false}
      data={animes?.data}
      numColumns={width >= 768 ? 3 : width >= 600 ? 2 : 1}
      onScroll={(event) =>
        handleScrollHiddenTabBar({ event, setTabBarVisible })
      }
      ListHeaderComponent={() => (
        <View className="my-10">
          <ThemedText type="title" className="text-center">
            Top Animes
          </ThemedText>
        </View>
      )}
      renderItem={({ item, index }) => (
        <Animated.View
          style={{ flex: 1 }}
          entering={FadeInRight.delay(index * 200).duration(500)}
        >
          <AnimeCardHorizontal anime={item} />
        </Animated.View>
      )}
    />
  );
};

export default Top;
