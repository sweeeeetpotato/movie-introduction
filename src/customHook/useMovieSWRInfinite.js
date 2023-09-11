import useSWRInfinite from "swr/infinite";

const getKey = (pageIndex, previousPageData) => {
  if (Math.ceil(previousPageData?.movie_count / 20) === pageIndex + 1)
    return null;
  return `https://yts.mx/api/v2/list_movies.json?minimum_rating=7&sort_by=year&limit=20&page=${pageIndex+1}`;
};

export const useMovieSWRInfinite = () => {
  const { data, setSize } = useSWRInfinite(getKey, { parallel: true });

  return {
    data,
    setSize,
  };
};