import AnimeCardHorizontal from "@/components/AnimeCardHorizontal";
import { ThemedText } from "@/components/themed-text";
import Tag from "@/components/ui/tag";
import { fetchRecentEpisodes } from "@/services/api";
import useFetch from "@/services/useFetch";
import handleScrollHiddenTabBar from "@/utils/handleScrollHiddenTabBar";
import { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useTabBar } from "./_layout";

const Schedule = () => {
  const days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const today = new Date().getDay();
  const [day, setDay] = useState(days[today]);

  const flatListRef = useRef<FlatList>(null);

  const {
    data: animes,
    fetchData,
    loading,
  } = useFetch({
    fetchFunction: () => fetchRecentEpisodes({ params: { filter: day } }),
  });

  useEffect(() => {
    fetchData();
  }, [day]);

  const { setTabBarVisible } = useTabBar();

  return (
    <FlatList
      onScroll={(event) =>
        handleScrollHiddenTabBar({ event, setTabBarVisible })
      }
      style={{ paddingInline: 10, paddingBottom: 20 }}
      data={animes?.data}
      ListHeaderComponent={
        <>
          <View className="mt-10">
            <ThemedText type="title" className="text-center">
              Schedule
            </ThemedText>
          </View>
          <View className="mb-[10px] mt-[20px]">
            <FlatList
              ref={flatListRef}
              data={days}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              scrollEnabled={loading ? false : true}
              contentContainerStyle={{ gap: 10 }}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <Tag
                  onPress={() => !loading && setDay(item)}
                  title={`${item} ${today === index ? "Today" : ""}`}
                  status={item === day}
                />
              )}
            ></FlatList>
          </View>
        </>
      }
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

export default Schedule;
