import {Outlet} from "react-router-dom";
import styles from './Layouts.module.scss';

const BaseLayout = () => {
  return (
    <>
      <Outlet/>
      <footer className={styles.footer}>
        © {new Date().getFullYear()} PizdetsSolutions.
      </footer>
    </>
    // Footer
    // <div className={styles.baseWrapper}>
    // </div>

  )
}

export default BaseLayout;