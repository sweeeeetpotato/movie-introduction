import React, { useEffect } from "react";
import MovieGrid from "components/movieGrid/MovieGrid";
import { useMovieSWR } from "customHook/useMovieSWR";
import { useMovieSWRInfinite } from "customHook/useMovieSWRInfinite";
import styles from "./movieListMain.module.css";

export default function MovieListMain() {
  const API_URL = `https://yts.mx/api/v2/list_movies.json?minimum_rating=7.8&sort_by=year&limit=20&page=1`;
  const { data, isLoading, error } = useMovieSWR(API_URL);
  const { data: allMovieArr, setSize } = useMovieSWRInfinite();

  useEffect(() => {
    data && setSize(Math.ceil(data?.movie_count / 20));
  }, [data, setSize]);

  return (
    <main className={styles.main}>
      {error && (
        <p className={`${styles.error_message} ${styles.text}`}>{error}</p>
      )}
      {isLoading ? (
        <p className={`${styles.loading_text} ${styles.text}`}>Loading...</p>
      ) : (
        <MovieGrid data={data} allMovieArr={allMovieArr} />
      )}
    </main>
  );
}
