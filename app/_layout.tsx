import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "./global.css";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { loadTheme, saveTheme } from "@/services/async-storage/theme-storage";
import { createContext, useEffect, useState } from "react";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
export const unstable_settings = {
  anchor: "(tabs)",
};

export const ContainerTheme = createContext<
  | {
      theme: "dark" | "light" | false;
      setTheme: React.Dispatch<React.SetStateAction<false | "dark" | "light">>;
      valueTheme: Theme;
      toggleTheme: (value: "dark" | "light" | false) => void;
    }
  | undefined
>(undefined);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [theme, setTheme] = useState<"dark" | "light" | false>(false);

  const toggleTheme = async (value: "dark" | "light" | false) => {
    setTheme(value);
    await saveTheme(value);
  };

  useEffect(() => {
    const getTheme = async () => {
      const themeStorage = await loadTheme();
      if (
        (themeStorage !== null && themeStorage === "dark") ||
        (themeStorage !== null && themeStorage === "light")
      ) {
        setTheme(themeStorage);
      }
    };
    getTheme();
  }, []);

  const backgroundTheme = useThemeColor({}, "background");

  const valueTheme =
    theme === "dark"
      ? DarkTheme
      : theme === "light"
        ? DefaultTheme
        : colorScheme === "dark"
          ? DarkTheme
          : DefaultTheme;

  return (
    <SafeAreaProvider
      style={{
        paddingTop: insets.top,
        backgroundColor:
          theme === "dark"
            ? Colors.dark.background
            : theme === "light"
              ? Colors.light.background
              : backgroundTheme,
      }}
    >
      <StatusBar
        style={
          theme === "dark"
            ? "light"
            : theme === "light"
              ? "dark"
              : colorScheme === "dark"
                ? "light"
                : "dark"
        }
        animated
      />
      <ContainerTheme.Provider
        value={{ theme, setTheme, valueTheme, toggleTheme }}
      >
        <ThemeProvider value={valueTheme}>
          <Stack
            screenOptions={{
              headerTitle: "",
              title: "",
              headerTransparent: true,
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
        </ThemeProvider>
      </ContainerTheme.Provider>
      <View
        style={{
          height: insets.bottom,
          backgroundColor: colorScheme === "light" ? "#fff" : "#000",
        }}
      ></View>
    </SafeAreaProvider>
  );
}
