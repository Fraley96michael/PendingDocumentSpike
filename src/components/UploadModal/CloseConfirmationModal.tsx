import styles from "../../scss/modules/CloseConfirmationModal.module.scss";

export const CloseConfirmationModal = ({
  handleCloseConfirmation,
  closeModal,
  setShowCloseConfirmation,
}: {
  handleCloseConfirmation: (
    confirmed: boolean,
    closeModal: () => void,
    setShowCloseConfirmation: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  closeModal: () => void;
  setShowCloseConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleNoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCloseConfirmation(false, closeModal, setShowCloseConfirmation);
  };

  return (
    <div className={styles.closeConfirmationOverlay}>
      <div className={styles.closeConfirmationModal}>
        <p>Are you sure you want to close the modal?</p>
        <div>
          <button onClick={handleNoClick} className={styles.noButton}>
            <span className={styles.text}>No</span>
          </button>
          <button
            onClick={() =>
              handleCloseConfirmation(
                true,
                closeModal,
                setShowCloseConfirmation
              )
            }
          >
            <span className={styles.text__yes}>Yes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
