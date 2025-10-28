import { FetchTopAnimeParams } from "./models/fetchTopAnimeParams";
import { ResponseAnimes } from "./models/responseAnimes";

export const baseUrl = `https://api.jikan.moe/v4`;

export const fetchTopAnimes = async ({
  params,
}: {
  params?: FetchTopAnimeParams;
}): Promise<ResponseAnimes> => {
  const urlSearchParams = new URLSearchParams(params);
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
