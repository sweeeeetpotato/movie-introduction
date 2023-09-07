import React from "react";
import styles from "./menu.module.css";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigation = useNavigate();

  return (
    <nav>
      <ul className={styles.menuBox}>
        <li>
          <button
            type="button"
            className={styles.btn}
            onClick={() => navigation("/movieList")}
          >
            영화 목록
          </button>
        </li>
        <li>
          <button type="button" className={styles.btn}>
            내가 찜한 컨텐츠
          </button>
        </li>
      </ul>
    </nav>
  );
}
