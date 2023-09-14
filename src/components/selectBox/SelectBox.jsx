import React, { useState } from "react";
import styles from "./selectBox.module.css";

export default function SelectBox({ setSortOrder }) {
  const [isSelectBox, setSelectBox] = useState(false);
  const [selectItemName, setSelectItemName] = useState("정렬기준");
  const SORT = {
    "연도순(dafault)": ["year", "desc"],
    인기순: ["like_count", "desc"],
    평점순: ["rating", "desc"],
    "제목순(오름차순)": ["title", "asc"],
    "제목순(내림차순)": ["title", "desc"],
  };
  const handleSelectBox = () => {
    isSelectBox ? setSelectBox(false) : setSelectBox(true);
  };

  const handleOptionItem = (optionItem) => {
    setSelectItemName(optionItem);
    setSortOrder(SORT[optionItem]);
    setSelectBox(false);
  };

  return (
    <article className={styles.dropdown_selectbox}>
      <button
        className={`${styles.dropdown_btn} ${
          isSelectBox && styles.active_dropdown_btn
        }`}
        type="button"
        onClick={handleSelectBox}
      >
        {selectItemName}
      </button>
      <ul
        className={`${styles.list_selectbox} ${
          isSelectBox && styles.active_list_selectbox
        }`}
      >
        <li>
          <button
            className={styles.optionItem}
            type="button"
            onClick={() => handleOptionItem("연도순(dafault)")}
          >
            연도순(dafault)
          </button>
        </li>
        <li>
          <button
            className={styles.optionItem}
            type="button"
            onClick={() => handleOptionItem("인기순")}
          >
            인기순
          </button>
        </li>
        <li>
          <button
            className={styles.optionItem}
            type="button"
            onClick={() => handleOptionItem("평점순")}
          >
            평점순
          </button>
        </li>
        <li>
          <button
            className={styles.optionItem}
            type="button"
            onClick={() => handleOptionItem("제목순(오름차순)")}
          >
            제목순(오름차순)
          </button>
        </li>
        <li>
          <button
            className={styles.optionItem}
            type="button"
            onClick={() => handleOptionItem("제목순(내림차순)")}
          >
            제목순(내림차순)
          </button>
        </li>
      </ul>
    </article>
  );
}
