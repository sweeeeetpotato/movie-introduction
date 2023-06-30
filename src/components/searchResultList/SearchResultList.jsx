import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./searchResultList.module.css";

export default function SearchResultList() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [moviesInfo, setMoviesInfo] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const getAPI = () => {
      fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
      )
        .then((response) => response.json())
        .then((json) => {
          setMoviesInfo(
            json.data.movies.map((val) => [
              val.medium_cover_image,
              val.title,
              val.id,
            ])
          );
        });
    };
    getAPI();
  }, []);

  useEffect(() => {
    setFilteredMovies(
      moviesInfo.filter((movie) =>
        movie[1].toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [moviesInfo, query]);

  useEffect(() => {
    !query && navigate("/");
  });

  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <section className={styles.container}>
      {filteredMovies.map((val) => (
        <article
          key={val[2]}
          className={styles.movie_box}
          onClick={() => {
            handleMovieClick(val[2]);
          }}
        >
          <img
            src={val[0]}
            alt={`${val[1]} 포스터 이미지`}
            className={styles.movie_img}
            onError={(e) => (e.target.parentNode.style.display = "none")}
          />
          <p className={styles.movie_title}>{val[1]}</p>
        </article>
      ))}
    </section>
  );
}
