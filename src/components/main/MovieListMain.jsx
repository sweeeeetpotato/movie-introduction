import React, { useState } from "react";
import MovieGrid from "components/movieGrid/MovieGrid";
import { useMovieListSWR } from "customHook/useMovieSWR";
import styles from "./movieListMain.module.css";
import movieListStore from "store/movieListStore";

export default function MovieListMain() {
  const [pageIndex, setPageIndex] = useState(1);
  const { API_URL } = movieListStore();
  const { data, isLoading, error } = useMovieListSWR(API_URL(), pageIndex);

  return (
    <main className={styles.main}>
      {error && (
        <p className={`${styles.error_message} ${styles.text}`}>{error}</p>
      )}
      {isLoading ? (
        <p className={`${styles.loading_text} ${styles.text}`}>Loading...</p>
      ) : (
        <MovieGrid
          data={data}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
    </main>
  );
}
