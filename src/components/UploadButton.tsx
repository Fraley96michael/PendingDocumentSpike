import React from "react";
import styles from "../scss/modules/UploadButton.module.scss";

const UploadButton = () => {
  return (
    <button className={styles.button}>
      <span className={styles.text}>Upload</span>
    </button>
  );
};

export default UploadButton;
