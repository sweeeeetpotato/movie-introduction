import React from "react";
import { useNavigate } from "react-router-dom";
import watchListStore from "store/watchListStore";
import styles from "./movieCard.module.css";
import rating_icon from "../../assets/rating-icon.png";
import plus from "../../assets/plus-icon.png";
import check from "../../assets/check-icon.png";

export default function MovieCard({
  mode,
  data,
  sliderStyle,
  query,
  forwardedRef,
}) {
  const navigate = useNavigate();
  const { movies, moviesUpdate } = watchListStore();
  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`);
  };
  const handleWatchlistClick = (e, movie) => {
    e.stopPropagation();
    moviesUpdate(movie.id, movie);
  };

  const MOVIEDATA = {
    grid: data?.movies,
    carousel: data,
    search: data,
    watchList: data && Object.values(data),
  };

  const renderSearchTitle = (movie) => {
    const index = movie.title.toLowerCase().indexOf(query.toLowerCase());

    return index === -1 ? (
      movie.title
    ) : (
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
      ref={forwardedRef}
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
      <button
        type="button"
        className={styles.plus_btn}
        onClick={(e) => handleWatchlistClick(e, movie)}
      >
        <img
          src={movies.hasOwnProperty(movie.id) ? check : plus}
          alt="영화 찜하기"
          className={styles.plus_img}
        />
      </button>
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
