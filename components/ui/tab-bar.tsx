import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import TabBarIcon from "./tab-bar-icon";

const TabBar = ({
  props,
  isTabBarVisible,
}: {
  props: BottomTabBarProps;
  isTabBarVisible: boolean;
}) => {
  const { state, navigation } = props;

  return (
    <Animated.View
      entering={FadeInDown}
      className={`absolute self-center flex-row overflow-hidden p-1 justify-between w-[80%] bottom-[15] bg-gray-900 rounded-full`}
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
