import {ASN_STATUS_LABELS} from "../../model/asnStatus";
import styles from './AsnCard.module.scss';

const formatDate = (dateString) => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
}

const AsnCard = (props) => {
  const {asn, onClick} = props;

  const {
    asnNumber,
    vendorName,
    status,
    arrivalTimeline,
    receivingMode,
    warehouseId
  } = asn;

  const statusLabel = ASN_STATUS_LABELS[status] ?? status;
  const statusClassName = styles[status?.toLowerCase()] ?? '';

  return (
    <article
      className={styles.card}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h3 className={styles.asnNumber}>{`Поставка #${asnNumber}`}</h3>
          {warehouseId &&
            <span className={styles.warehouseId}>{`Склад: #${warehouseId}`}</span>}
        </div>
        <span className={`${styles.badge} ${statusClassName}`}>{statusLabel}</span>
      </header>

      <div className={styles.body}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Поставщик: </span>
          <span className={styles.value}>{vendorName || '-'}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Ожидаемое время прибытия: </span>
          <span className={styles.value}>{formatDate(arrivalTimeline?.expected)}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.receivingMode}>Режим: {receivingMode}</span>
        </div>
      </div>
    </article>
  )
}

export default AsnCard;