import React, { useState } from "react";
import MovieCard from "components/movieCard/MovieCard";
import Pagination from "components/pagination/Pagination";
import styles from "./movieGrid.module.css";

export default function MovieGrid({ data, error, isLoading, allMovieArr }) {
  const [pageIndex, setPageIndex] = useState(1);

  return (
    <>
      {isLoading ? (
        <p className={styles.loading_text}>Loading...</p>
      ) : (
        <section className={styles.container}>
          {error && <p className={styles.error_message}>{error}</p>}
          <MovieCard
            data={data}
            pageIndex={pageIndex}
            allMovieArr={allMovieArr}
          />
        </section>
      )}
      <Pagination
        movieCount={data?.movie_count}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
    </>
  );
}
