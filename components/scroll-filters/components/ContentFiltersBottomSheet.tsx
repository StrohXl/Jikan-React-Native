import { ThemedText } from "@/components/themed-text";
import { FilterParamsType } from "@/models/filters";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { getTitleValues } from "../utils/getTitleValues";

import {
  openBottomSheetRefs,
  OpenBottomSheetRefsParams,
} from "../utils/openBottomSheetRefs";

const ContentFiltersBottomSheet = ({
  item,
  paramsOpenBottomSheetRefs,
}: {
  item: FilterParamsType;
  paramsOpenBottomSheetRefs: OpenBottomSheetRefsParams;
}) => {
  const { index } = paramsOpenBottomSheetRefs;
  return (
    <View
      key={item.title}
      className={`${index === 0 ? "pb-3" : "py-3"}`}
      style={{ borderBottomWidth: 1, borderBottomColor: "#333" }}
    >
      <View className="justify-between flex-row">
        <ThemedText type="default">{item.title}</ThemedText>
        <TouchableOpacity
          onPress={() =>
            openBottomSheetRefs({
              params: paramsOpenBottomSheetRefs,
            })
          }
        >
          <ThemedText type="default">
            {getTitleValues({ ...paramsOpenBottomSheetRefs })}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContentFiltersBottomSheet;
