import useSWR from "swr";
import axios from "axios";

const fetcher = async (API_URL) =>
  await axios.get(API_URL).then((res) => res.data);

export const useApiData = (API_URL) => {
  const { data, error, isLoading } = useSWR(API_URL, fetcher);

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
