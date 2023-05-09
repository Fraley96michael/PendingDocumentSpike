import React from "react";
import styles from "../scss/modules/UploadButton.module.scss";

interface Props {
  onClick: () => void;
}

const UploadButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.text}>Upload</span>
    </button>
  );
};

export default UploadButton;
