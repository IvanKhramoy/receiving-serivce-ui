import styles from './HomePage.module.scss';
import {
  selectIsAdmin,
  selectIsManager,
  useAuthStore
} from "@/entities/user/model";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isManager = useAuthStore(selectIsManager) || useAuthStore(selectIsAdmin);
  console.log(isManager);

  const isHasActiveTask = false;

  const qwerty = () => {
    console.log('23123')
  }

  return (
    <>
      <div className={`container ${styles.homePageInner}`}>
        <h2 className="visually-hidden">Главная</h2>
        <ul className={styles.employeeInformation}>
          <li className={styles.informationItem}>
            <span className={styles.employeeRole}>{`Должность: ${user.authorities}`}</span>
          </li>
          <li className={styles.informationItem}>
            <span className={styles.warehouseId}>{`ID склада: ${user.warehouseId}`}</span>
          </li>
        </ul>
        <div className={styles.body}>
          <div className={styles.actions}>
            <button className={`${styles.actionCard} ${styles.activeTaskCard}`}>
              <p className={styles.cardTitle}>Активная задача</p>
              <p className={styles.activeTaskInfo}>У вас есть незавершенная приемка (ASN #12345)</p>
            </button>
            <button
              className={`${styles.actionCard} ${styles.receiptCard}`}
              onClick={() => navigate('/receipt')}
            >
              <span>Приемка</span>
            </button>

            {isManager && (<>
              <button
                className={`${styles.actionCard} ${styles.createAsnCard}`}
                onClick={() => navigate('/asn/create')}
              >
                <span>Создать поставку</span>
              </button>
              <button
                className={`${styles.actionCard} ${styles.asnListCard}`}
                onClick={() => navigate('/asn')}
              >
                <span>Поставки</span>
              </button>
            </>)}
          </div>
          <div className={styles.statistics}>
            <h3 className={styles.statisticsTitle}>Статистика за сегодня</h3>
            <hr className={styles.devider}/>
            <ul className={styles.statisticsList}>
              <li className={styles.statisticsItem}>
                <p>Принято поставок: 10</p>
              </li>
              <li className={styles.statisticsItem}>
                <p>Отсканировано товаров: 10</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;