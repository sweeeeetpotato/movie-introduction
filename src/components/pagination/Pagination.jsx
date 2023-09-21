import React from "react";
import { preload } from "swr";
import { fetcher } from "customHook/useMovieSWR";
import movieListStore from "store/movieListStore";
import styles from "./pagination.module.css";
import leftArrow from "../../assets/page-left-arrow.png";
import farLeftArrow from "../../assets/page-far-left-arrow.png";
import rightArrow from "../../assets/page-right-arrow.png";
import farRightArrow from "../../assets/page-far-right-arrow.png";

export default function Pagination({ movieTotalCount }) {
  const { API_URL, movieCount, movieCountList, pageIndex, pageIndexUpdate } =
    movieListStore();
  const count =
    movieCount === "페이지당 항목수" ? 20 : movieCountList[movieCount];
  const pageCount = Math.ceil(movieTotalCount / count);
  const handlePageBtn = (index) => {
    pageIndexUpdate(index);
  };

  const renderMoveButtons = ({ src, alt, onClick, onMouseEnter }) => {
    return (
      <button type="button" className={styles.moveBtn}>
        <img
          src={src}
          alt={alt}
          className={styles.arrowImg}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
        />
      </button>
    );
  };

  const renderPageButtons = () => {
    const buttons = [];
    const startIndex = Math.floor((pageIndex - 1) / 10) * 10 + 1;
    const endIndex = Math.min(startIndex + 9, pageCount);

    for (let i = startIndex; i <= endIndex; i++) {
      buttons.push(
        <button
          key={i}
          type="button"
          className={`${styles.pageBtn} ${
            pageIndex === i && styles.activePageBtn
          }`}
          onClick={() => handlePageBtn(i)}
          onMouseEnter={() => preload(API_URL() + i, fetcher)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className={styles.container}>
      {renderMoveButtons({
        src: farLeftArrow,
        alt: "맨앞 페이지",
        onClick: () => pageIndexUpdate(1),
      })}
      {renderMoveButtons({
        src: leftArrow,
        alt: "이전 페이지",
        onClick: () =>
          pageIndexUpdate(
            pageIndex === 1
              ? pageIndex
              : Math.floor((pageIndex - 10) / 10) * 10 + 1
          ),
        onMouseEnter: () =>
          preload(
            API_URL() + (Math.floor((pageIndex - 10) / 10) * 10 + 1),
            fetcher
          ),
      })}
      {renderPageButtons()}
      {renderMoveButtons({
        src: rightArrow,
        alt: "다음 페이지",
        onClick: () =>
          pageIndexUpdate(
            pageIndex === pageCount
              ? pageIndex
              : Math.floor((pageIndex + 10) / 10) * 10 + 1
          ),
        onMouseEnter: () =>
          preload(
            API_URL() + (Math.floor((pageIndex + 10) / 10) * 10 + 1),
            fetcher
          ),
      })}
      {renderMoveButtons({
        src: farRightArrow,
        alt: "맨뒤 페이지",
        onClick: () => pageIndexUpdate(pageCount),
        onMouseEnter: () => preload(API_URL() + pageCount, fetcher),
      })}
    </div>
  );
}
