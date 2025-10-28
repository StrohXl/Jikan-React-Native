import { DataAnime } from "./dataAnime";
import { Pagination } from "./pagination";

export interface ResponseAnimes {
  data: DataAnime[];
  pagination: Pagination;
}
