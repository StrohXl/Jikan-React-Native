export type FetchAnimeParams = {
  page?: string;
  limit?: string;
  q?: string;
  type?:
    | "tv"
    | "movie"
    | "ova"
    | "special"
    | "ona"
    | "music"
    | "cm"
    | "pv"
    | "tv_special";
  score?: string;
  min_score?: string;
  max_score?: string;
  status?: "airing" | "complete" | "upcoming";
  rating?: "g" | "pg" | "pg13" | "r17" | "r" | "rx";
  sfw?: "true" | "false";
  genres?: string;
  order_by?:
    | "mal_id"
    | "title"
    | "start_date"
    | "end_date"
    | "episodes"
    | "score"
    | "scored_by"
    | "rank"
    | "popularity"
    | "members"
    | "favorites";
  sort?: "desc" | "asc";
  producers?: string;
  start_date?: string;
  end_date?: string;
};
