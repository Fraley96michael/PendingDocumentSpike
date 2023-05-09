import styles from "../../scss/modules/DocumentItem.module.scss";
import FormFieldsCheckboxInput from "./FormFieldsCheckboxInput";

export const DocumentItem = ({
  label,
  onToggle,
  isSubmitted,
  emphasis,
  hasFile,
}: {
  label: string;
  onToggle: () => void;
  isSubmitted?: boolean;
  emphasis?: string;
  hasFile?: boolean;
}) => (
  <div className={styles.formFieldsCheckbox}>
    <FormFieldsCheckboxInput
      onToggle={onToggle}
      isSubmitted={isSubmitted}
      hasFile={hasFile}
    />
    <p className={styles.label}>
      {label}
      {isSubmitted && hasFile && (
        <strong className={styles.labelEmphasis1}> Approved Document</strong>
      )}
    </p>
  </div>
);
