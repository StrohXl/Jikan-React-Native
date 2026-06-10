import React from "react";
import { View } from "react-native";

const TagSkeleton = () => {
  return (
    <View
      style={{
        height: 30,
        width: 100,
        borderRadius: 100,
        backgroundColor: "#999",
      }}
    ></View>
  );
};

export default TagSkeleton;
