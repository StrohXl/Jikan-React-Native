import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import TabBarIcon from "@/components/ui/tab-bar-icon";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: 100,
          marginBottom: 26,
          marginInline: 20,
          height: 45,
          position: "absolute",
          overflow: "hidden",
        },
        tabBarItemStyle: {
          alignItems: "center",
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="home" focused={focused} title="Home" />
          ),
          tabBarLabelStyle: {
            paddingBottom: 0,
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="search" focused={focused} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="settings" focused={focused} title="Settings" />
          ),
        }}
      />
    </Tabs>
  );
}
