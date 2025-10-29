import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { fetchAnimeById } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function AnimeById() {
  const { id } = useLocalSearchParams();
  const { data, loading } = useFetch(() => fetchAnimeById(Number(id)));

  const anime = data?.data;

  return (
    <ScrollView className="flex-1 min-h-full">
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
                height: 450,
              }}
              className="w-full"
            />
            <LinearGradient
              colors={["#151718", "transparent", "#151718aa", "#151718fc"]}
              style={styles.gradient}
              locations={[0, 0.3, 0.7, 0.98]}
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

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
});
