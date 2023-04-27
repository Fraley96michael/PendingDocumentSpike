import React from "react";
import styles from "../scss/modules/InfoPopup.module.scss";

const authorizedDocuments = [
  "Birth Certificate",
  "Hospital Records",
  "Social Security Card",
  "Adoption Certificate",
];

export const InfoPopup = () => {
  return (
    <div className={styles.infoPopup}>
      <div className={styles.content}>
        <div className={styles.wrap}>
          <p className={styles.text}>Authorized Documents</p>
          <p className={styles.must__submit}>
            Two of these items must be submitted
          </p>
          <div className={styles.authorized__documents}>
            {authorizedDocuments.map((document, index) => (
              <div key={index} className={styles.document}>
                <div className={styles.name}>
                  {index + 1}
                  {document}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPopup;
