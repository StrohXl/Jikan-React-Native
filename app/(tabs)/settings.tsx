import ContainerRadioButton from "@/components/ContainerRadioButton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React, { useContext } from "react";
import { ContainerTheme } from "../_layout";

const Settings = () => {
  const context = useContext(ContainerTheme);

  return (
    <ThemedView className="h-full px-4">
      <ThemedText type="title" className="text-center my-10">
        Settings
      </ThemedText>

      <ThemedView>
        <ThemedText type="subtitle">Mode</ThemedText>
        <ThemedView className="mt-6 gap-4">
          <ContainerRadioButton
            onPress={() => context?.toggleTheme("dark")}
            checked={context?.theme === "dark"}
            title="Dark Mode"
          />
          <ContainerRadioButton
            onPress={() => context?.toggleTheme("light")}
            checked={context?.theme === "light"}
            title="Light Mode"
          />
          <ContainerRadioButton
            onPress={() => context?.toggleTheme(false)}
            checked={context?.theme === false && true}
            title="System Mode"
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default Settings;
