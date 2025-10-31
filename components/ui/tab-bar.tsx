import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import TabBarIcon from "./tab-bar-icon";

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View className="absolute self-center flex-row overflow-hidden p-3 justify-between w-[80%] bottom-[15] bg-gray-900 rounded-full">
      {state.routes.map(({ name }, index) => (
        <TabBarIcon
          onPress={() => navigation.navigate(name)}
          key={name}
          title={name === "index" ? "Home" : name}
          icon={
            name === "index"
              ? "home"
              : name === "search"
                ? "search"
                : name === "top"
                  ? "10k"
                  : "settings"
          }
          focused={state.index === index}
        />
      ))}
    </View>
  );
};

export default TabBar;
