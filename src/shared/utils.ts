import { Dispatch, SetStateAction, ChangeEvent } from "react";

/*
UploadFileLocation.tsx
*/
export function handleFileUpload(
  files: File[] | null,
  setUploadedFiles: Dispatch<SetStateAction<(File | null)[]>>,
  setIsFileAccepted: Dispatch<SetStateAction<boolean | null>>
) {
  if (files) {
    files.forEach((file) => {
      setIsFileAccepted(file.type === "application/pdf");
      setUploadedFiles((prev) => [...prev, file]);
    });
  } else {
    setIsFileAccepted(null);
    setUploadedFiles([]);
  }
}

export const handleDrop = (
  e: React.DragEvent<HTMLDivElement>,
  handleFileUpload: (files: File[] | null) => void
): void => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFileUpload(Array.from(files));
  }
};

export const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
};

export const handleDelete = (
  fileToDelete: File,
  uploadedFiles: (File | null)[],
  setUploadedFiles: Dispatch<SetStateAction<(File | null)[]>>,
  handleDeleteFile: (file: File) => void,
  updateUploadedFiles: (files: (File | null)[]) => void
): void => {
  const newUploadedFiles = uploadedFiles.filter(
    (file) => file !== fileToDelete
  );
  setUploadedFiles(newUploadedFiles);
  handleDeleteFile(fileToDelete);
  updateUploadedFiles(newUploadedFiles);
};
/*
DocumentTable.tsx
*/
export const handleButtonClick = (
  uploadText: string,
  openUploadModal: () => void,
  openReviewDocumentsModal: () => void
): void => {
  if (uploadText === "Upload") {
    openUploadModal();
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
export const handleToggleUploadLocation = (
  docType: keyof ShowUploadLocations,
  setShowUploadLocations: React.Dispatch<
    React.SetStateAction<ShowUploadLocations>
  >
): void => {
  setShowUploadLocations((prev) => ({
    ...prev,
    [docType]: { ...prev[docType], show: !prev[docType].show },
  }));
};

export const handleCloseConfirmation = (
  confirmed: boolean,
  closeModal: () => void,
  setShowCloseConfirmation: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  setShowCloseConfirmation(false);
  if (confirmed) {
    closeModal();
  }
};

export const handleDeleteFile = (
  docType: keyof ShowUploadLocations,
  file: File,
  setShowUploadLocations: React.Dispatch<
    React.SetStateAction<ShowUploadLocations>
  >
): void => {
  setShowUploadLocations((prev) => ({
    ...prev,
    [docType]: { ...prev[docType], file: null },
  }));
};

export const updateUploadedFiles = (
  docType: keyof ShowUploadLocations,
  newFiles: (File | null)[],
  setShowUploadLocations: React.Dispatch<
    React.SetStateAction<ShowUploadLocations>
  >
): void => {
  setShowUploadLocations((prev) => ({
    ...prev,
    [docType]: { ...prev[docType], file: newFiles[0] || null },
  }));
};

export const handleClick = (
  fileInputRef: React.RefObject<HTMLInputElement>
) => {
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};

export const handleFileChange = (
  e: ChangeEvent<HTMLInputElement>,
  onFileChange: (files: File[] | null) => void
) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    onFileChange(Array.from(files));
  } else {
    onFileChange(null);
  }
};

/**
 * Test Helper Function
 */
export function createFileList(files: File[]): FileList {
  const fileList = {
    length: files.length,
    item: (index: number) => files[index],
  } as {
    length: number;
    item: (index: number) => File;
    [index: number]: File;
  };

  // Add files to fileList
  for (let i = 0; i < files.length; i++) {
    fileList[i] = files[i];
  }

  return fileList as FileList;
}
