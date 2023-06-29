import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <address className={styles.copyright}>
        FILMFLIX &copy; 14팀 : 이세영, 장예림, 홍의채
      </address>
    </footer>
  );
}
