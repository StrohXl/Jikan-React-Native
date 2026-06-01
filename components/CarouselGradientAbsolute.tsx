import { DataAnime } from "@/services/models/dataAnime";
import React from "react";
import { Image, useWindowDimensions } from "react-native";
import { interpolate } from "react-native-reanimated";
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel";
import ParallaxScrollGradient from "./ParallaxScrollGradient";

type CarouselProps = {
  animes: DataAnime[];
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
};

export default function CarouselGradientAbsolute({
  animes,
  headerAnimatedStyle,
}: CarouselProps) {
  const animationStyle: TAnimationStyle = React.useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const scale = interpolate(value, [1, 0, 1], [1, 1, 1]);
    const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0]);

    return {
      transform: [{ scale }],
      zIndex,
      opacity,
    };
  }, []);
  const { width } = useWindowDimensions();

  return (
    <ParallaxScrollGradient headerAnimatedStyle={headerAnimatedStyle}>
      <Carousel
        autoPlayInterval={5000}
        data={animes}
        scrollAnimationDuration={3000}
        height={400}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={width}
        autoPlay={true}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.images.webp.large_image_url }}
            width={width}
            className="h-full max-h-[400px]"
          />
        )}
        customAnimation={animationStyle}
      />
    </ParallaxScrollGradient>
  );
}
