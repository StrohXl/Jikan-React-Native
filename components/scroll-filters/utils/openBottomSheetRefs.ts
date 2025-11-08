import { BottomSheetHandle } from "@/components/bottom-sheet/types";

export interface OpenBottomSheetRefsParams {
  index: number;
  refBottomSheetFilterArray: React.RefObject<BottomSheetHandle | null>[];
  refBottomSheetFilters: React.RefObject<BottomSheetHandle | null>;
}

export function openBottomSheetRefs({
  params,
}: {
  params: OpenBottomSheetRefsParams;
}) {
  const { refBottomSheetFilterArray, index, refBottomSheetFilters } = params;
  refBottomSheetFilters.current?.closeSheet();
  refBottomSheetFilterArray[index].current?.openSheet();
}
