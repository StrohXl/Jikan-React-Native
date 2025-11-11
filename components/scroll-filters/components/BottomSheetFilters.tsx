import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import { BottomSheetHandle } from "@/components/bottom-sheet/types";
import { ThemedText } from "@/components/themed-text";
import { useContextSearch } from "@/features/search/hooks/contextSearch";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { getTitleGenres, getTitleValues } from "../utils/getTitleValues";
import { openBottomSheetRefs } from "../utils/openBottomSheetRefs";

const BottomSheetFilters = ({
  refBottomSheetFilters,
  refBottomSheetFilterArray,
  refBottomSheetGenres,
}: {
  refBottomSheetFilters: React.RefObject<BottomSheetHandle | null>;
  refBottomSheetFilterArray: React.RefObject<BottomSheetHandle | null>[];
  refBottomSheetGenres: React.RefObject<BottomSheetHandle | null>;
}) => {
  const { filters, genres } = useContextSearch();

  const openBottomSheetGenres = () => {
    refBottomSheetFilters.current?.closeSheet();
    refBottomSheetGenres.current?.openSheet();
  };

  const dark = useThemeColor({}, "dark");

  return (
    <BottomSheet
      title={"Filters"}
      activeHeight={400}
      ref={refBottomSheetFilters}
    >
      {filters.map((item, index) => (
        <View
          key={item.title}
          className={`${index === 0 ? "pb-3" : "py-3"}`}
          style={{ borderBottomWidth: 1, borderBottomColor: dark }}
        >
          <View className="justify-between flex-row">
            <ThemedText type="default">{item.title}</ThemedText>
            <TouchableOpacity
              onPress={() =>
                openBottomSheetRefs({
                  params: {
                    index,
                    refBottomSheetFilterArray,
                    refBottomSheetFilters,
                  },
                })
              }
            >
              <ThemedText type="default">
                {filters[index].status
                  ? getTitleValues({ filters, index })
                  : "None"}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      {genres.values.length > 0 && (
        <View className={`py-3`}>
          <View className="justify-between flex-row">
            <ThemedText type="default">{genres.title}</ThemedText>
            <TouchableOpacity onPress={openBottomSheetGenres}>
              <ThemedText type="default">
                {genres.status && genres.values.length > 0
                  ? getTitleGenres({ genres })
                  : "None"}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </BottomSheet>
  );
};

export default BottomSheetFilters;
