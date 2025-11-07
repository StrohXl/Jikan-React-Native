import { NewGenre } from "./genres";

export type FilterParamsType =
  | {
      title: "Type";
      name: "type";
      value:
        | "tv"
        | "movie"
        | "ova"
        | "special"
        | "ona"
        | "music"
        | "cm"
        | "pv"
        | "tv_special"
        | string;
      values: [
        { title: "TV"; value: "tv" },
        { title: "Movie"; value: "movie" },
        { title: "Ova"; value: "ova" },
        { title: "Special"; value: "special" },
        { title: "Ona"; value: "ona" },
        { title: "Music"; value: "music" },
        { title: "CM"; value: "cm" },
        { title: "PV"; value: "pv" },
        { title: "TV Special"; value: "tv_special" },
      ];
      status: boolean;
      height: number;
    }
  | {
      title: "Status";
      name: "status";
      value: "airing" | "complete" | "upcoming" | string;
      values: [
        {
          title: "Airing";
          value: "airing";
        },
        {
          title: "Complete";
          value: "complete";
        },
        {
          title: "Upcoming";
          value: "upcoming";
        },
      ];
      status: boolean;
      height: number;
    }
  | {
      title: "Order By";
      name: "order_by";
      value:
        | "title"
        | "start_date"
        | "end_date"
        | "episodes"
        | "score"
        | "scored_by"
        | "rank"
        | "popularity"
        | "members"
        | "favorites"
        | string;
      values: [
        {
          title: "Title";
          value: "title";
        },
        {
          title: "Start Date";
          value: "start_date";
        },
        {
          title: "Episodes";
          value: "episodes";
        },
        {
          title: "Score";
          value: "score";
        },
        {
          title: "Scored By";
          value: "scored_by";
        },
        {
          title: "Rank";
          value: "rank";
        },
        {
          title: "Popularity";
          value: "popularity";
        },
        {
          title: "Members";
          value: "members";
        },
        {
          title: "Favorites";
          value: "favorites";
        },
      ];
      height: number;
      status: boolean;
    }
  | {
      title: "Sort";
      name: "sort";
      value: "desc" | "asc" | string;
      values: [
        {
          title: "Desc";
          value: "desc";
        },
        {
          title: "Asc";
          value: "asc";
        },
      ];
      status: boolean;
      height: number;
    }
  | {
      title: "Genres";
      name: "genres";
      value: string;
      values: NewGenre[];
      status: boolean;
      height: number;
    };
