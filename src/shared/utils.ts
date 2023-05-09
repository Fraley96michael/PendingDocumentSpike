import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { DocType, HandleSubmitOptions } from "./types";

/*
UploadFileLocation.tsx
*/
export const handleFileUpload = (
  files: File[] | null,
  setIsFileAccepted: React.Dispatch<React.SetStateAction<boolean | null>>,
  setUploadedFiles: React.Dispatch<React.SetStateAction<(File | null)[]>>,
  updateUploadedFiles: (files: (File | null)[]) => void
) => {
  if (files) {
    files.forEach((file) => {
      setIsFileAccepted(file.type === "application/pdf");
      setUploadedFiles((prev) => [...prev, file]);
      updateUploadedFiles([file]);
    });
  } else {
    setIsFileAccepted(null);
    setUploadedFiles([]);
  }
};

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
export const openModalBasedOnStatus = (
  uploadText: string,
  status: string,
  openUploadModal: () => void,
  openReviewDocumentsModal: () => void,
  openUploadModalEdit: () => void
): void => {
  if (uploadText === "Upload") {
    openUploadModal();
  } else if (
    uploadText === "Review Documents" &&
    status !== "Declined/Invalid"
  ) {
    openReviewDocumentsModal();
  } else if (status === "Declined/Invalid") {
    openUploadModalEdit();
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

/**
 * UploadModal
 */
export const handleSubmit = ({
  showUploadLocations,
  minRequiredFiles,
  setIsSubmitted,
  onSuccess,
  onError,
}: HandleSubmitOptions) => {
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

  if (uploadedFileTypes.length < minRequiredFiles) {
    onError && onError("Please upload at least two of the required documents.");
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
    onSuccess();
  }, 2000);
  // TODO API CALL
};
