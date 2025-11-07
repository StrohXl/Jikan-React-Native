import { ValueFilters } from "@/models/valueFilters";
import { ContentChildrenFiltersMapParams } from "../components/ContentChildrenFiltersBottomSheet";
import { closeBottomSheetRefs } from "./closeBottomSheetRefs";

export type AddTagParams = {
  value: ValueFilters;
} & Omit<ContentChildrenFiltersMapParams, "item">;

export function addTag({ paramAddTag }: { paramAddTag: AddTagParams }) {
  const { bottomSheetRefs, filters, index, refScrollView, setFilters, value } =
    paramAddTag;

  closeBottomSheetRefs({ bottomSheetRefs, index });
  setFilters((prevFilters) =>
    prevFilters.map((item) => {
      if (item === filters[index]) {
        return {
          ...item,
          status: item.value === value && item.status ? false : true,
          value,
        };
      }
      return { ...item };
    })
  );
  refScrollView.current?.scrollTo({ x: 0, y: 0, animated: false });
}
