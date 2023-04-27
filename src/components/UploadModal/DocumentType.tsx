import styles from "../../scss/modules/DocumentType.module.scss";

export const DocumentType = () => {
  return (
    <div className={styles.fieldset}>
      <p className={styles.label}>Document Type: </p>
      <p className={styles.decree}>Divorce Decree</p>
    </div>
  );
};

export default DocumentType;
