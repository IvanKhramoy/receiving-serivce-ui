import {useLocation, useNavigate} from "react-router-dom";
import styles from './Header.module.scss';
import BackButton from "@/shared/ui/BackButton";

const TITLES_MAP = {
  '/asn': 'Поставки',
  '/receipt': 'Приёмка',
  '/asn/create': 'Создание поставки'
}

const ListHeader = () => {

  const { pathname } = useLocation();

  const title = TITLES_MAP[pathname];

  return (
    <>
      <header className={styles.header}>
        <div className={`container`}>
          <div className={styles.headerContent}>
            <BackButton className={styles.buttonBack}/>
            <h1 className={styles.pageTitle}>{title}</h1>
          </div>
        </div>
      </header>
    </>
  )
}

export default ListHeader;