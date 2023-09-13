import axios from "axios";
import useSWR, { preload } from "swr";

const fetcher = async (API_URL) =>
  await axios.get(API_URL).then((res) => res.data);

export const useMovieSWR = (API_URL) => {
  const { data, error, isLoading } = useSWR(API_URL, fetcher);

  return {
    data: data?.data,
    isLoading,
    error,
  };
};

export const useMovieListSWR = (API_URL, pageIndex) => {
  const { data, error, isLoading } = useSWR(API_URL + pageIndex, fetcher);
  
  for (let i = 1; i < Math.ceil(data?.data.movie_count / 20); i++) {
    preload(API_URL + (pageIndex + i), fetcher);
  }

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
