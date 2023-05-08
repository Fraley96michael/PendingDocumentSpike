import { useRef } from "react";
import { handleClick, handleFileChange } from "../shared/utils";
import styles from "../scss/modules/FormLayoutsTextButton.module.scss";

export const AddFileButton = ({
  onFileChange,
}: {
  onFileChange: (files: File[] | null) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={styles.FormLayoutsTextButton}
      onClick={() => handleClick(fileInputRef)}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e, onFileChange)}
      />
      <p className={styles.text}>Add More Files </p>
    </div>
  );
};

export default AddFileButton;
