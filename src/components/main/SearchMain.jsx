import React from "react";
import { useLocation } from "react-router-dom";
import { useMovieSWR } from "customHook/useMovieSWR";
import SearchResultList from "components/searchResultList/SearchResultList";
import styles from "./searchMain.module.css";

export default function SearchResultMain() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const API_URL = `https://yts.mx/api/v2/list_movies.json?minimum_rating=3&sort_by=rating&limit=50&query_term=${query}`;
  const { data, isLoading, error } = useMovieSWR(API_URL);

  return (
    <main className={styles.main}>
      {error && (
        <p className={`${styles.error_message} ${styles.text}`}>{error}</p>
      )}
      {isLoading ? (
        <p className={`${styles.loading_text} ${styles.text}`}>검색중...</p>
      ) : (
        <SearchResultList data={data} query={query} />
      )}
    </main>
  );
}
