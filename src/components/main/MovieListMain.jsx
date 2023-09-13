import React, { useState } from "react";
import MovieGrid from "components/movieGrid/MovieGrid";
import styles from "./movieListMain.module.css";
import { useMovieListSWR } from "customHook/useMovieSWR";

export default function MovieListMain() {
  const [pageIndex, setPageIndex] = useState(1);
  const API_URL = `https://yts.mx/api/v2/list_movies.json?minimum_rating=7&sort_by=year&limit=20&page=`;
  const { data, isLoading, error } = useMovieListSWR(API_URL, pageIndex);

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
