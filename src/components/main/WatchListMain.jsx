import React from "react";
import modalStore from "store/modalStore";
import watchListStore from "store/watchListStore";
import MovieCard from "components/movieCard/MovieCard";
import styles from "./watchList.module.css";

export default function WatchListMain() {
  const { movies } = watchListStore();
  const { modalNameUpdate } = modalStore();

  return (
    <main className={styles.main}>
      {Object.keys(movies).length ? (
        <>
          <div className={styles.top}>
            <h3 className={styles.title}>내가 찜한 영화 목록</h3>
            <span>총 {Object.keys(movies).length}개</span>
            <button
              type="button"
              className={`${styles.btn}`}
              onClick={() => modalNameUpdate("total")}
            >
              전체 삭제
            </button>
          </div>
          <section className={styles.container}>
            <MovieCard
              mode={"watchList"}
              data={movies}
            />
          </section>
        </>
      ) : (
        <p className={styles.text}>찜한 컨텐츠가 존재하지 않습니다.</p>
      )}
    </main>
  );
}
