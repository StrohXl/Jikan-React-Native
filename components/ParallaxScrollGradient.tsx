import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useThemeColor } from "@/hooks/use-theme-color";
import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

type CarouselProps = {
  headerAnimatedStyle?: {
    transform: (
      | {
          translateY: number;
          scale?: undefined;
        }
      | {
          scale: number;
          translateY?: undefined;
        }
    )[];
  };
  height: number;
  children: ReactNode;
};

export default function ParallaxScrollGradient({
  headerAnimatedStyle,
  height,
  children,
}: CarouselProps) {
  const backgroundTheme = useThemeColor({}, "background");
  const colorScheme = useColorScheme();
  return (
    <View
      className="absolute -z-10 w-full top-0 left-0 overflow-hidden"
      style={{ height }}
    >
      <View>
        <Animated.View style={[headerAnimatedStyle, { height }]}>
          {children}
        </Animated.View>
        <LinearGradient
          colors={
            colorScheme !== "light"
              ? ["rgba(150,150,150,0.1)", backgroundTheme]
              : ["rgba(0,0,0,0.1)", backgroundTheme]
          }
          className="absolute bottom-0 w-full h-[100%]"
        />
      </View>
    </View>
  );
}
