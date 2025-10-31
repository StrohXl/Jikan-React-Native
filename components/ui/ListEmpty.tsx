import Zocial from "@expo/vector-icons/Zocial";
import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { ThemedText } from "../themed-text";

const ListEmpty = ({
  title,
  colorIcon,
  sizeIcon,
}: {
  title: string;
  sizeIcon: number;
  colorIcon: string;
}) => {
  return (
    <View className="h-full flex-1 mt-10 items-center justify-center">
      <Animated.View
        style={{
          animationName: {
            "0%": { transform: [{ rotate: "0deg" }] },
            "25%": { transform: [{ rotate: "15deg" }] },
            "50%": { transform: [{ rotate: "0deg" }] },
            "75%": { transform: [{ rotate: "-15deg" }] },
            "100%": { transform: [{ rotate: "0deg" }] },
          },
          animationIterationCount: 2,
          animationDuration: "300ms",
        }}
      >
        <Zocial name="dropbox" size={sizeIcon} color={colorIcon} />
      </Animated.View>
      <ThemedText className="mt-4 text-center" type="default">
        {title}
      </ThemedText>
    </View>
  );
};

export default ListEmpty;
