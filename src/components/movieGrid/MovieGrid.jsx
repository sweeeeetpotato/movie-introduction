import React from "react";
import MovieCard from "components/movieCard/MovieCard";
import Pagination from "components/pagination/Pagination";
import SelectBox from "components/selectBox/SelectBox";
import styles from "./movieGrid.module.css";

export default function MovieGrid({
  API_URL,
  data,
  pageIndex,
  setPageIndex,
  setSortOrder,
}) {
  return (
    <>
      <div className={styles.top}>
        <h3 className={styles.title}>영화 목록</h3>
        <SelectBox setSortOrder={setSortOrder} />
      </div>
      <section className={styles.container}>
        <MovieCard mode={"grid"} data={data} pageIndex={pageIndex} />
      </section>
      <Pagination
        API_URL={API_URL}
        movieCount={data?.movie_count}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
    </>
  );
}
