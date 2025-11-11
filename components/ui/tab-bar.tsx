import { useThemeColor } from "@/hooks/use-theme-color";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import TabBarIcon from "./tab-bar-icon";

const TabBar = ({
  props,
  isTabBarVisible,
}: {
  props: BottomTabBarProps;
  isTabBarVisible: boolean;
}) => {
  const { state, navigation } = props;
  const primaryColorTheme = useThemeColor({}, "primary");

  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (!isTabBarVisible) {
      translateY.value = withSpring(100, { duration: 800 });
      opacity.value = withSpring(0, { duration: 800 });
    } else {
      opacity.value = withSpring(1, { duration: 800 });
      translateY.value = withSpring(0, { duration: 800 });
    }
  }, [isTabBarVisible]);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
        backgroundColor: primaryColorTheme,
      }}
      className={`absolute self-center flex-row overflow-hidden w-[80%] p-1 justify-between bottom-[15] rounded-full`}
    >
      {state.routes.map(({ name }, index) => (
        <TabBarIcon
          onPress={() => navigation.navigate(name)}
          key={name}
          title={name === "index" ? "Home" : name}
          icon={
            name === "index"
              ? "home"
              : name === "schedule"
                ? "schedule"
                : name === "top"
                  ? "10k"
                  : "settings"
          }
          focused={state.index === index}
        />
      ))}
    </Animated.View>
  );
};

export default TabBar;
