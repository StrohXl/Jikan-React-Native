import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";

const SkeletonProps = {
  backgroundColor: "#d4d4d4",
  colorMode: "light",
} as const;

const AnimeCardSkeleton = ({
  widthImage = 200,
  show = true,
}: {
  widthImage?: number;
  show?: boolean;
}) => {
  const height = widthImage / 0.7;
  return (
    <View style={{ width: widthImage }}>
      <Skeleton
        show={show}
        width={widthImage}
        height={height}
        {...SkeletonProps}
      />

      <View className="mt-2">
        <Skeleton
          radius={5}
          show={show}
          width={widthImage}
          height={25}
          {...SkeletonProps}
        />
      </View>
    </View>
  );
};

export default AnimeCardSkeleton;
