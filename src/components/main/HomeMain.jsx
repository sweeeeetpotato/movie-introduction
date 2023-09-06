import React, { useState } from "react";
import MovieCarousel from "components/movieCarousel/MovieCarousel";
import MovieGrid from "components/movieGrid/MovieGrid";
import caroucel_icon from "../../assets/caroucel-icon.png";
import grid_icon from "../../assets/grid-icon.png";
import styles from "./homeMain.module.css";
import { useApiData } from "customHook/useApiData";

export default function HomeMain() {
  const API_URL =
    "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year&page=1";
  const { data, isLoading, error } = useApiData(API_URL);
  const [visibilityMode, setVisibilityMode] = useState("grid");

  return isLoading ? (
    <p className={styles.loading_text}>Loading...</p>
  ) : (
    <main className={styles.main}>
      <div className={styles.button_box}>
        <span className={styles.title}>영화 목록</span>
        <button
          type="button"
          className={`${styles.button} ${styles.left_btn}`}
          onClick={() => setVisibilityMode("carousel")}
        >
          <img
            src={caroucel_icon}
            alt="이미지 슬라이더 모드"
            className={styles.button_img}
          />
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => setVisibilityMode("grid")}
        >
          <img
            src={grid_icon}
            alt="그리드 모드"
            className={styles.button_img}
          />
        </button>
      </div>
      {visibilityMode === "carousel" && (
        <MovieCarousel data={data} error={error} />
      )}
      {visibilityMode === "grid" && <MovieGrid data={data} error={error} />}
    </main>
  );
}
