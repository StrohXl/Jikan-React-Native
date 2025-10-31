import { DataAnime } from "./models/dataAnime";
import { FetchAnimeParams } from "./models/fetchAnimeParams";
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
