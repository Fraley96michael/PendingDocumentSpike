import React, { useState } from "react";
import styles from "../../scss/modules/FormFieldsCheckboxInput.module.scss";

const FormFieldsCheckboxInput = ({
  onToggle,
  isSubmitted,
  hasFile,
}: {
  onToggle: () => void;
  isSubmitted?: boolean;
  hasFile?: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    if (isSubmitted) return;
    e.stopPropagation();
    setIsChecked(!isChecked);
    onToggle();
  };

  const checkmarkIcon =
    hasFile && isSubmitted
      ? "https://static.overlay-tech.com/assets/bf74af93-60bc-4505-bcee-b0d9a0f936f5.svg"
      : "https://static.overlay-tech.com/assets/560e5619-65fe-46bf-b172-cb74e3ab1f63.svg";

  return (
    <div
      className={`${styles.formFieldsCheckboxInput} ${
        isChecked || (isSubmitted && hasFile) ? styles.checked : ""
      }`}
      onClick={handleToggle}
    >
      {(isChecked || (isSubmitted && hasFile)) && (
        <img alt="checkmark" className={styles.icon} src={checkmarkIcon} />
      )}
    </div>
  );
};

export default FormFieldsCheckboxInput;
