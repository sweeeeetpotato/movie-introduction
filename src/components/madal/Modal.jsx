import React from "react";
import modalStore from "store/modalStore";
import watchListStore from "store/watchListStore";
import styles from "./modal.module.css";
import close from "../../assets/close.png";

export default function Modal({ text }) {
  const { modalNameUpdate } = modalStore();
  const { moviesAllRemove } = watchListStore();
  const closeModal = () => {
    moviesAllRemove();
    modalNameUpdate("");
  };

  return (
    <div className={styles.overlay}>
      <article className={styles.modalBox}>
        <p className={styles.text}>{text}</p>
        <button
          className={`${styles.btn} ${styles.cancel_btn}`}
          onClick={() => modalNameUpdate("")}
        >
          취소
        </button>
        <button
          className={`${styles.btn} ${styles.remove_btn}`}
          onClick={closeModal}
        >
          삭제
        </button>
        <button type="button" className={styles.close_btn}>
          <img
            src={close}
            alt="모달창 닫기"
            className={styles.close_img}
            onClick={() => modalNameUpdate("")}
          />
        </button>
      </article>
    </div>
  );
}
