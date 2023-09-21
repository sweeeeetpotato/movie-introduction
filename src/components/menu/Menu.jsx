import React from "react";
import styles from "./menu.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Menu() {
  const navigation = useNavigate();
  const location = useLocation();

  const handleMenuBtn = (path) => {
    navigation(path, { state: { activeMenu: path.substring(1) } });
  };

  return (
    <nav>
      <ul className={styles.menuBox}>
        <li>
          <button
            type="button"
            className={`${styles.btn} ${
              location.state?.activeMenu === "movieList" && styles.activeBtn
            }`}
            onClick={() => handleMenuBtn("/movieList")}
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
