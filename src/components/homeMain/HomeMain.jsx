import React from "react";
import MovieCarousel from "components/movieCarousel/MovieCarousel";
import styles from "./homeMain.module.css";

export default function HomeMain() {
  return (
    <main className={styles.main}>
      <MovieCarousel />
    </main>
  );
}
