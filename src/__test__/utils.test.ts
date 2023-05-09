import React, { ChangeEvent } from "react";
import { createEvent } from "@testing-library/dom";

import {
  handleFileUpload,
  handleDrop,
  handleDragOver,
  handleDelete,
  openModalBasedOnStatus,
  handleToggleUploadLocation,
  handleCloseConfirmation,
  handleDeleteFile,
  updateUploadedFiles,
  handleClick,
  handleFileChange,
  createFileList,
} from "../shared/utils";

describe("Utils", () => {
  // handleFileUpload test
  test("handleFileUpload", () => {
    const setUploadedFiles = jest.fn();
    const setIsFileAccepted = jest.fn();
    const files = [new File([], "test.pdf", { type: "application/pdf" })];

    handleFileUpload(files, setUploadedFiles, setIsFileAccepted);

    expect(setIsFileAccepted).toHaveBeenCalledWith(true);
    expect(setUploadedFiles).toHaveBeenCalledWith(
      expect.arrayContaining(files)
    );
  });

  // handleDrop test
  test("handleDrop", () => {
    const handleFileUpload = jest.fn();
    const mockDataTransfer = {
      files: [new File([], "test.pdf", { type: "application/pdf" })],
      dropEffect: "",
    };
    const event = {
      preventDefault: jest.fn(),
      dataTransfer: mockDataTransfer,
    } as unknown as React.DragEvent<HTMLDivElement>;

    handleDrop(event, handleFileUpload);

    expect(handleFileUpload).toHaveBeenCalledWith(
      expect.arrayContaining(Array.from(event.dataTransfer.files))
    );
  });

  // handleDragOver test
  test("handleDragOver", () => {
    const mockDataTransfer = {
      dropEffect: "",
    };
    const event = {
      preventDefault: jest.fn(),
      dataTransfer: mockDataTransfer,
    } as unknown as React.DragEvent<HTMLDivElement>;

    handleDragOver(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.dataTransfer.dropEffect).toBe("copy");
  });

  // handleDelete test
  test("handleDelete", () => {
    const file = new File([], "test.pdf", { type: "application/pdf" });
    const setUploadedFiles = jest.fn();
    const handleDeleteFile = jest.fn();
    const updateUploadedFiles = jest.fn();
    const uploadedFiles = [file];

    handleDelete(
      file,
      uploadedFiles,
      setUploadedFiles,
      handleDeleteFile,
      updateUploadedFiles
    );

    expect(setUploadedFiles).toHaveBeenCalledWith([]);
    expect(handleDeleteFile).toHaveBeenCalledWith(file);
    expect(updateUploadedFiles).toHaveBeenCalledWith([]);
  });

  // handleButtonClick test
  test("handleButtonClick", () => {
    const openUploadModal = jest.fn();
    const openReviewDocumentsModal = jest.fn();

    openModalBasedOnStatus("Upload", openUploadModal, openReviewDocumentsModal);
    expect(openUploadModal).toHaveBeenCalledWith();

    openModalBasedOnStatus(
      "Review Documents",
      openUploadModal,
      openReviewDocumentsModal
    );
    expect(openReviewDocumentsModal).toHaveBeenCalledWith();
  });

  // handleToggleUploadLocation test
  test("handleToggleUploadLocation", () => {
    const setShowUploadLocations = jest.fn();
    const docType = "birthCertificate";
    const prevState = {
      birthCertificate: { show: false, file: null },
    };

    handleToggleUploadLocation(docType, setShowUploadLocations);

    expect(setShowUploadLocations).toHaveBeenCalledWith({
      birthCertificate: { show: true, file: null },
    });
  });

  // handleCloseConfirmation test
  test("handleCloseConfirmation", () => {
    const closeModal = jest.fn();
    const setShowCloseConfirmation = jest.fn();

    handleCloseConfirmation(false, closeModal, setShowCloseConfirmation);
    expect(setShowCloseConfirmation).toHaveBeenCalledWith(false);
    expect(closeModal).not.toHaveBeenCalledWith();

    handleCloseConfirmation(true, closeModal, setShowCloseConfirmation);
    expect(closeModal).toHaveBeenCalledWith();
  });

  // handleDeleteFile test
  test("handleDeleteFile", () => {
    const setShowUploadLocations = jest.fn();
    const docType = "birthCertificate";
    const file = new File([], "test.pdf", { type: "application/pdf" });
    const prevState = {
      birthCertificate: { show: false, file },
    };

    handleDeleteFile(docType, file, setShowUploadLocations);

    expect(setShowUploadLocations).toHaveBeenCalledWith({
      birthCertificate: { show: false, file: null },
    });
  });

  // updateUploadedFiles test
  test("updateUploadedFiles", () => {
    const setShowUploadLocations = jest.fn();
    const docType = "birthCertificate";
    const newFiles = [new File([], "test.pdf", { type: "application/pdf" })];
    const prevState = {
      birthCertificate: { show: false, file: null },
    };

    updateUploadedFiles(docType, newFiles, setShowUploadLocations);

    expect(setShowUploadLocations).toHaveBeenCalledWith({
      birthCertificate: { show: false, file: newFiles[0] },
    });
  });

  // handleClick test
  test("handleClick", () => {
    const mockInput = document.createElement("input");
    mockInput.click = jest.fn();

    const fileInputRef: React.RefObject<HTMLInputElement> = {
      current: mockInput,
    };

    handleClick(fileInputRef);

    expect(fileInputRef.current?.click).toHaveBeenCalled();
  });

  test("handleFileChange", () => {
    const onFileChange = jest.fn();
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.files = createFileList([
      new File([], "test.pdf", { type: "application/pdf" }),
    ]);

    const event = createEvent.change(inputFile);

    handleFileChange(
      event as unknown as ChangeEvent<HTMLInputElement>,
      onFileChange
    );

    expect(onFileChange).toHaveBeenCalledWith(
      expect.arrayContaining(Array.from(inputFile.files))
    );
  });
});
