import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import { BottomSheetHandle } from "@/components/bottom-sheet/types";
import { ThemedText } from "@/components/themed-text";
import React, { useRef } from "react";
import { Button, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Settings = () => {
  const refBottomSheet = useRef<BottomSheetHandle>(null);
  return (
    <GestureHandlerRootView>
      <Button
        title="Show Content"
        onPress={() => {
          refBottomSheet.current?.openSheet();
        }}
      />
      <BottomSheet
        ref={refBottomSheet}
        activeHeight={400}
        backgroundColor="#111827"
      >
        <View>
          <ThemedText>Holaaaaaaaaaaaa </ThemedText>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default Settings;
