import React from "react";
import watchListStore from "store/watchListStore";
import MovieCard from "components/movieCard/MovieCard";
import styles from "./watchList.module.css";

export default function watchListMain() {
  const { movies } = watchListStore();

  return (
    <main className={styles.main}>
      {Object.keys(movies).length ? (
        <MovieCard mode={"watchList"} data={movies} />
      ) : (
        <p className={styles.text}>찜한 컨텐츠가 존재하지 않습니다.</p>
      )}
    </main>
  );
}
