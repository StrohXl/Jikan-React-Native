import { Genres } from "@/features/search/hooks/contextSearch";
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

export function getTitleGenres({ genres }: { genres: Genres }) {
  const value = genres.value;
  const item = genres.values.filter((item) => `${item.mal_id}` === value);
  const title = item[0].name;
  return title;
}
