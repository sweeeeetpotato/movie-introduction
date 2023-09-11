import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "components/movieCard/MovieCard";
import styles from "./searchResultList.module.css";

export default function SearchResultList({ data, query }) {
  const navigate = useNavigate();

  useEffect(() => {
    !query && navigate("/");
  });

  return (
    <section className={styles.container}>
      {!data?.movie_count ? (
        <p className={styles.result_text}>
          입력하신 검색어 '{query}'(와)과 일치하는 결과가 없습니다.
        </p>
      ) : (
        <MovieCard mode={"search"} data={data} query={query} />
      )}
    </section>
  );
}
