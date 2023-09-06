import useSWR from "swr";

export const useMovieSWR = (API_URL) => {
  const { data, error, isLoading } = useSWR(API_URL);

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
