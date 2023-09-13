import React from "react";
import { useNavigate } from "react-router-dom";
import rating_icon from "../../assets/rating-icon.png";
import styles from "./movieCard.module.css";

export default function MovieCard({
  mode,
  data,
  sliderStyle,
  query,
}) {
  const navigate = useNavigate();
  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  const MOVIEDATA = {
    grid: data?.movies,
    carousel: data,
    search: data?.movies,
  };

  const renderSearchTitle = (movie) => {
    const index = movie.title.toLowerCase().indexOf(query.toLowerCase());

    return (
      <>
        {movie.title.substr(0, index)}
        <span className={styles.searchTerm}>
          {movie.title.substr(index, query.length)}
        </span>
        {movie.title.substr(index + query.length)}
      </>
    );
  };

  return MOVIEDATA[mode]?.map((movie) => (
    <article
      className={`${mode === "carousel" && styles.carousel_box} ${
        styles.movie_box
      }`}
      style={sliderStyle}
      key={movie.id}
      onClick={() => {
        handleMovieClick(movie.id);
      }}
    >
      <img
        src={movie.medium_cover_image}
        alt={`영화 ${movie.title} 포스터`}
        className={`${mode === "carousel" && styles.carousel_img} ${
          styles.movie_img
        }`}
        onError={(e) =>
          (e.target.src = `https://dummyimage.com/230x345&text=${movie.title}`)
        }
      />
      <p className={styles.movie_title}>
        {mode === "search" ? renderSearchTitle(movie) : movie.title}
      </p>
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
