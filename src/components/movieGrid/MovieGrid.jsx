import React, { useEffect } from "react";
import movieListStore from "store/movieListStore";
import MovieCard from "components/movieCard/MovieCard";
import Pagination from "components/pagination/Pagination";
import SelectBox from "components/selectBox/SelectBox";
import styles from "./movieGrid.module.css";

export default function MovieGrid({ data }) {
  const {
    movieSort,
    movieSortList,
    movieSortUpdate,
    movieCount,
    movieCountList,
    movieCountUpdate,
    movieApiPropsUpdate,
  } = movieListStore();
  const count =
    movieCount === "페이지당 항목수" ? 20 : movieCountList[movieCount];

  useEffect(() => {
    const sort =
      movieSort === "정렬 기준" ? ["year", "desc"] : movieSortList[movieSort];
    const count =
      movieCount === "페이지당 항목수" ? 20 : movieCountList[movieCount];
    movieApiPropsUpdate(sort, count);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieSort, movieCount]);

  return (
    <>
      <div className={styles.top}>
        <h3 className={styles.title}>영화 목록</h3>
        <SelectBox
          selectName={movieCount}
          selectNameUpdate={movieCountUpdate}
          selectList={movieCountList}
        />
        <SelectBox
          selectName={movieSort}
          selectNameUpdate={movieSortUpdate}
          selectList={movieSortList}
        />
      </div>
      <section className={styles.container}>
        <MovieCard mode={"grid"} data={data} />
      </section>
      <div className={styles.bottom}>
        <Pagination movieTotalCount={data?.movie_count} />
        <span className={styles.pageCount}>
          총 페이지수 : {Math.ceil(data?.movie_count / count)}개
        </span>
      </div>
    </>
  );
}
