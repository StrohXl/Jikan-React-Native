import AnimeCardHorizontal from "@/components/AnimeCardHorizontal";
import { ThemedText } from "@/components/themed-text";
import { fetchTopAnimes } from "@/services/api";
import useFetch from "@/services/useFetch";
import { FlatList, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

const Top = () => {
  const { data: animes } = useFetch({ fetchFunction: fetchTopAnimes });
  return (
    <FlatList
      style={{ paddingInline: 10, paddingBottom: 20 }}
      data={animes?.data}
      ListHeaderComponent={() => (
        <View className="my-20">
          <ThemedText type="title" className="text-center">
            Top Animes
          </ThemedText>
        </View>
      )}
      keyExtractor={(item) => item.title}
      contentContainerStyle={{ gap: 20 }}
      renderItem={({ item, index }) => (
        <Animated.View entering={FadeInRight.delay(index * 200).duration(500)}>
          <AnimeCardHorizontal anime={item} widthImage={150} />
        </Animated.View>
      )}
    />
  );
};

export default Top;
