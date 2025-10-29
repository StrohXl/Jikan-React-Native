import SearchBar from "@/components/SearchBar";
import { SectionFlatListHorizontalAnimes } from "@/components/SectionFlatListHorizontalAnimes";
import { ThemedText } from "@/components/themed-text";
import { fetchTopAnimes } from "@/services/api";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  return (
    <ScrollView
      className="flex-1 min-h-full relative"
      style={{ paddingInline: 10 }}
    >
      <ThemedText type="title" className="mt-40 text-center">
        Jikan
      </ThemedText>
      <View className="max-w-[300] mx-auto w-full mt-10">
        <SearchBar
          placeholder="Search..."
          onChange={(event) => setSearch(event.nativeEvent.text)}
          onKeyPress={(event) =>
            event.nativeEvent.key === "Enter" &&
            router.push({ pathname: "/search", params: { search } })
          }
        />
      </View>
      <View className="gap-6 mt-10">
        <SectionFlatListHorizontalAnimes
          fetchFunction={() => fetchTopAnimes()}
          title="Top Animes:"
        />
        <SectionFlatListHorizontalAnimes
          fetchFunction={() => fetchTopAnimes({ filter: "bypopularity" })}
          title="Top Animes Popularity:"
        />
        <SectionFlatListHorizontalAnimes
          fetchFunction={() => fetchTopAnimes({ filter: "airing" })}
          title="Animes Airing:"
        />
      </View>
    </ScrollView>
  );
}
