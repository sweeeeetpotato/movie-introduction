import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <address className={styles.copyright}>
        FILMFLIX &copy; SWEET_POTATO
      </address>
    </footer>
  );
}
