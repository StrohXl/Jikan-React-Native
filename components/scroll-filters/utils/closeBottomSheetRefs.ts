import { BottomSheetHandle } from "@/components/bottom-sheet/types";

export function closeBottomSheetRefs({
  refBottomSheetFilterArray,
  index,
}: {
  index: number;
  refBottomSheetFilterArray: React.RefObject<BottomSheetHandle | null>[];
}) {
  refBottomSheetFilterArray[index].current?.closeSheet();
}
