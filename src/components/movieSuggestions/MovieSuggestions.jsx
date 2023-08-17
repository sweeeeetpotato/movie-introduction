import React from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosMovies } from "customHook/useAxiosMovies";
import styles from "./movieSuggestions.module.css";

export default function MovieSuggestions({ movieId }) {
  const navigate = useNavigate();
  const API_URL = `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movieId}`;
  const { data, loading, error } = useAxiosMovies(API_URL);
  console.log(data);

  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <aside className={styles.aside}>
      {error && <p className={styles.error_message}>{error}</p>}
      {loading ? (
        <p className={styles.loading_text}>Loading...</p>
      ) : (
        <>
          <p className={styles.aside_title}>Similar Movies</p>
          <div className={styles.movie_box}>
            {data.movies.map((movie) => (
              <button
                type="button"
                key={movie.id}
                className={styles.btn}
                onClick={() => {
                  handleMovieClick(movie.id);
                }}
              >
                <img
                  src={movie.medium_cover_image}
                  alt={`${movie.title} 포스터 이미지`}
                  className={styles.movie_img}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
