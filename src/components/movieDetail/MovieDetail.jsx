import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxiosMovies } from "customHook/useAxiosMovies";
import rating_icon from "../../assets/rating-icon.png";
import styles from "./movieDetail.module.css";
import MovieSuggestions from "components/movieSuggestions/MovieSuggestions";

export default function MovieDetail() {
  const { movieId } = useParams();
  const [detail, setDetail] = useState({});
  const API_URL = `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`;
  const { data, loading, error } = useAxiosMovies(API_URL);

  useEffect(() => {
    data && setDetail(data.movie);
  }, [data]);
  console.log(data?.movie);
  return (
    <section className={styles.container}>
      {error && <p className={styles.error_message}>{error}</p>}
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
            <h3 className={styles.movie_title}>{detail.title}</h3>
            <p>{detail.title_long}</p>
            <div className={styles.runtime_rating_box}>
              {detail.runtime !== 0 && <p>{detail.runtime + "분"}</p>}
              <div className={styles.rating_box}>
                <img
                  src={rating_icon}
                  alt="평점 별모양"
                  className={styles.rating_img}
                />
                <p>{detail.rating / 2}</p>
              </div>
            </div>
            <div>
              {detail.genres?.map((genre, idx) => (
                <span key={idx} className={styles.genre_label}>
                  {genre}
                </span>
              ))}
            </div>
            <p className={styles.description_text}>{detail.description_full}</p>
          </div>

          <MovieSuggestions movieId={movieId} />
        </>
      )}
    </section>
  );
}
