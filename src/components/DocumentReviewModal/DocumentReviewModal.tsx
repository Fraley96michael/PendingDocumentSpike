import styles from "../../scss/modules/DocumentReviewModal.module.scss";
import X from "../X";
import { useState } from "react";
import { CloseConfirmationModal } from "../UploadModal/CloseConfirmationModal";

const DocumentReviewModal = ({ closeModal }: { closeModal: () => void }) => {
  const DocumentStringArray: string[] = [
    "Birth Certificate",
    "Hospital Records",
  ];

  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);

  const askCloseConfirmation = () => {
    setShowCloseConfirmation(true);
  };

  const handleCloseConfirmation = (confirmed: boolean) => {
    setShowCloseConfirmation(false);
    if (confirmed) {
      closeModal();
    }
  };

  return (
    <div className={styles.documentReviewModal}>
      <div className={styles.modal}>
        <div className={styles.outerContent}>
          <div className={styles.innerContent}>
            <div className={styles.leadingContent}>
              <div className={styles.text}>
                <p className={styles.heading}>Document Review</p>
                <p className={styles.detail}>
                  This document was uploaded on May 01, 2022
                </p>
                <p className={styles.currentStatus}>
                  Current Status is{" "}
                  <strong className={styles.detailEmphasis}>
                    Pending Approval{" "}
                  </strong>
                </p>
              </div>
              <X onClick={askCloseConfirmation} />
            </div>
            <div className={styles.documentReview} />
          </div>
          <div className={styles.buttonContainer}>
            {DocumentStringArray.map((item, index) => (
              <button className={styles.display} key={index}>
                <span className={styles.text}>{item}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.closeButton} onClick={askCloseConfirmation}>
          <p className={styles.close__text}>Close</p>
        </div>
      </div>
      {showCloseConfirmation && (
        <CloseConfirmationModal
          handleCloseConfirmation={handleCloseConfirmation}
        />
      )}
    </div>
  );
};

export default DocumentReviewModal;
