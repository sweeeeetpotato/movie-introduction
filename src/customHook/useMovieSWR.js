import axios from "axios";
import useSWR from "swr";

export const fetcher = async (API_URL) =>
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

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
