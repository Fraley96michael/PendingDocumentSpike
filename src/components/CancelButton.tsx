import styles from "../scss/modules/CancelButton.module.scss";

interface CancelButtonProps {
  onClick: () => void;
}

const CancelButton = ({ onClick }: CancelButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.text}>Cancel</span>
    </button>
  );
};

export default CancelButton;
