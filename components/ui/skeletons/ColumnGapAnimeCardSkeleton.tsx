import React from "react";
import { View } from "react-native";
import AnimeCardSkeleton from "./AnimeCardSkeleton";

const ColumnGapAnimeCardSkeleton = ({ columnGap }: { columnGap: number }) => {
  return (
    <>
      <View className="flex-row" style={{ columnGap: columnGap }}>
        <AnimeCardSkeleton />
        <AnimeCardSkeleton />
      </View>
      <View className="flex-row" style={{ columnGap: columnGap }}>
        <AnimeCardSkeleton />
        <AnimeCardSkeleton />
      </View>
      <View className="flex-row" style={{ columnGap: columnGap }}>
        <AnimeCardSkeleton />
        <AnimeCardSkeleton />
      </View>
    </>
  );
};

export default ColumnGapAnimeCardSkeleton;
