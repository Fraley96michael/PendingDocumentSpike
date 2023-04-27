import styles from "../scss/modules/X.module.scss";

interface XProps {
  onClick: (event: React.MouseEvent) => void;
}

export const X = ({ onClick }: XProps) => {
  return (
    <div className={styles.x} onClick={onClick}>
      <img
        alt=""
        className={styles.icon}
        src="https://static.overlay-tech.com/assets/2cc4d872-39f2-48d9-867f-1d5ad985feca.svg"
      />
    </div>
  );
};

export default X;
