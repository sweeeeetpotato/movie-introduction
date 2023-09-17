import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "components/menu/Menu";
import styles from "./header.module.css";
import close from "../../assets/close.png";
import search from "../../assets/search-icon.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const inputRef = useRef(null);
  const [inputFocus, setInputFocus] = useState(
    query || location.state?.isFocus ? true : false
  );

  const handleSearch = (searchTerm) => {
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  useEffect(() => {
    if (query || location.state?.isFocus) {
      inputRef.current?.focus();
    }
  }, [query, location.state?.isFocus]);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        FILMFLIX
      </Link>
      <Menu />
      {!inputFocus ? (
        <button
          type="button"
          className={styles.searchBtn}
          onClick={() => setInputFocus(true)}
        >
          <img src={search} alt="영화검색" className={styles.searchImg} />
        </button>
      ) : (
        <label htmlFor="search" className={styles.inputBox}>
          <input
            type="text"
            className={styles.input}
            placeholder="영화 제목을 입력하세요."
            value={query ? query : ""}
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputRef}
            id="search"
          />
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => navigate("/", { state: { isFocus: true } })}
          >
            <img src={close} alt="검색어 지우기" className={styles.closeImg} />
          </button>
        </label>
      )}
    </header>
  );
}
