import React, { useRef } from "react";
import styles from "../scss/modules/FormLayoutsTextButton.module.scss";

export const AddFileButton = ({
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
    <div className={styles.FormLayoutsTextButton} onClick={handleClick}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <p className={styles.text}>Add More Files </p>
    </div>
  );
};

export default AddFileButton;
