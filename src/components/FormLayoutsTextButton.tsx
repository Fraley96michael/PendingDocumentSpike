import React, { useRef } from "react";
import styles from "../scss/modules/FormLayoutsTextButton.module.scss";

const FormLayoutsTextButton = ({
  onFileChange,
}: {
  onFileChange: (files: File[] | null) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileChange(Array.from(files));
    } else {
      onFileChange(null);
    }
  };

  return (
    <div className={styles.formLayoutsTextButton} onClick={handleClick}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <p className={styles.text}>Upload a file... </p>
    </div>
  );
};

export default FormLayoutsTextButton;
