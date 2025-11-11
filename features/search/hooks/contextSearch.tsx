import { FilterParamsType } from "@/models/filters";
import { Genre } from "@/models/genres";
import useFetch from "@/services/useFetch";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { fetchAnime, fetchGetGenres } from "@/services/api";
import { ResponseAnimes } from "@/services/models/responseAnimes";

export interface Genres {
  title: string;
  value: string;
  status: boolean;
  values: Genre[];
  height: number;
}

interface TypeContextSearch {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  textSearch: string;
  setTextSearch: React.Dispatch<React.SetStateAction<string>>;
  filters: FilterParamsType[];
  setFilters: React.Dispatch<React.SetStateAction<FilterParamsType[]>>;
  searchParams: {
    [key: string]: any;
  };
  dataGenres: Genre[] | null;
  loadingGenres: boolean;
  genres: Genres;
  setGenres: React.Dispatch<React.SetStateAction<Genres>>;
  data: ResponseAnimes | null;
  error: Error | null;
  fetchData: () => Promise<void>;
  loadingData: boolean;
  setLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
}

const UseContextSearch = createContext<TypeContextSearch | undefined>(
  undefined
);

const ContextSearch = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { genres: string };
}) => {
  const [text, setText] = useState<string>("");
  const [textSearch, setTextSearch] = useState<string>("");
  const [filters, setFilters] = useState<FilterParamsType[]>([
    {
      title: "Type",
      status: false,
      name: "type",
      value: "tv",
      values: [
        { title: "TV", value: "tv" },
        { title: "Movie", value: "movie" },
        { title: "Ova", value: "ova" },
        { title: "Special", value: "special" },
        { title: "Ona", value: "ona" },
        { title: "Music", value: "music" },
        { title: "CM", value: "cm" },
        { title: "PV", value: "pv" },
        { title: "TV Special", value: "tv_special" },
      ],
      height: 290,
    },
    {
      title: "Status",
      status: false,
      name: "status",
      value: "complete",
      values: [
        {
          title: "Airing",
          value: "airing",
        },
        {
          title: "Complete",
          value: "complete",
        },
        {
          title: "Upcoming",
          value: "upcoming",
        },
      ],
      height: 250,
    },
    {
      title: "Order By",
      status: true,
      name: "order_by",
      value: "popularity",
      values: [
        {
          title: "Title",
          value: "title",
        },
        {
          title: "Start Date",
          value: "start_date",
        },
        {
          title: "Episodes",
          value: "episodes",
        },
        {
          title: "Score",
          value: "score",
        },
        {
          title: "Scored By",
          value: "scored_by",
        },
        {
          title: "Rank",
          value: "rank",
        },
        {
          title: "Popularity",
          value: "popularity",
        },
        {
          title: "Members",
          value: "members",
        },
        {
          title: "Favorites",
          value: "favorites",
        },
      ],
      height: 360,
    },
    {
      title: "Sort",
      status: false,
      name: "sort",
      value: "asc",
      values: [
        {
          title: "Desc",
          value: "desc",
        },
        {
          title: "Asc",
          value: "asc",
        },
      ],
      height: 200,
    },
  ]);

  const searchParams = filters.reduce(
    (acc: { [key: string]: any }, item) => {
      if (item.status) {
        acc[item.name] = item.value;
        return acc;
      }
      return acc;
    },
    {} as { [key: string]: any }
  );
  const paramGenreValue = params?.genres !== "undefined" ? params.genres : "";
  const paramGenreStatus = params?.genres !== "undefined" ? true : false;

  const [genres, setGenres] = useState<Genres>({
    title: "Genres",
    value: paramGenreValue,
    status: paramGenreStatus,
    values: [],
    height: 500,
  });
  const genreFilter = genres.status ? { genres: genres.value } : {};

  const { data: dataGenres, loading: loadingGenres } = useFetch({
    fetchFunction: fetchGetGenres,
  });

  const {
    data,
    error,
    fetchData,
    loading: loadingData,
    setLoading: setLoadingData,
  } = useFetch({
    fetchFunction: () =>
      fetchAnime({ ...searchParams, q: text, ...genreFilter }),
  });

  useEffect(() => {
    if (!loadingGenres && dataGenres) {
      setGenres((prev) => ({ ...prev, values: dataGenres }));
    }
  }, [loadingGenres]);

  return (
    <UseContextSearch.Provider
      value={{
        dataGenres,
        loadingGenres,
        data,
        error,
        fetchData,
        genres,
        loadingData,
        setGenres,
        setLoadingData,
        setText,
        setTextSearch,
        text,
        textSearch,
        filters,
        setFilters,
        searchParams,
      }}
    >
      {children}
    </UseContextSearch.Provider>
  );
};

export default ContextSearch;

export function useContextSearch() {
  const context = useContext(UseContextSearch);
  if (context === undefined) {
    throw new Error("useContextSearch must be used within a ContextSearch");
  }
  return context;
}
