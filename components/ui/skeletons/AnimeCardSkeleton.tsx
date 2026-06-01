import React from "react";
import { View } from "react-native";

const AnimeCardSkeleton = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: "auto",
          aspectRatio: 0.7,
          backgroundColor: "#999",
          borderRadius: 10,
        }}
      />

      <View
        className="mt-2"
        style={{
          height: 25,
          backgroundColor: "#999",
          borderRadius: 5,
        }}
      ></View>
    </View>
  );
};

export default AnimeCardSkeleton;
