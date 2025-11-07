import { BottomSheetHandle } from "@/components/bottom-sheet/types";
import Tag from "@/components/ui/tag";
import { FilterParamsType } from "@/models/filters";
import { ScrollView, View } from "react-native";
import { addTag, AddTagParams } from "../utils/addTag";

export interface ContentChildrenFiltersMapParams {
  item: FilterParamsType;
  index: number;
  filters: FilterParamsType[];
  setFilters: React.Dispatch<React.SetStateAction<FilterParamsType[]>>;
  refScrollView: React.RefObject<ScrollView | null>;
  bottomSheetRefs: React.RefObject<BottomSheetHandle | null>[];
}

export default function ContentChildrenFiltersMap({
  params,
}: {
  params: ContentChildrenFiltersMapParams;
}) {
  const { item, filters, index } = params;

  const value = filters[index].value;

  return (
    <View className="flex-row gap-2 " style={{ flexWrap: "wrap" }}>
      {item.values.map((item) => {
        const paramAddTag: AddTagParams = {
          ...params,
          value: item.value,
        };
        return (
          <View key={item.title}>
            <Tag
              onPress={() =>
                addTag({
                  paramAddTag,
                })
              }
              title={item.title}
              status={true}
              showIcon={true}
              nameIcon={
                value === item.value && filters[index].status ? "check" : "add"
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
  );
}
