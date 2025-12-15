import axios, { type AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

interface FetchMoviesParams {
  query: string;
  page?: number;
}

interface MoviesResponse {
  results: Movie[];
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN as string | undefined;

  if (!token) {
    throw new Error("VITE_TMDB_TOKEN is missing");
  }

  const response: AxiosResponse<MoviesResponse> = await tmdbApi.get(
    "/search/movie",
    {
      params: {
        query,
        page,
        include_adult: false,
        language: "en-US",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.results;
}
