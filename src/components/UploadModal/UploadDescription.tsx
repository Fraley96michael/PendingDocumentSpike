import styles from "../../scss/modules/UploadDescription.module.scss";
export const UploadDescription = () => (
  <div className={styles.indication__container}>
    <p className={styles.label}>
      Please indicate which required document is being uploaded
    </p>
  </div>
);
