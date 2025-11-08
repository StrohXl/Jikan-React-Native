import AnimeCardHorizontal from "@/components/AnimeCardHorizontal";
import { ThemedText } from "@/components/themed-text";
import { fetchTopAnimes } from "@/services/api";
import useFetch from "@/services/useFetch";
import handleScrollHiddenTabBar from "@/utils/handleScrollHiddenTabBar";
import { FlatList, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useTabBar } from "./_layout";

const Top = () => {
  const { data: animes } = useFetch({ fetchFunction: fetchTopAnimes });
  const { setTabBarVisible } = useTabBar();
  return (
    <FlatList
      onScroll={(event) =>
        handleScrollHiddenTabBar({ event, setTabBarVisible })
      }
      style={{ paddingInline: 10, paddingBottom: 20 }}
      data={animes?.data}
      ListHeaderComponent={() => (
        <View className="my-10">
          <ThemedText type="title" className="text-center">
            Top Animes
          </ThemedText>
        </View>
      )}
      className="bg-gray-950"
      keyExtractor={(item) => item.title}
      contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
      renderItem={({ item, index }) => (
        <Animated.View entering={FadeInRight.delay(index * 200).duration(500)}>
          <AnimeCardHorizontal anime={item} widthImage={120} />
        </Animated.View>
      )}
    />
  );
};

export default Top;
