import React from "react";
import { View } from "react-native";

const TagSkeleton = () => {
  return (
    <View
      style={{
        height: 30,
        width: 100,
        borderRadius: "50rem",
        backgroundColor: "#999",
      }}
    ></View>
  );
};

export default TagSkeleton;
