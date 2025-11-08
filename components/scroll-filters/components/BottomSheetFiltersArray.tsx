import BottomSheet from "@/components/bottom-sheet/BottomSheet";
import { BottomSheetHandle } from "@/components/bottom-sheet/types";
import Tag from "@/components/ui/tag";
import { useContextSearch } from "@/features/search/hooks/contextSearch";
import React from "react";
import { ScrollView, View } from "react-native";
import { addTag } from "../utils/addTag";

const BottomSheetFiltersArray = ({
  refBottomSheetFilterArray,
  refScrollView,
}: {
  refBottomSheetFilterArray: React.RefObject<BottomSheetHandle | null>[];
  refScrollView: React.RefObject<ScrollView | null>;
}) => {
  const { filters, setFilters } = useContextSearch();

  return (
    <>
      {filters.map((item, index) => {
        const value = filters[index].value;

        return (
          <BottomSheet
            key={item.title}
            ref={refBottomSheetFilterArray[index]}
            activeHeight={item.height}
            title={item.title}
          >
            <View className="flex-row gap-2 " style={{ flexWrap: "wrap" }}>
              {item.values.map((item) => {
                return (
                  <View key={item.title}>
                    <Tag
                      onPress={() =>
                        addTag({
                          filters,
                          index,
                          refBottomSheetFilterArray,
                          refScrollView,
                          setFilters,
                          value: item.value,
                        })
                      }
                      title={item.title}
                      status={true}
                      showIcon={true}
                      nameIcon={
                        value === item.value && filters[index].status
                          ? "check"
                          : "add"
                      }
                      sizeIcon={20}
                      colorIcon={
                        value === item.value && filters[index].status
                          ? "#16a34a"
                          : "#fff"
                      }
                    />
                  </View>
                );
              })}
            </View>
          </BottomSheet>
        );
      })}
    </>
  );
};

export default BottomSheetFiltersArray;
