import React from "react";
import styles from "./FooterComponent.module.css";

const FooterComponent = () => {
  return (
    <div className={styles.footer}>
      Конвертер валют ©2023 [
      <a
        href="https://github.com/YaroslavLeyman/react-converter"
        target="_blank"
        rel="noreferrer"
        className={styles.footerLink}
      >
        ссылка на гит
      </a>
      ]
    </div>
  );
};

export default FooterComponent;
