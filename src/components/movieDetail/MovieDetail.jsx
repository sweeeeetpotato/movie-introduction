import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxiosMovies } from "customHook/useAxiosMovies";
import styles from "./movieDetail.module.css";

export default function MovieDetail() {
  const { movieId } = useParams();
  const API_URL = `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`;
  const { data, loading } = useAxiosMovies(API_URL);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    data && setDetail(data.movie);
  }, [data]);

  return (
    <section className={styles.container}>
      {loading ? (
        <p className={styles.loading_text}>Loading...</p>
      ) : (
        <>
          <img
            src={detail.large_cover_image}
            alt={`${detail.title} 포스터 이미지`}
            className={styles.movie_img}
          />
          <div className={styles.content_wrapper}>
            <h3 className={styles.movie_title}>{detail.title_long}</h3>
            <p className={styles.movieInfo}>
              <span>Genres : </span>
              {detail.genres}
            </p>
            <p className={styles.movieInfo}>
              <span>Description : </span>
              {detail.description_full}
            </p>
          </div>
        </>
      )}
    </section>
  );
}
