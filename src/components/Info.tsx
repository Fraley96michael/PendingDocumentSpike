import React, { useState } from "react";
import styles from "../scss/modules/Info.module.scss";
import InfoPopup from "./InfoPopup";

export const Info = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  return (
    <div
      className={styles.info}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        alt=""
        className={styles.vector}
        src="https://static.overlay-tech.com/assets/5040799e-eaba-4f6f-b1d2-162347f47adc.svg"
      />
      {showPopup && <InfoPopup />}
    </div>
  );
};

export default Info;
