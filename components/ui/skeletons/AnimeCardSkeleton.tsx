import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";

const AnimeCardSkeleton = ({
  widthImage = 200,
  show = true,
}: {
  widthImage?: number;
  show?: boolean;
}) => {
  const colorTheme = useColorScheme() ?? "dark";
  const dark = useThemeColor({}, "dark");

  const height = widthImage / 0.7;
  return (
    <View style={{ width: widthImage }}>
      <Skeleton
        show={show}
        width={widthImage}
        height={height}
        backgroundColor={dark}
        colorMode={colorTheme}
      />

      <View className="mt-2">
        <Skeleton
          radius={5}
          show={show}
          width={widthImage}
          height={25}
          backgroundColor={dark}
          colorMode={colorTheme}
        />
      </View>
    </View>
  );
};

export default AnimeCardSkeleton;
