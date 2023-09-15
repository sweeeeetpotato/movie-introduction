import React, { useState } from "react";
import MovieGrid from "components/movieGrid/MovieGrid";
import { useMovieListSWR } from "customHook/useMovieSWR";
import styles from "./movieListMain.module.css";

export default function MovieListMain() {
  const [pageIndex, setPageIndex] = useState(1);
  const [sortOrder, setSortOrder] = useState(["year", "desc"]);
  const API_URL = `https://yts.mx/api/v2/list_movies.json?minimum_rating=7&sort_by=${sortOrder[0]}&order_by=${sortOrder[1]}&limit=20&page=`;
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
          API_URL={API_URL}
          data={data}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          setSortOrder={setSortOrder}
        />
      )}
    </main>
  );
}
