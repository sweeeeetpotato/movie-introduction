import React from "react";
import SearchResultList from "components/searchResultList/SearchResultList";
import styles from "./searchMain.module.css";

export default function SearchResultMain() {
  return (
    <main className={styles.main}>
      <SearchResultList />
    </main>
  );
}
