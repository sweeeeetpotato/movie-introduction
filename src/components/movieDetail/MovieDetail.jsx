import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./movieDetail.module.css";

export default function MovieDetail() {
  const [detail, setDetail] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    const movieDetail = () => {
      fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`)
        .then((response) => response.json())
        .then((json) => {
          setDetail(json.data.movie);
        });
    };
    movieDetail();
  }, [movieId]);

  return (
    <section className={styles.container}>
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
    </section>
  );
}
