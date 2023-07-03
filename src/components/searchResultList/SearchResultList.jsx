import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxiosMovies } from "customHook/useAxiosMovies";
import styles from "./searchResultList.module.css";

export default function SearchResultList() {
  const API_URL =
    "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year";
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const { data, loading } = useAxiosMovies(API_URL);
  const [moviesInfo, setMoviesInfo] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    data &&
      setMoviesInfo(
        data.movies.map((val) => [val.medium_cover_image, val.title, val.id])
      );
  }, [data]);

  useEffect(() => {
    setFilteredMovies(
      moviesInfo.filter((movie) =>
        movie[1].toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [moviesInfo, query]);

  useEffect(() => {
    // 검색어가 전부 지워졌을 경우에 대비하여 query를 props로 넘겨줌
    !query && navigate("/");
  });

  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <section className={styles.container}>
      {loading ? (
        <p className={styles.loading_text}>검색중...</p>
      ) : !filteredMovies.length ? (
        <p className={styles.result_text}>
          입력하신 검색어 '{query}'(와)과 일치하는 결과가 없습니다.
        </p>
      ) : (
        filteredMovies.map((val) => (
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
        ))
      )}
    </section>
  );
}
