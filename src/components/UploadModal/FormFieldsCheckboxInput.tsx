import React, { useState } from "react";
import styles from "../../scss/modules/FormFieldsCheckboxInput.module.scss";

const FormFieldsCheckboxInput = ({ onToggle }: { onToggle: () => void }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChecked(!isChecked);
    onToggle();
  };

  return (
    <div
      className={`${styles.formFieldsCheckboxInput} ${
        isChecked ? styles.checked : ""
      }`}
      onClick={handleToggle}
    >
      {isChecked && (
        <img
          alt="checkmark"
          className={styles.icon}
          src="https://static.overlay-tech.com/assets/560e5619-65fe-46bf-b172-cb74e3ab1f63.svg"
        />
      )}
    </div>
  );
};

export default FormFieldsCheckboxInput;
