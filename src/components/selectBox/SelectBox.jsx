import React, { useState } from "react";
import styles from "./selectBox.module.css";

export default function SelectBox({
  selectName,
  selectNameUpdate,
  selectList,
}) {
  const [isSelectBox, setSelectBox] = useState(false);
  const handleSelectBox = () => {
    isSelectBox ? setSelectBox(false) : setSelectBox(true);
  };

  const handleOptionItem = (optionItem) => {
    selectNameUpdate(optionItem);
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
        {selectName}
      </button>
      <ul
        className={`${styles.list_selectbox} ${
          isSelectBox && styles.active_list_selectbox
        }`}
      >
        {Object.keys(selectList).map((sort, index) => (
          <li key={index}>
            <button
              className={styles.optionItem}
              type="button"
              onClick={() => handleOptionItem(sort)}
            >
              {sort}
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
