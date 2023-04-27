import React from "react";
import { BadgeDot } from "./BadgeDot";
import styles from "../scss/modules/Badge.module.scss";

export const Badge = ({ text = "", status = "" }) => {
  let badgeClass;
  if (status === "required") {
    badgeClass = styles.required;
  } else if (status === "pending") {
    badgeClass = styles.pending;
  } else if (status === "declined") {
    badgeClass = styles.declined;
  } else {
    badgeClass = styles.dot;
  }
  return (
    <div className={styles.badge}>
      <BadgeDot status={status} />
      <p className={badgeClass}>{text}</p>
    </div>
  );
};

export default Badge;
