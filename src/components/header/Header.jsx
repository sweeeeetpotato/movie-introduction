import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        FILMFLIX
      </Link>
      <input
        type="text"
        className={styles.input}
        placeholder="검색어를 입력하세요."
      />
    </header>
  );
}
