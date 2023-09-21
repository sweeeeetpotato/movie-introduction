import React from "react";
import { useParams } from "react-router-dom";
import watchListStore from "store/watchListStore";
import rating_icon from "../../assets/rating-icon.png";
import MovieSuggestions from "components/movieSuggestions/MovieSuggestions";
import { useMovieSWR } from "customHook/useMovieSWR";
import styles from "./movieDetail.module.css";
import plus from "../../assets/plus-icon.png";
import check from "../../assets/check-icon.png";

export default function MovieDetail() {
  const { movieId } = useParams();
  const { movies, moviesUpdate } = watchListStore();
  const API_URL = `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`;
  const { data, isLoading, error } = useMovieSWR(API_URL);

  return (
    <section className={styles.container}>
      {error && <p className={styles.error_message}>{error}</p>}
      {isLoading ? (
        <p className={styles.loading_text}>Loading...</p>
      ) : (
        <>
          <img
            src={data.movie.large_cover_image}
            alt={`${data.movie.title} 포스터 이미지`}
            className={styles.movie_img}
          />
          <div className={styles.content_wrapper}>
            <h3 className={styles.movie_title}>{data.movie.title}</h3>
            <p>{data.movie.title_long}</p>
            <div className={styles.runtime_rating_box}>
              {data.movie.runtime !== 0 && <p>{data.movie.runtime + "분"}</p>}
              <div className={styles.rating_box}>
                <img
                  src={rating_icon}
                  alt="평점 별모양"
                  className={styles.rating_img}
                />
                <p>{data.movie.rating / 2}</p>
              </div>
            </div>
            <div>
              {data.movie.genres?.map((genre, idx) => (
                <span key={idx} className={styles.genre_label}>
                  {genre}
                </span>
              ))}
            </div>
            <p className={styles.description_text}>
              {data.movie.description_full}
            </p>
            <div className={styles.addWatchList_box}>
              <button
                type="button"
                className={styles.plus_btn}
                onClick={() => moviesUpdate(data.movie.id, data.movie)}
              >
                <img
                  src={movies.hasOwnProperty(data.movie.id) ? check : plus}
                  alt="영화 찜하기"
                  className={styles.plus_img}
                />
              </button>
              <span>
                {movies.hasOwnProperty(data.movie.id) ? "찜 취소" : "찜하기"}
              </span>
            </div>
          </div>
          <MovieSuggestions movieId={movieId} />
        </>
      )}
    </section>
  );
}
