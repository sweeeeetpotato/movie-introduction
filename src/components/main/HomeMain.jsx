import React from "react";
import MovieCarousel from "components/movieCarousel/MovieCarousel";
import caroucel_icon from "../../assets/caroucel-icon.png";
import grid_icon from "../../assets/grid-icon.png";
import styles from "./homeMain.module.css";
import { useAxiosMovies } from "customHook/useAxiosMovies";

export default function HomeMain() {
  const API_URL =
    "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year&limit=50";
  const { data, loading, error } = useAxiosMovies(API_URL);

  return loading ? (
    <p className={styles.loading_text}>Loading...</p>
  ) : (
    <main className={styles.main}>
      <div className={styles.button_box}>
        <button type="button" className={`${styles.button} ${styles.left_btn}`}>
          <img
            src={caroucel_icon}
            alt="이미지 슬라이더 모드"
            className={styles.button_img}
          />
        </button>
        <button type="button" className={styles.button}>
          <img
            src={grid_icon}
            alt="그리드 모드"
            className={styles.button_img}
          />
        </button>
      </div>
      <MovieCarousel data={data} error={error} />
    </main>
  );
}
