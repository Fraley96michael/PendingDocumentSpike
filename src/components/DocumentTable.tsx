import styles from "/src/scss/modules/CustomTable.module.scss";
import Info from "./Info";
import Badge from "./Badge";

const DocumentTable = ({
  openUploadModal,
  openReviewDocumentsModal,
}: {
  openUploadModal: () => void;
  openReviewDocumentsModal: () => void;
}) => {
  const data: any[] = [
    {
      name: "James Chocolate",
      verification: "Divorce",
      startDate: "03/10/2022",
      dueDate: "04/22/2022",
      uploadText: "Upload",
      status: { type: "required", text: "Required" },
    },
    {
      name: "Andy Chocolate",
      verification: "Dependent Verification",
      startDate: "05/10/2022",
      dueDate: "06/22/2022",
      uploadText: "Review Documents",
      status: { type: "pending", text: "Pending Approval" },
    },
    {
      name: "Johnathan Chocolate",
      verification: "Dependent Verification",
      startDate: "05/10/2022",
      dueDate: "06/22/2022",
      uploadText: "Review Documents",
      status: { type: "declined", text: "Declined/Invalid" },
    },
  ];
  const handleButtonClick = (uploadText: string) => {
    if (uploadText === "Upload") {
      openUploadModal();
    } else if (uploadText === "Review Documents") {
      openReviewDocumentsModal();
    }
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr className={`${styles.document__table__row} ${styles.header}`}>
          <th className={styles.document__table__header}>
            <p className={styles.tableNameHeader}>Name</p>
          </th>
          <th className={styles.document__table__header}>
            <p className={styles.tableNameHeader}>Verification</p>
          </th>
          <th className={styles.document__table__header}>
            <p className={styles.tableNameHeader}>Start Date</p>
          </th>
          <th className={styles.document__table__header}>
            <p className={styles.tableNameHeader}>End Date</p>
          </th>
          <th className={styles.document__table__header}>
            <p className={styles.tableNameHeader}>Upload</p>
          </th>
          <th className={styles.document__table__header}>
            <p className={styles.tableNameHeader}>Status</p>
          </th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={`rules ${index}`} className={`${styles.row}`}>
            <td className={styles.table__data__cell}>
              <p className={styles.tableNameHeader}>
                {row.name ? row.name : ""}
              </p>
            </td>
            <td className={styles.table__data__cell}>
              {row.verification ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p className={styles.tableNameHeader}>{row.verification}</p>
                  <Info />
                </div>
              ) : (
                ""
              )}
            </td>
            <td className={styles.table__data__cell}>
              <p className={styles.tableNameHeader}>
                {row.startDate ? row.startDate : ""}
              </p>
            </td>
            <td className={styles.table__data__cell}>
              <p className={styles.tableNameHeader}>
                {row.dueDate ? row.dueDate : ""}
              </p>
            </td>
            <td className={styles.table__data__cell}>
              <div
                className={styles.button}
                onClick={() => handleButtonClick(row.uploadText)}
              >
                <p className={styles.text}>{row.uploadText}</p>
              </div>
            </td>
            <td className={styles.table__data__cell}>
              {row.status ? (
                <Badge status={row.status.type} text={row.status.text} />
              ) : (
                ""
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DocumentTable;
