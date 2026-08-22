import styles from './ListLayout.module.scss';
import ListHeader from "@/widgets/Header/ListHeader.jsx";
import {Outlet} from "react-router-dom";

const ListLayout = () => {
  return (
    <>
      <ListHeader />
      <main>
        <Outlet/> {/* Сюда вставятся ReceiptPage и т.д. */}
      </main>
    </>
  )
}

export default ListLayout;