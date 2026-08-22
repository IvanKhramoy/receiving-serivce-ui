import styles from './UserDropdown.module.scss';
import {useEffect, useRef, useState} from "react";
import {
  selectIsAdmin,
  selectIsManager,
  useAuthStore
} from "@/entities/user/model/index.js";
import kotekImage from '../../shared/assets/images/sakura.jpg';

const UserDropdown = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const show = true;

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isManager = useAuthStore(selectIsManager) || useAuthStore(selectIsAdmin);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      // document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('pointerdown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
   }, [isExpanded]);

  const onClick = () => {
    setIsExpanded(!isExpanded);
  }

  const onExitButtonClick = () => {
    logout();
  }

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <button
        className={`${styles.personBtn} ${isExpanded ? styles.isExpanded : ''}`}
        onClick={onClick}
        aria-expanded={isExpanded}
        title='Профиль'
      >
        <img
          src={kotekImage}
          alt="avatar"
          className={styles.personImage}
        />
      </button>


      <div className={`${styles.dropdownMenu} ${isExpanded ? styles.isExpanded : ''}`}>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{user?.nickname || 'Пользователь'}</p>
          <p className={styles.userRole}>{`Должность: ${user?.authorities}`}</p>
          <p className={styles.userEmail}>{user?.email}</p>
        </div>
        <hr className={styles.divider}/>
        <ul className={styles.actionsList}>
          <li className={styles.actionItem}>
            <button className={styles.settingsButton}>Настройки</button>
          </li>
          <li className={styles.actionItem}>
            <button
              className={styles.exitButton}
              onClick={onExitButtonClick}
            >Выйти
            </button>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default UserDropdown;