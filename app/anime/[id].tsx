import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { fetchAnimeById } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function AnimeById() {
  const { id } = useLocalSearchParams();
  const { data, loading } = useFetch({
    fetchFunction: () => fetchAnimeById(Number(id)),
  });
  const { width } = useWindowDimensions();

  const anime = data?.data;

  return (
    <ScrollView className="flex-1 min-h-full bg-[#151718]">
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
              colors={["#000", "rgba(0,0,0,0.1)"]}
              locations={[0, 1]}
              className="absolute top-0 w-full h-[50%]"
            />
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "#151718"]}
              className="absolute bottom-0 w-full h-[50%]"
            />
          </View>
          <ThemedView className="pt-4 px-5">
            <ThemedText type="subtitle">{anime?.title}</ThemedText>
            <ThemedText type="default" className="mt-4">
              {anime?.synopsis}
            </ThemedText>
          </ThemedView>
        </>
      )}
    </ScrollView>
  );
}
