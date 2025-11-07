import React, {
  ReactNode,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import {
  Dimensions,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../themed-text";
import { BottomSheetHandle } from "./types";

const BottomSheet = ({
  activeHeight,
  backDropColor = "rgba(0,0,0,0.8)",
  backgroundColor = "#111827",
  children,
  ref,
  title,
}: {
  activeHeight: number;
  children: ReactNode;
  backgroundColor?: string;
  backDropColor?: string;
  ref: RefObject<BottomSheetHandle | null>;
  title?: string;
}) => {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = Dimensions.get("screen");
  const closedPositionY = screenHeight;
  const openPositionY = screenHeight - activeHeight;

  const refBody = useRef<View>(null);

  const sheetPositionY = useSharedValue(closedPositionY);
  const gestureStarPositionY = useSharedValue(0);

  const sheeStyle = useAnimatedStyle(() => ({
    top: sheetPositionY.value,
  }));

  const backdropStype = useAnimatedStyle(() => {
    const opacity = interpolate(
      sheetPositionY.value,
      [closedPositionY, openPositionY],
      [0, 0.5]
    );
    return {
      opacity,
      display: opacity < 0.2 ? "none" : "flex",
    };
  });

  const openSheet = useCallback(() => {
    sheetPositionY.value = withSpring(openPositionY, {
      damping: 50,
      stiffness: 150,
      mass: 0.5,
    });
  }, [sheetPositionY, openPositionY]);

  const closeSheet = useCallback(() => {
    sheetPositionY.value = withSpring(closedPositionY, {
      damping: 50,
      stiffness: 150,
      mass: 0.5,
    });
  }, [sheetPositionY, closedPositionY]);

  useImperativeHandle(ref, () => ({ openSheet, closeSheet }), [
    openSheet,
    closeSheet,
  ]);

  const panGestureHandler = Gesture.Pan()
    .onBegin(() => {
      gestureStarPositionY.value = sheetPositionY.value;
    })
    .onUpdate((event) => {
      const newPositionY = gestureStarPositionY.value + event.translationY;
      sheetPositionY.value = Math.min(
        Math.max(newPositionY, openPositionY),
        closedPositionY
      );
    })
    .onEnd(() => {
      if (sheetPositionY.value > openPositionY + 50) {
        sheetPositionY.value = withSpring(closedPositionY, {
          damping: 50,
          stiffness: 150,
          mass: 0.5,
        });
      } else {
        sheetPositionY.value = withSpring(openPositionY, {
          damping: 50,
          stiffness: 150,
          mass: 0.5,
        });
      }
    });

  const { width, height } = useWindowDimensions();

  return (
    <>
      <TouchableWithoutFeedback onPress={closeSheet}>
        <Animated.View
          style={[
            {
              backgroundColor: backDropColor,
              width: width,
              height: height,
              top: 0,
              position: "absolute",
              left: 0,
              zIndex: 1000,
            },
            backdropStype,
          ]}
        ></Animated.View>
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          sheeStyle,
          {
            height: activeHeight,
            backgroundColor: backgroundColor,
            paddingBottom: insets.bottom,
          },
          {
            position: "absolute",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          },
        ]}
      >
        <GestureDetector gesture={panGestureHandler}>
          <View
            style={{
              alignItems: "center",
              borderBottomColor: "#222",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: "white",
                borderRadius: 20,
                marginTop: 15,
                marginBottom: 10,
              }}
            ></View>
            {title && (
              <ThemedText
                type="subtitle"
                className="!text-xl"
                style={{ marginBottom: 10 }}
              >
                {title}
              </ThemedText>
            )}
          </View>
        </GestureDetector>

        <View
          ref={refBody}
          className="flex-[1] p-4"
          style={{ marginBottom: insets.bottom }}
        >
          {children}
        </View>
      </Animated.View>
    </>
  );
};

export default BottomSheet;
