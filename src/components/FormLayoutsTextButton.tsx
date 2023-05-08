import React, { useRef } from "react";
import { handleClick, handleFileChange } from "../shared/utils"; // import the functions here
import styles from "../scss/modules/FormLayoutsTextButton.module.scss";

const FormLayoutsTextButton = ({
  onFileChange,
}: {
  onFileChange: (files: File[] | null) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={styles.formLayoutsTextButton}
      onClick={() => handleClick(fileInputRef)}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e, onFileChange)}
      />
      <p className={styles.text}>Upload a file... </p>
    </div>
  );
};

export default FormLayoutsTextButton;
