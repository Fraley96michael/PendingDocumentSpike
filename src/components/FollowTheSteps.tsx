import { useState } from "react";
import DocumentTable from "./DocumentTable";
import styles from "/src/scss/modules/FollowTheSteps.module.scss";
import DocumentDocumentUploadModal from "./DocumentDocumentUploadModal/DocumentDocumentUploadModal";
import DocumentReviewModal from "./DocumentReviewModal/DocumentReviewModal";

export const FollowTheSteps = () => {
  const [showDocumentDocumentUploadModal, setShowDocumentDocumentUploadModal] = useState(false);
  const [showReviewDocumentsModal, setShowReviewDocumentsModal] =
    useState(false);

  const openDocumentDocumentUploadModal = () => {
    setShowDocumentDocumentUploadModal(true);
  };

  const openReviewDocumentsModal = () => {
    setShowReviewDocumentsModal(true);
  };
  const closeDocumentDocumentUploadModal = () => {
    setShowDocumentDocumentUploadModal(false);
  };
  const closeDocumentReviewModal = () => {
    setShowReviewDocumentsModal(false);
  };

  return (
    <div className={styles.frame}>
      <p className={styles.instructions}>
        <strong className={styles.instructions__heading1}>
          Follow the steps below to avoid laps in coverage due to changes
        </strong>
        <br />
        1. By placing your cursor over the verification type you can view the
        approved required information.
        <br />
        2. Once you are ready to submit your documents simply click on the
        Upload button.
        <br />
        <br />
        <strong className={styles.instructions__heading2}>
          You can stay informed on the acceptance status of your uploaded
          document by coming back to this screen or reaching out to your HR
          representative.
        </strong>
      </p>

      {showDocumentDocumentUploadModal && <DocumentDocumentUploadModal closeModal={closeDocumentDocumentUploadModal} />}
      {showReviewDocumentsModal && (
        <DocumentReviewModal closeModal={closeDocumentReviewModal} />
      )}
      <DocumentTable
        openDocumentDocumentUploadModal={openDocumentDocumentUploadModal}
        openReviewDocumentsModal={openReviewDocumentsModal}
      />
    </div>
  );
};

export default FollowTheSteps;
