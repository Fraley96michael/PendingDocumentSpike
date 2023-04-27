import React from "react";
import styles from "../scss/modules/BadgeDot.module.scss";

export const BadgeDot = ({ status = "" }) => {
  let dotClass;
  if (status === "required") {
    dotClass = styles.required;
  } else if (status === "pending") {
    dotClass = styles.pending;
  } else if (status === "declined") {
    dotClass = styles.declined;
  } else {
    dotClass = styles.dot;
  }
  return (
    <div className={styles.badgeDot}>
      <div className={dotClass} />
    </div>
  );
};

export default BadgeDot;
