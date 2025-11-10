import { Genre } from "@/models/genres";
import { FetchAnimeParams } from "../models/fetchAnimeParams";
import { AnimeRecommendations } from "./models/AnimeRecommedations";
import { DataAnime } from "./models/dataAnime";
import { FetchTopAnimeParams } from "./models/fetchTopAnimeParams";
import { ResponseAnimes } from "./models/responseAnimes";

export const baseUrl = `https://api.jikan.moe/v4`;

export const fetchTopAnimes = async (
  params?: FetchTopAnimeParams
): Promise<ResponseAnimes> => {
  const modifiedParams: FetchTopAnimeParams = {
    ...params,
    sfw: "true",
  };
  const urlSearchParams = new URLSearchParams(modifiedParams);
  const endPoint = `/top/anime`;
  const url = `${baseUrl + endPoint}?${urlSearchParams}`;
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch animes", { cause: response.statusText });
  }
  const data: ResponseAnimes = await response.json();
  return data;
};

export const fetchAnimeById = async (
  id: number
): Promise<{ data: DataAnime }> => {
  const endPoint = `/anime/${id}`;
  const url = `${baseUrl + endPoint}`;
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch anime", { cause: response.statusText });
  }
  const data: { data: DataAnime } = await response.json();
  return data;
};

export const fetchAnime = async (
  params?: FetchAnimeParams
): Promise<ResponseAnimes> => {
  const modifiedParams: FetchAnimeParams = {
    ...params,
    sfw: "true",
    limit: "10",
  };
  const urlSearchParams = new URLSearchParams(modifiedParams);
  const endPoint = `/anime?${urlSearchParams}`;
  const url = `${baseUrl + endPoint}`;
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch anime", { cause: response.statusText });
  }
  const data: ResponseAnimes = await response.json();
  return data;
};

export const fetchRecentEpisodes = async ({
  params,
}: {
  params: {
    filter:
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday"
      | string;
  };
}) => {
  const urlSearchParams = new URLSearchParams(params);
  const endPoint = `/schedules?${urlSearchParams}&sfw=true`;
  const url = `${baseUrl + endPoint}`;
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch anime", { cause: response.statusText });
  }
  const data: ResponseAnimes = await response.json();
  const newData = {
    data: data.data.filter((item) => item.score > 0),
    pagination: data.pagination,
  };
  return newData;
};

export const fetchGetGenres = async () => {
  const endPoint = `/genres/anime?filter=genres`;
  const url = `${baseUrl + endPoint}`;
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch anime", { cause: response.statusText });
  }
  const { data }: { data: Genre[] } = await response.json();
  return data;
};

export const fetchAnimeByIdRecommendations = async ({
  id,
}: {
  id: string | string[];
}) => {
  const endPoint = `/anime/${id}/recommendations`;
  const url = `${baseUrl + endPoint}`;
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch anime", { cause: response.statusText });
  }
  const data: { data: { entry: AnimeRecommendations }[] } =
    await response.json();
  const newData: AnimeRecommendations[] = data.data.map((item, index) => ({
    ...item.entry,
  }));
  return { data: newData.slice(0, 10) };
};
