import { useRef, useCallback, useState } from "react";
import FormLayoutsTextButton from "./FormLayoutsTextButton";
import styles from "../scss/modules/UploadModal.module.scss";
import AddFileButton from "./AddFileButton";

function UploadFileLocation({
  uploadedFiles: initialUploadedFiles = [],
  className,
  handleDeleteFile,
  updateUploadedFiles,
}: {
  uploadedFiles?: (File | null)[];
  className?: string;
  handleDeleteFile: (file: File) => void;
  updateUploadedFiles: (files: (File | null)[]) => void;
}) {
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const [isFileAccepted, setIsFileAccepted] = useState<boolean | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>(
    initialUploadedFiles ? initialUploadedFiles : []
  );

  const handleFileUpload = useCallback(
    (files: File[] | null) => {
      if (files) {
        files.forEach((file) => {
          setIsFileAccepted(file.type === "application/pdf");
          setUploadedFiles((prev) => [...prev, file]);
        });
      } else {
        setIsFileAccepted(null);
        setUploadedFiles([]);
      }
    },
    [setUploadedFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileUpload(Array.from(files));
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleDelete = (fileToDelete: File) => {
    const newUploadedFiles = uploadedFiles.filter(
      (file) => file !== fileToDelete
    );
    setUploadedFiles(newUploadedFiles);
    handleDeleteFile(fileToDelete);
    updateUploadedFiles(newUploadedFiles);
  };
  return (
    <div
      ref={dropzoneRef}
      className={`${styles.formLayoutsDragAndDrop} ${className}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className={styles.fileDropContainer}>
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, index) => (
            <div className={styles.uploadedFile} key={index}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                alt="PDF Icon"
              />
              <p>{file ? file.name : "No name included"}</p>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(file ? file : new File([], ""))}
              >
                X
              </button>
            </div>
          ))
        ) : (
          <div className={styles.fileUploadContainer}>
            <FormLayoutsTextButton onFileChange={handleFileUpload} />
            <p className={styles.supportingText}>or drag and drop</p>
          </div>
        )}
      </div>
      {uploadedFiles.length > 0 ? (
        <AddFileButton onFileChange={handleFileUpload} />
      ) : null}
    </div>
  );
}

export default UploadFileLocation;