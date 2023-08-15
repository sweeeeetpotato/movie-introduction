import React from "react";
import MovieCard from "components/movieCard/MovieCard";
import styles from "./movieGrid.module.css";

export default function MovieGrid({ data, error }) {
  return (
    <section className={styles.container}>
      {error && <p className={styles.error_message}>{error}</p>}
      {data.movies.map((movie) => (
        <MovieCard movie={movie} />
      ))}
    </section>
  );
}
