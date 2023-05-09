import { useState } from "react";

type DocumentType = {
  birthCertificate: { show: boolean; file: File | null };
  hospitalRecords: { show: boolean; file: File | null };
  socialSecurityCard: { show: boolean; file: File | null };
  adoptionCertificate: { show: boolean; file: File | null };
};

export const useUploadLocations = (): [
  DocumentType,
  (documentName: keyof DocumentType, show: boolean, file: File | null) => void
] => {
  const [uploadLocations, setUploadLocations] = useState({
    birthCertificate: { show: false, file: null as File | null },
    hospitalRecords: { show: false, file: null as File | null },
    socialSecurityCard: { show: false, file: null as File | null },
    adoptionCertificate: { show: false, file: null as File | null },
  });

  const updateUploadLocation = (
    documentName: keyof DocumentType,
    show: boolean,
    file: File | null
  ) => {
    setUploadLocations((prev) => ({
      ...prev,
      [documentName]: { show, file },
    }));
  };

  return [uploadLocations, updateUploadLocation];
};
