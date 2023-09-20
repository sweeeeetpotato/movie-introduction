import React from "react";
import movieListStore from "store/movieListStore";
import MovieGrid from "components/movieGrid/MovieGrid";
import { useMovieListSWR } from "customHook/useMovieSWR";
import styles from "./movieListMain.module.css";

export default function MovieListMain() {
  const { API_URL, pageIndex } = movieListStore();
  const { data, isLoading, error } = useMovieListSWR(API_URL(), pageIndex);

  return (
    <main className={styles.main}>
      {error && (
        <p className={`${styles.error_message} ${styles.text}`}>{error}</p>
      )}
      {isLoading ? (
        <p className={`${styles.loading_text} ${styles.text}`}>Loading...</p>
      ) : (
        <MovieGrid data={data} />
      )}
    </main>
  );
}
