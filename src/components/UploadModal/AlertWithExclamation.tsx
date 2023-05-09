import styles from "../../scss/modules/AlertWithExclamation.module.scss";

const AlertWithExclamation = () => {
  return (
    <div className={styles.alertContainer}>
      <div className={styles.exclamationContainer}>
        <img
          alt=""
          className={styles.exclamationIcon}
          src="https://static.overlay-tech.com/assets/56c8a185-d9b5-4e14-9498-12f2630d6d55.svg"
        />
      </div>
      <p className={styles.alertTitle}>
        Hospital Records does not match childs name.
      </p>
    </div>
  );
};

export default AlertWithExclamation;
