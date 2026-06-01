import AnimeCardHorizontal from "@/components/AnimeCardHorizontal";
import { ThemedText } from "@/components/themed-text";
import Tag from "@/components/ui/tag";
import { useThemeColor } from "@/hooks/use-theme-color";
import { fetchRecentEpisodes } from "@/services/api";
import useFetch from "@/services/useFetch";
import handleScrollHiddenTabBar from "@/utils/handleScrollHiddenTabBar";
import { useEffect, useRef, useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useTabBar } from "./_layout";

type ArrayDays = [
  {
    day: "monday";
    width: number;
  },
  {
    day: "tuesday";
    width: number;
  },
  {
    day: "wednesday";
    width: number;
  },
  {
    day: "thursday";
    width: number;
  },
  {
    day: "friday";
    width: number;
  },
  {
    day: "saturday";
    width: number;
  },
  {
    day: "sunday";
    width: number;
  },
];

type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

const arrayDays: ArrayDays = [
  {
    day: "monday",
    width: 90.3,
  },
  {
    day: "tuesday",
    width: 92.7,
  },
  {
    day: "wednesday",
    width: 113.7,
  },
  {
    day: "thursday",
    width: 98.7,
  },
  {
    day: "friday",
    width: 77.3,
  },
  {
    day: "saturday",
    width: 95.7,
  },
  {
    day: "sunday",
    width: 86,
  },
];

const Schedule = () => {
  let today = new Date().getDay();
  today == 0 ? (today = 6) : today;
  const { width } = useWindowDimensions();

  const [day, setDay] = useState<Day>(
    today === 0 ? "sunday" : arrayDays[today].day,
  );
  const flatListRef = useRef<FlatList>(null);

  const backgroundColor = useThemeColor({}, "background");
  const {
    data: animes,
    fetchData,
    loading,
  } = useFetch({
    fetchFunction: () => fetchRecentEpisodes({ params: { filter: day } }),
  });

  const { setTabBarVisible } = useTabBar();

  const getItemLayout = (
    data: ArrayLike<any> | null | undefined,
    index: number,
  ) => {
    const findIndex = arrayDays.findIndex((item) => item === arrayDays[today]);
    const length = arrayDays[index].width + 10;

    return {
      length, // ancho + margin
      offset: arrayDays
        .slice(0, index)
        .reduce(
          (total, item, index) =>
            total + item.width + 10 + (index === findIndex ? 40.3 : 0),
          0,
        ),
      index,
    };
  };

  const changeDay = (index: number) => {
    setDay(arrayDays[index].day);
  };

  useEffect(() => {
    fetchData();
    const indexDays = arrayDays.findIndex((item) => item.day === day);
    flatListRef.current?.scrollToIndex({ index: indexDays });
  }, [day]);

  return (
    <FlatList
      onScroll={(event) =>
        handleScrollHiddenTabBar({ event, setTabBarVisible })
      }
      style={{ paddingInline: 10, paddingBottom: 20, backgroundColor }}
      data={animes?.data}
      numColumns={width >= 768 ? 2 : 1}
      keyExtractor={(item) => item.title}
      contentContainerStyle={{
        gap: 20,
        paddingBottom: 20,
        maxWidth: 1200,
        marginInline: "auto",
      }}
      ListHeaderComponent={
        <>
          <View className="mt-10">
            <ThemedText type="title" className="text-center">
              Schedule
            </ThemedText>
          </View>
          <View
            style={{
              marginTop: 30,
            }}
            className="mb-[10px]"
          >
            <FlatList
              ref={flatListRef}
              data={arrayDays}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              scrollEnabled={loading ? false : true}
              contentContainerStyle={{ gap: 10 }}
              keyExtractor={(item) => item.day}
              getItemLayout={getItemLayout}
              renderItem={({ item, index }) => (
                <Tag
                  onPress={() => changeDay(index)}
                  title={`${item.day}${index === today ? " Today" : ""}`}
                  status={day === item.day}
                />
              )}
            ></FlatList>
          </View>
        </>
      }
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

export default Schedule;
