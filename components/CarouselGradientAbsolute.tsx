import { DataAnime } from "@/services/models/dataAnime";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, useWindowDimensions, View } from "react-native";
import Animated, { interpolate } from "react-native-reanimated";
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel";

const CarouselGradientAbsolute = ({
  animes,
  headerAnimatedStyle,
}: {
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
}) => {
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
    <View
      className="absolute -z-10 w-full top-0 left-0"
      style={{ height: width }}
    >
      <View>
        <Carousel
          autoPlayInterval={5000}
          data={animes}
          scrollAnimationDuration={3000}
          height={width}
          loop={true}
          pagingEnabled={true}
          snapEnabled={true}
          width={width}
          autoPlay={true}
          style={{
            width: width,
          }}
          renderItem={({ item }) => (
            <Animated.View style={[headerAnimatedStyle, { height: width }]}>
              <Image
                source={{ uri: item.images.webp.large_image_url }}
                width={width}
                height={width}
              />
            </Animated.View>
          )}
          customAnimation={animationStyle}
        />
        <LinearGradient
          colors={["#000", "rgba(0,0,0,0.1)"]}
          className="absolute top-0 w-full h-[50%]"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.1)", "rgba(0,0,0)"]}
          className="absolute bottom-0 w-full h-[50%]"
        />
      </View>
    </View>
  );
};

export default CarouselGradientAbsolute;
