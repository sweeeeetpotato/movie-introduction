import React from "react";
import MovieDetail from "components/movieDetail/MovieDetail";
import styles from "./main.module.css";

export default function DetailMain() {
  return (
    <main className={`${styles.main} ${styles.detail_main}`}>
      <MovieDetail />
    </main>
  );
}
