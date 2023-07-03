import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./header.module.css";

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
    if(query) {
      inputRef.current.focus();
    } 
  }, [query]);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        FILMFLIX
      </Link>
      <input
        type="text"
        className={styles.input}
        placeholder="검색어를 입력하세요."
        value={query ? query : searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        ref={inputRef}
      />
    </header>
  );
}
