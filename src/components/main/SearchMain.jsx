import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMovieSWR } from "customHook/useMovieSWR";
import SearchResultList from "components/searchResultList/SearchResultList";
import styles from "./searchMain.module.css";

export default function SearchResultMain() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [pageIndex, setPageIndex] = useState(1);
  const API_URL = `https://yts.mx/api/v2/list_movies.json?minimum_rating=3&sort_by=rating&limit=50&query_term=${query}&page=${pageIndex}`;
  const { data, isLoading, error } = useMovieSWR(API_URL);

  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  return (
    <main className={styles.main}>
      {error && (
        <p className={`${styles.error_message} ${styles.text}`}>{error}</p>
      )}
      {pageIndex === 1 && isLoading ? (
        <p className={`${styles.loading_text} ${styles.text}`}>검색중...</p>
      ) : (
        <SearchResultList
          data={data}
          isLoading={isLoading}
          query={query}
          setPageIndex={setPageIndex}
        />
      )}
    </main>
  );
}
