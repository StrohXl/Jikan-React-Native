import { BottomSheetHandle } from "@/components/bottom-sheet/types";
import { FilterParamsType } from "@/models/filters";
import { ScrollView } from "react-native";
import { closeBottomSheetRefs } from "./closeBottomSheetRefs";

export function addTag({
  index,
  refBottomSheetFilterArray,
  setFilters,
  filters,
  refScrollView,
  value,
}: {
  index: number;
  refBottomSheetFilterArray: React.RefObject<BottomSheetHandle | null>[];
  filters: FilterParamsType[];
  setFilters: React.Dispatch<React.SetStateAction<FilterParamsType[]>>;
  refScrollView: React.RefObject<ScrollView | null>;
  value: string;
}) {
  closeBottomSheetRefs({ refBottomSheetFilterArray, index });
  setFilters((prevFilters) =>
    prevFilters.map((item) => {
      if (item === filters[index]) {
        return {
          ...item,
          status: item.value === value && item.status ? false : true,
          value: value,
        };
      }
      return { ...item };
    })
  );
  refScrollView.current?.scrollTo({ x: 0, y: 0, animated: false });
}
