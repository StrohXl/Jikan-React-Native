import { BottomSheetHandle } from "@/components/bottom-sheet/types";
import { FilterParamsType } from "@/models/filters";

export interface OpenBottomSheetRefsParams {
  index: number;
  bottomSheetRefs: React.RefObject<BottomSheetHandle | null>[];
  setTitleBottomSheet: React.Dispatch<React.SetStateAction<string>>;
  filters: FilterParamsType[];
  refBottomSheetFilters: React.RefObject<BottomSheetHandle | null>;
}

export function openBottomSheetRefs({
  params,
}: {
  params: OpenBottomSheetRefsParams;
}) {
  const {
    bottomSheetRefs,
    filters,
    index,
    refBottomSheetFilters,
    setTitleBottomSheet,
  } = params;

  refBottomSheetFilters.current?.closeSheet();
  setTitleBottomSheet(filters[index].title);
  bottomSheetRefs[index].current?.openSheet();
}
