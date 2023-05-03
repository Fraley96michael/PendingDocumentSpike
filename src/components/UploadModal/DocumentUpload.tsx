import React from "react";
import { DocumentItem } from "./DocumentItem";
import UploadFileLocation from "../UploadFileLocation";
import styles from "../../scss/modules/DocumentDocumentUploadModal.module.scss";

type DocType =
  | "birthCertificate"
  | "hospitalRecords"
  | "socialSecurityCard"
  | "adoptionCertificate";
interface Props {
  label: string;
  docType: DocType;
  showUploadLocation: boolean;
  uploadedFiles: (File | null)[];
  handleToggleUploadLocation: (docType: DocType) => void;
  handleDeleteFile: (docType: DocType, file: File) => void;
  updateUploadedFiles: (docType: DocType, newFiles: (File | null)[]) => void;
}

const DocumentUpload: React.FC<Props> = ({
  label,
  docType,
  showUploadLocation,
  uploadedFiles,
  handleToggleUploadLocation,
  handleDeleteFile,
  updateUploadedFiles,
}) => (
  <>
    <DocumentItem
      label={label}
      onToggle={() => handleToggleUploadLocation(docType)}
    />
    <UploadFileLocation
      className={showUploadLocation ? "" : styles.hidden}
      uploadedFiles={uploadedFiles}
      handleDeleteFile={(file: File) => handleDeleteFile(docType, file)}
      updateUploadedFiles={(newFiles: (File | null)[]) =>
        updateUploadedFiles(docType, newFiles)
      }
    />
  </>
);

export default DocumentUpload;
