import React from "react";
import styles from "./pagination.module.css";
import leftArrow from "../../assets/page-left-arrow.png";
import farLeftArrow from "../../assets/page-far-left-arrow.png";
import rightArrow from "../../assets/page-right-arrow.png";
import farRightArrow from "../../assets/page-far-right-arrow.png";

export default function Pagination({ movieCount, pageIndex, setPageIndex }) {
  const pageCount = Math.ceil(movieCount / 20);
  const handlePageBtn = (index) => {
    setPageIndex(index);
  };

  const renderMoveButtons = ({ src, alt, onClick }) => {
    return (
      <button type="button" className={styles.moveBtn}>
        <img
          src={src}
          alt={alt}
          className={styles.arrowImg}
          onClick={onClick}
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
        onClick: () => setPageIndex(1),
      })}
      {renderMoveButtons({
        src: leftArrow,
        alt: "이전 페이지",
        onClick: () =>
          setPageIndex((prev) => (prev === 1 ? prev : Math.floor(prev - 10))),
      })}
      {renderPageButtons()}
      {renderMoveButtons({
        src: rightArrow,
        alt: "다음 페이지",
        onClick: () =>
          setPageIndex((prev) =>
            prev === pageCount ? prev : Math.floor(prev + 10)
          ),
      })}
      {renderMoveButtons({
        src: farRightArrow,
        alt: "맨뒤 페이지",
        onClick: () => setPageIndex(pageCount),
      })}
    </div>
  );
}
