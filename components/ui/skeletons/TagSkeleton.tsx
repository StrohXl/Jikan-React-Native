import { useThemeColor } from "@/hooks/use-theme-color";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { useColorScheme, View } from "react-native";

const TagSkeleton = () => {
  const colorTheme = useColorScheme() ?? "dark";
  const dark = useThemeColor({}, "dark");
  return (
    <Skeleton
      show={true}
      height={27}
      width={100}
      radius={100}
      backgroundColor={dark}
      colorMode={colorTheme}
    >
      <View style={{ height: 30, justifyContent: "center" }}></View>
    </Skeleton>
  );
};

export default TagSkeleton;
