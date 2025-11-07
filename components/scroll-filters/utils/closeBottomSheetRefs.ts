import { BottomSheetHandle } from "@/components/bottom-sheet/types";

export function closeBottomSheetRefs({
  bottomSheetRefs,
  index,
}: {
  index: number;
  bottomSheetRefs: React.RefObject<BottomSheetHandle | null>[];
}) {
  bottomSheetRefs[index].current?.closeSheet();
}
