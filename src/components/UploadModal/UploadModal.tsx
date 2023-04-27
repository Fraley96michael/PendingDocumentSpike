import X from "../X";
import CancelButton from "../CancelButton";

import styles from "../../scss/modules/UploadModal.module.scss";
import UploadButton from "../UploadButton";
import { Heading } from "./UploadHeading";
import { UploadingFor } from "./UploadingFor";
import { UploadDescription } from "./UploadDescription";
import { ClientInfo } from "./ClientInfo";
import { DocumentType } from "./DocumentType";
import { useState } from "react";
import { CloseConfirmationModal } from "./CloseConfirmationModal";
import DocumentUpload from "./DocumentUpload";
import {
  handleCloseConfirmation,
  handleDeleteFile,
  handleToggleUploadLocation,
  updateUploadedFiles,
} from "../../shared/utils";

const UploadModal = ({ closeModal }: { closeModal: () => void }) => {
  type DocType =
    | "birthCertificate"
    | "hospitalRecords"
    | "socialSecurityCard"
    | "adoptionCertificate";
  const [showUploadLocations, setShowUploadLocations] = useState({
    birthCertificate: { show: false, file: null as File | null },
    hospitalRecords: { show: false, file: null as File | null },
    socialSecurityCard: { show: false, file: null as File | null },
    adoptionCertificate: { show: false, file: null as File | null },
  });
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);

  const documentTypes: { label: string; key: DocType }[] = [
    { label: "Birth Certificate", key: "birthCertificate" },
    { label: "Hospital Records", key: "hospitalRecords" },
    { label: "Social Security Card", key: "socialSecurityCard" },
    { label: "Adoption Certificate", key: "adoptionCertificate" },
  ];

  const askCloseConfirmation = () => {
    setShowCloseConfirmation(true);
  };
  const onHandleCloseConfirmation = (event: React.MouseEvent) => {
    // Check if the event target is the overlay div
    if (event.target === event.currentTarget) {
      handleCloseConfirmation(false, closeModal, setShowCloseConfirmation);
    }
  };
  return (
    <div className={styles.overlay} onClick={onHandleCloseConfirmation}>
      <div
        className={`${styles.centeredModal} ${styles.modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.upload__modal__container}>
          <div className={styles.heading__container}>
            <div className={styles.leadingContent}>
              <Heading />
              <X onClick={onHandleCloseConfirmation} />
            </div>
            <div className={styles.documentUpload} />
          </div>
          <div className={styles.upload__details__container}>
            <div className={styles.upload__for__container}>
              <UploadingFor />
              <ClientInfo />
            </div>
            <DocumentType />
            <div className={styles.upload__description__container}>
              <UploadDescription />
              <p className={styles.must__submitt__text}>
                Two of these items must be submitted
              </p>
            </div>
            <div className={styles.documents__container}>
              {documentTypes.map(({ label, key }) => (
                <DocumentUpload
                  key={key}
                  label={label}
                  docType={key}
                  showUploadLocation={showUploadLocations[key].show}
                  uploadedFiles={
                    showUploadLocations[key].file
                      ? [showUploadLocations[key].file]
                      : []
                  }
                  handleToggleUploadLocation={(docType) =>
                    handleToggleUploadLocation(docType, setShowUploadLocations)
                  }
                  handleDeleteFile={(docType, file) =>
                    handleDeleteFile(docType, file, setShowUploadLocations)
                  }
                  updateUploadedFiles={(docType, newFiles) =>
                    updateUploadedFiles(
                      docType,
                      newFiles,
                      setShowUploadLocations
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.cancel__upload__container}>
          <CancelButton onClick={askCloseConfirmation} />
          <UploadButton />
        </div>
      </div>
      {showCloseConfirmation && (
        <CloseConfirmationModal
          handleCloseConfirmation={handleCloseConfirmation}
          closeModal={closeModal}
          setShowCloseConfirmation={setShowCloseConfirmation}
        />
      )}
    </div>
  );
};

export default UploadModal;
