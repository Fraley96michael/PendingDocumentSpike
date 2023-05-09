import { useState } from "react";
import DocumentTable from "./DocumentTable";
import styles from "/src/scss/modules/FollowTheSteps.module.scss";
import UploadModal from "./UploadModal/UploadModal";
import DocumentReviewModal from "./DocumentReviewModal/DocumentReviewModal";
import UploadModalEdit from "./UploadModal/UploadModalEdit";

export const FollowTheSteps = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showReviewDocumentsModal, setShowReviewDocumentsModal] =
    useState(false);
  const [showUploadModalEdit, setShowUploadModalEdit] = useState(false);

  const openUploadModal = () => {
    setShowUploadModal(true);
  };
  const closeUploadModal = () => {
    setShowUploadModal(false);
  };

  const openUploadModalEdit = () => {
    setShowUploadModalEdit(true);
  };
  const closeUploadModalEdit = () => {
    setShowUploadModalEdit(false);
  };
  const openReviewDocumentsModal = () => {
    setShowReviewDocumentsModal(true);
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

      {showUploadModal && <UploadModal closeModal={closeUploadModal} />}
      {showReviewDocumentsModal && (
        <DocumentReviewModal closeModal={closeDocumentReviewModal} />
      )}
      {showUploadModalEdit && (
        <UploadModalEdit closeModal={closeUploadModalEdit} />
      )}
      <DocumentTable
        openUploadModal={openUploadModal}
        openReviewDocumentsModal={openReviewDocumentsModal}
        openUploadModalEdit={openUploadModalEdit}
      />
    </div>
  );
};

export default FollowTheSteps;
