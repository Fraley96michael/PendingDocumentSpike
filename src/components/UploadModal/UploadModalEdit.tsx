import X from "../X";
import CancelButton from "../CancelButton";

import styles from "../../scss/modules/UploadModal.module.scss";
import UploadButton from "../UploadButton";
import { Heading } from "./UploadHeading";
import { UploadDescription } from "./UploadDescription";
import { useState } from "react";
import { CloseConfirmationModal } from "./CloseConfirmationModal";
import DocumentUpload from "./DocumentUpload";
import {
  handleCloseConfirmation,
  handleDeleteFile,
  handleToggleUploadLocation,
  updateUploadedFiles,
} from "../../shared/utils";
import AlertWithExclamation from "./AlertWithExclamation";
import { DocType } from "../../shared/types";

const UploadModal = ({ closeModal }: { closeModal: () => void }) => {
  const [showUploadLocations, setShowUploadLocations] = useState({
    birthCertificate: { show: false, file: null as File | null },
    hospitalRecords: { show: false, file: null as File | null },
    socialSecurityCard: { show: false, file: null as File | null },
    adoptionCertificate: { show: false, file: null as File | null },
  });
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    if (event.target === event.currentTarget) {
      handleCloseConfirmation(false, closeModal, setShowCloseConfirmation);
    }
  };

  const handleSubmit = () => {
    // Validate the form
    const requiredFileTypes: DocType[] = [
      "birthCertificate",
      "hospitalRecords",
      "socialSecurityCard",
      "adoptionCertificate",
    ];
    const uploadedFileTypes = requiredFileTypes.filter(
      (docType: DocType) => showUploadLocations[docType].file !== null
    );
    console.log(showUploadLocations);

    if (uploadedFileTypes.length < 2) {
      alert("Please upload at least two of the required documents.");
      return;
    }

    setIsSubmitted(true);

    // Gather the uploaded files
    const formData = new FormData();
    uploadedFileTypes.forEach((docType: DocType) => {
      formData.append(docType, showUploadLocations[docType].file as File);
    });

    // Simulate the submission process
    setTimeout(() => {
      alert("Documents uploaded successfully.");
      setIsSubmitted(false);
    }, 2000);

    // Commented out code for future implementation
    // try {
    //   const response = await fetch("/api/upload-documents", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to upload documents.");
    //   }

    //   // Handle successful submission (e.g., show a success message or navigate to another page)
    //   alert("Documents uploaded successfully.");
    // } catch (error: any) {
    //   setIsSubmitted(false);
    //   // Handle the error (e.g., show an error message)
    //   alert(error.message);
    // }
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
            <div className={styles.upload__description__container}>
              <UploadDescription />
              <p className={styles.must__submitt__text}>
                Two of these items must be submitted
              </p>
            </div>
            <div>
              <AlertWithExclamation />
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
                  isSubmitted={isSubmitted}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.cancel__upload__container}>
          <CancelButton onClick={askCloseConfirmation} />
          <UploadButton onClick={handleSubmit} />
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
