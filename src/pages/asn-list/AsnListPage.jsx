import {useState} from "react";
import sortingIcon from '../../shared/assets/icons/sorting-icon.svg'
import styles from './AsnListPage.module.scss';
import Toolbar from "@/shared/ui/Toolbar/Toolbar.jsx";

const AsnListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);

  // const mockAsns = [
  //   { id: '1', number: 'ASN-001', vendor: 'OOO Ромашка', status: 'EXPECTED', items: 120 },
  //   { id: '2', number: 'ASN-002', vendor: 'ЗАО Вектор', status: 'ARRIVED', items: 45 },
  // ];


  return (
    <div className={`container ${styles.asnsContainer}`}>
      <Toolbar />
    </div>
  )
}

export default AsnListPage;