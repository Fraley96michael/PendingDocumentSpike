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

const UploadModal = ({ closeModal }: { closeModal: () => void }) => {
  type DocType =
    | "birthCertificate"
    | "hospitalRecords"
    | "socialSecurityCard"
    | "adoptionCertificate";
  const [showUploadLocations, setShowUploadLocations] = useState({
    birthCertificate: { show: false, file: null },
    hospitalRecords: { show: false, file: null },
    socialSecurityCard: { show: false, file: null },
    adoptionCertificate: { show: false, file: null },
  });
  const documentTypes: { label: string; key: DocType }[] = [
    { label: "Birth Certificate", key: "birthCertificate" },
    { label: "Hospital Records", key: "hospitalRecords" },
    { label: "Social Security Card", key: "socialSecurityCard" },
    { label: "Adoption Certificate", key: "adoptionCertificate" },
  ];

  const handleToggleUploadLocation = (
    docType: keyof typeof showUploadLocations
  ) => {
    setShowUploadLocations((prev) => ({
      ...prev,
      [docType]: { ...prev[docType], show: !prev[docType].show },
    }));
  };

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

  const handleDeleteFile = (
    docType: keyof typeof showUploadLocations,
    file: File
  ) => {
    console.log("clicked");
    setShowUploadLocations((prev) => ({
      ...prev,
      [docType]: { ...prev[docType], file: null },
    }));
  };

  const updateUploadedFiles = (
    docType: keyof typeof showUploadLocations,
    newFiles: (File | null)[]
  ) => {
    setShowUploadLocations((prev) => ({
      ...prev,
      [docType]: { ...prev[docType], file: newFiles[0] || null },
    }));
  };

  return (
    <div className={styles.overlay} onClick={askCloseConfirmation}>
      <div
        className={`${styles.centeredModal} ${styles.modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.upload__modal__container}>
          <div className={styles.heading__container}>
            <div className={styles.leadingContent}>
              <Heading />
              <X onClick={askCloseConfirmation} />
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
                  handleToggleUploadLocation={handleToggleUploadLocation}
                  handleDeleteFile={handleDeleteFile}
                  updateUploadedFiles={updateUploadedFiles}
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
        />
      )}
    </div>
  );
};

export default UploadModal;
