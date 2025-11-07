import React from "react";
import { View } from "react-native";
import AnimeCardSkeleton from "./AnimeCardSkeleton";

const ColumnGapAnimeCardSkeleton = ({
  cardWidth,
  columnGap,
}: {
  columnGap: number;
  cardWidth: number;
}) => {
  return (
    <>
      <View className="flex-row" style={{ columnGap: columnGap }}>
        <AnimeCardSkeleton widthImage={cardWidth} />
        <AnimeCardSkeleton widthImage={cardWidth} />
      </View>
      <View className="flex-row" style={{ columnGap: columnGap }}>
        <AnimeCardSkeleton widthImage={cardWidth} />
        <AnimeCardSkeleton widthImage={cardWidth} />
      </View>
      <View className="flex-row" style={{ columnGap: columnGap }}>
        <AnimeCardSkeleton widthImage={cardWidth} />
        <AnimeCardSkeleton widthImage={cardWidth} />
      </View>
    </>
  );
};

export default ColumnGapAnimeCardSkeleton;
