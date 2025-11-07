import { FilterParamsType } from "@/models/filters";

export function getTitleValues({
  filters,
  index,
}: {
  index: number;
  filters: FilterParamsType[];
}) {
  const value = filters[index].value;
  const item = filters[index].values.filter((item) => item.value === value);
  const title = item[0].title;
  return title;
}
