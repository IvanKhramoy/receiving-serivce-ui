import styles from './Homelayout.module.scss';
import {HomeHeader} from "@/widgets/Header/HomeHeader.jsx";
import {Outlet} from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <HomeHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default HomeLayout;