import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "components/menu/Menu";
import styles from "./header.module.css";
import close from "../../assets/close.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    navigate(`/search?query=${searchTerm}`);
  };

  useEffect(() => {
    if (query) {
      inputRef.current.focus();
    }
  }, [query]);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        FILMFLIX
      </Link>
      <Menu />
      <label htmlFor="search" className={styles.inputBox}>
        <input
          type="text"
          className={styles.input}
          placeholder="검색어를 입력하세요."
          value={query ? query : searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          ref={inputRef}
          id="search"
        />
        <button
          type="button"
          className={styles.closeBtn}
          onClick={() => navigate("/")}
        >
          <img src={close} alt="검색어 지우기" className={styles.closeImg} />
        </button>
      </label>
    </header>
  );
}
