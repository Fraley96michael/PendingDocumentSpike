import styles from "../../scss/modules/DocumentItem.module.scss";
import FormFieldsCheckboxInput from "./FormFieldsCheckboxInput";

export const DocumentItem = ({
  label,
  onToggle,
}: {
  label: string;
  onToggle: () => void;
}) => (
  <div className={styles.formFieldsCheckbox}>
    <FormFieldsCheckboxInput onToggle={onToggle} />
    <p className={styles.label}>{label}</p>
  </div>
);
