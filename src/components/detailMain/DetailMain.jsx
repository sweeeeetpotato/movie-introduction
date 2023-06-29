import React from "react";
import MovieDetail from "components/movieDetail/MovieDetail";
import styles from "./detailMain.module.css"

export default function DetailMain() {
  return (
    <main className={styles.main}>
      <MovieDetail />
    </main>
  );
}
