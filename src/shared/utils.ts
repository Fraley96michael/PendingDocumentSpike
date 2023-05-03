import { Dispatch, SetStateAction } from "react";
/*
UploadFileLocation.tsx
*/
export function handleFileUpload = (
  files: File[] | null,
  setUploadedFiles: Dispatch<SetStateAction<(File | null)[]>>,
  setIsFileAccepted: Dispatch<SetStateAction<boolean | null>>
) => {
  if (files) {
    files.forEach((file) => {
      setIsFileAccepted(file.type === "application/pdf");
      setUploadedFiles((prev) => [...prev, file]);
    });
  } else {
    setIsFileAccepted(null);
    setUploadedFiles([]);
  }
};

export function handleDrop = (
  e: React.DragEvent<HTMLDivElement>,
  handleFileUpload: (files: File[] | null) => void
) => {
  e.preventDefault();
  export const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFileUpload(Array.from(files));
  }
};

export function handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
};

export function handleDelete = (
  fileToDelete: File,
  uploadedFiles: (File | null)[],
  setUploadedFiles: Dispatch<SetStateAction<(File | null)[]>>,
  handleDeleteFile: (file: File) => void,
  updateUploadedFiles: (files: (File | null)[]) => void
) => {
  export const newUploadedFiles = uploadedFiles.filter(
    (file) => file !== fileToDelete
  );
  setUploadedFiles(newUploadedFiles);
  handleDeleteFile(fileToDelete);
  updateUploadedFiles(newUploadedFiles);
};
/*
DocumentTable.tsx
*/
export function handleButtonClick = (
  uploadText: string,
  openDocumentDocumentUploadModal: () => void,
  openReviewDocumentsModal: () => void
) => {
  if (uploadText === "Upload") {
    openDocumentDocumentUploadModal();
  } else if (uploadText === "Review Documents") {
    openReviewDocumentsModal();
  }
};
/**
 * Upload Modal
 */

interface ShowUploadLocation {
  show: boolean;
  file: File | null;
}

export interface ShowUploadLocations {
  birthCertificate: ShowUploadLocation;
  hospitalRecords: ShowUploadLocation;
  socialSecurityCard: ShowUploadLocation;
  adoptionCertificate: ShowUploadLocation;
}
export function handleToggleUploadLocation = (
  docType: keyof ShowUploadLocations,
  setShowUploadLocations: React.Dispatch<
    React.SetStateAction<ShowUploadLocations>
  >
) => {
  setShowUploadLocations((prev) => ({
    ...prev,
    [docType]: { ...prev[docType], show: !prev[docType].show },
  }));
};

export function handleCloseConfirmation = (
  confirmed: boolean,
  closeModal: () => void,
  setShowCloseConfirmation: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setShowCloseConfirmation(false);
  if (confirmed) {
    closeModal();
  }
};

export function handleDeleteFile = (
  docType: keyof ShowUploadLocations,
  file: File,
  setShowUploadLocations: React.Dispatch<
    React.SetStateAction<ShowUploadLocations>
  >
) => {
  setShowUploadLocations((prev) => ({
    ...prev,
    [docType]: { ...prev[docType], file: null },
  }));
};

export function updateUploadedFiles = (
  docType: keyof ShowUploadLocations,
  newFiles: (File | null)[],
  setShowUploadLocations: React.Dispatch<
    React.SetStateAction<ShowUploadLocations>
  >
) => {
  setShowUploadLocations((prev) => ({
    ...prev,
    [docType]: { ...prev[docType], file: newFiles[0] || null },
  }));
};
