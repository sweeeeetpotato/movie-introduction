import React from "react";
import { useNavigate } from "react-router-dom";
import rating_icon from "../../assets/rating-icon.png";
import styles from "./movieCard.module.css";

export default function MovieCard({
  data,
  sliderStyle,
  pageIndex,
  allMovieArr,
}) {
  const navigate = useNavigate();
  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`);
  };
  const movieData = allMovieArr ? allMovieArr[pageIndex - 1].data : data;

  return movieData?.movies.map((movie) => (
    <article
      className={styles.movie_box}
      style={sliderStyle}
      key={movie.title}
      onClick={() => {
        handleMovieClick(movie.id);
      }}
    >
      <img
        src={movie.medium_cover_image}
        alt={`영화 ${movie.title} 포스터`}
        className={styles.movie_img}
        onError={(e) =>
          (e.target.src = `https://dummyimage.com/230x345&text=${movie.title}`)
        }
      />
      <p className={styles.movie_title}>{movie.title}</p>
      <div className={styles.rating_box}>
        <img
          src={rating_icon}
          alt="평점 별모양"
          className={styles.rating_img}
        />
        <span>{movie.rating / 2}</span>
      </div>
    </article>
  ));
}
