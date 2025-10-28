import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";

const SkeletonProps = {
  transition: { type: "timing", duration: 2000 },
  backgroundColor: "#d4d4d4",
  colorMode: "light",
} as const;

const AnimeCardSkeleton = ({ show }: { show: boolean }) => {
  return (
    <View className="me-4 max-w-[200]">
      <Skeleton show={show} width={200} height={300} {...SkeletonProps} />
      <View className="mt-2">
        <Skeleton show={show} width={200} height={20} {...SkeletonProps} />
      </View>
    </View>
  );
};

export default AnimeCardSkeleton;
