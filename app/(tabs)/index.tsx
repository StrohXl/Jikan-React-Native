import SearchBar from "@/components/SearchBar";
import { SectionFlatListHorizontalAnimes } from "@/components/SectionFlatListHorizontalAnimes";
import { ThemedText } from "@/components/themed-text";
import { fetchTopAnimes } from "@/services/api";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 px-5 min-h-full">
      <View>
        <ThemedText type="title" className="mt-10 text-center">
          Jikan
        </ThemedText>
        <View className="max-w-[300] mx-auto w-full">
          <SearchBar
            placeholder="Search..."
            onPress={() => alert("funciona")}
          />
        </View>
        <SectionFlatListHorizontalAnimes
          fetchFunction={() => fetchTopAnimes({})}
          title="Top Animes:"
        />
        <SectionFlatListHorizontalAnimes
          fetchFunction={() =>
            fetchTopAnimes({ params: { filter: "bypopularity" } })
          }
          title="Top Animes Popularity:"
        />
        <SectionFlatListHorizontalAnimes
          fetchFunction={() => fetchTopAnimes({})}
          title="Top Animes:"
        />
      </View>
    </ScrollView>
  );
}
