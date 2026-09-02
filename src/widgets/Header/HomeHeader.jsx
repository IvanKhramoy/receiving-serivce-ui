import { useAuthStore} from "@/entities/user/model/index";
import UserDropdown from "@/widgets/Header/UserDropdown";
import styles from './Header.module.scss';

export const HomeHeader = () => {
  // const user = useAuthStore((state) => state.user);
  // const logout = useAuthStore((state) => state.logout);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <h1 className={styles.title}>ReceivingService</h1>
        <div className={styles.actions}>
          <UserDropdown/>
        </div>
      </div>
    </header>
  )
}