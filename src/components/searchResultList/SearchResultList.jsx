import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import MovieCard from "components/movieCard/MovieCard";
import styles from "./searchResultList.module.css";

export default function SearchResultList({ data, query, setPageIndex }) {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    !query && navigate("/", { state: { isFocus: true } });
  });

  useEffect(() => {
    setSearchedData([]);
  }, [query]);

  useEffect(() => {
    if (data && Array.isArray(data.movies)) {
      const combinedData = [...searchedData, ...data.movies];
      const uniqueData = Array.from(
        new Set(combinedData.map((item) => item.id))
      );
      const filteredData = uniqueData.map((id) =>
        combinedData.find((item) => item.id === id)
      );
      setSearchedData(filteredData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (inView) {
      setPageIndex((prev) => prev + 1);
    }
  }, [inView, setPageIndex]);

  return !searchedData.length ? (
    <p className={styles.result_text}>
      입력하신 검색어 '{query}'(와)과 일치하는 결과가 없습니다.
    </p>
  ) : (
    <>
      <p className={styles.count_text}>검색 결과 : 총 {data?.movie_count}개</p>
      <section className={styles.container}>
        <MovieCard
          mode={"search"}
          data={searchedData}
          query={query}
          forwardedRef={ref}
        />
      </section>
    </>
  );
}
