import React, { useState } from "react";
import MovieCard from "components/movieCard/MovieCard";
import Pagination from "components/pagination/Pagination";
import styles from "./movieGrid.module.css";

export default function MovieGrid({ data, allMovieArr }) {
  const [pageIndex, setPageIndex] = useState(1);

  return (
    <>
      <h3 className={styles.title}>영화 목록</h3>
      <section className={styles.container}>
        <MovieCard
          mode={"grid"}
          data={data}
          pageIndex={pageIndex}
          allMovieArr={allMovieArr}
        />
      </section>
      <Pagination
        movieCount={data?.movie_count}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
    </>
  );
}
