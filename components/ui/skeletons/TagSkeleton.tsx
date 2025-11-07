import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";

const SkeletonProps = {
  backgroundColor: "#343434",
  colorMode: "dark",
} as const;

const TagSkeleton = () => {
  return (
    <Skeleton
      show={true}
      height={27}
      width={100}
      radius={100}
      {...SkeletonProps}
    >
      <View style={{ height: 30, justifyContent: "center" }}></View>
    </Skeleton>
  );
};

export default TagSkeleton;
