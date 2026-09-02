import { useNavigate, useLocation } from 'react-router-dom';
import Button from "@/shared/ui/Button";

import leftArrowIcon from '../../assets/icons/left-arrow.svg';
import styles from './BackButton.module.scss';

const BACK_ROUTES_MAP = {
  '/asn': '/',
  '/receipt': '/asn',
  // '/receipts': '/asn',
}

const fallback = '/';

const BackButton = (props) => {
  const {
    className = '',
  } = props


  // const getBackRoute = (pathname) => { //если появятся динамические пути
  //   if (pathname.startsWith('/receipt')) return '/asn';
  //   if (pathname.startsWith('/asn')) return '/';
  //   return '/';
  // };

  const onClick = () => {
    console.log('backButton clicked')
  }

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    // const targetRoute = BACK_ROUTES_MAP[pathname] || '/';
    // navigate(targetRoute);
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  }

  return (
    <Button
      className={`${styles.backButton} ${className}`}
      onClick = {handleClick}
      isDisabled = {false}
    >
      <span className={styles.iconWrapper}>
        <img
          className={styles.arrowIcon}
          src={leftArrowIcon}
          alt="arrow-left"
        />
      </span>
    </Button>
  )
}

export default BackButton;