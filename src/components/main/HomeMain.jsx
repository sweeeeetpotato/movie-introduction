import React, { useEffect, useState } from "react";
import MovieCarousel from "components/movieCarousel/MovieCarousel";
import { useMovieSWR } from "customHook/useMovieSWR";
import styles from "./homeMain.module.css";

export default function HomeMain() {
  const API_URL = (sort) => {
    return `https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=${sort}&limit=50`;
  };

  const { data: latestData } = useMovieSWR(API_URL("year"));
  const { data: highestData } = useMovieSWR(API_URL("rating"));
  const { data: popularData, isLoading, error } = useMovieSWR(API_URL("like_count"));
  const [latestMovies, setLatestMovies] = useState();

  useEffect(() => {
    latestData &&
      setLatestMovies(latestData.movies.filter((movie) => movie.year === 2023));
  }, [latestData]);

  return (
    <main className={styles.main}>
      {error && (
        <p className={`${styles.error_message} ${styles.text}`}>{error}</p>
      )}
      {isLoading ? (
        <p className={`${styles.loading_text} ${styles.text}`}>Loading...</p>
      ) : (
        <ul className={styles.list}>
          <li>
            <h3 className={styles.title}>2023년도 인기 작품</h3>
            <MovieCarousel data={latestMovies} />
          </li>
          <li>
            <h3 className={styles.title}>고평점 작품</h3>
            <MovieCarousel data={highestData?.movies} />
          </li>
          <li>
            <h3 className={styles.title}>사람들이 가장 많이 찜한 작품</h3>
            <MovieCarousel data={popularData?.movies} />
          </li>
        </ul>
      )}
    </main>
  );
}
