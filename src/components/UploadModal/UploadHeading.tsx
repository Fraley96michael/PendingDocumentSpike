import styles from "../../scss/modules/DocumentDocumentUploadModal.module.scss";

export const Heading = () => (
  <div className={styles.text}>
    <p className={styles.heading}>Document Upload</p>
    <p className={styles.detail}>
      Please be advised that specifying the documents you are uploading for
      review is required.{" "}
    </p>
  </div>
);
