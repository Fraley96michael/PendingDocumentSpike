import React, { useState } from "react";
import { DocumentItem } from "./DocumentItem";
import UploadFileLocation from "../UploadFileLocation";
import styles from "../../scss/modules/UploadModal.module.scss";
import { DocType } from "../../shared/types";

interface Props {
  label: string;
  docType: DocType;
  showUploadLocation: boolean;
  uploadedFiles: (File | null)[];
  handleToggleUploadLocation: (docType: DocType) => void;
  handleDeleteFile: (docType: DocType, file: File) => void;
  updateUploadedFiles: (docType: DocType, newFiles: (File | null)[]) => void;
  isSubmitted: boolean;
}

const DocumentUpload = ({
  label,
  docType,
  showUploadLocation,
  uploadedFiles,
  handleToggleUploadLocation,
  handleDeleteFile,
  updateUploadedFiles,
  isSubmitted,
}: {
  label: string;
  docType: DocType;
  showUploadLocation: boolean;
  uploadedFiles: (File | null)[];
  handleToggleUploadLocation: (docType: DocType) => void;
  handleDeleteFile: (docType: DocType, file: File) => void;
  updateUploadedFiles: (docType: DocType, newFiles: (File | null)[]) => void;
  isSubmitted: boolean;
}) => {
  const [emphasis, setEmphasis] = useState(false);

  const handleClick = () => {
    if (uploadedFiles.length > 0 && !isSubmitted) {
      handleToggleUploadLocation(docType);
      setEmphasis(!emphasis);
    }
  };

  return (
    <div className={styles.documentUpload} onClick={handleClick}>
      <DocumentItem
        label={label}
        onToggle={handleClick}
        isSubmitted={isSubmitted}
        emphasis={emphasis ? "Submitted" : ""}
        hasFile={uploadedFiles.length > 0}
      />
      {showUploadLocation && (
        <UploadFileLocation
          className={styles.uploadFileLocation}
          handleDeleteFile={(file) => handleDeleteFile(docType, file)}
          updateUploadedFiles={(newFiles) =>
            updateUploadedFiles(docType, newFiles)
          }
          uploadedFiles={uploadedFiles}
        />
      )}
    </div>
  );
};

export default DocumentUpload;
