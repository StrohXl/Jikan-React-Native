import TabBar from "@/components/ui/tab-bar";
import { Tabs } from "expo-router";
import React, { createContext, useContext, useState } from "react";

interface TabBarContextType {
  isTabBarVisible: boolean;
  setTabBarVisible: (visible: boolean) => void;
}

const TabBarContext = createContext<TabBarContextType | undefined>(undefined);

export default function TabLayout() {
  const [isTabBarVisible, setTabBarVisible] = useState(true);
  return (
    <TabBarContext.Provider value={{ isTabBarVisible, setTabBarVisible }}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) =>
          isTabBarVisible ? (
            <TabBar props={props} isTabBarVisible={isTabBarVisible} />
          ) : null
        }
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="schedule" options={{ title: "Schedule" }} />
        <Tabs.Screen name="top" options={{ title: "Top" }} />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      </Tabs>
    </TabBarContext.Provider>
  );
}

export const useTabBar = () => {
  const context = useContext(TabBarContext);
  if (context === undefined) {
    throw new Error("useTabBar must be used within a TabBarProvider");
  }
  return context;
};
