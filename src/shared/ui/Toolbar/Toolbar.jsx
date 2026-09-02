import styles from './Toolbar.module.scss';
import SortDropdown from "@/shared/ui/SortDropdown/index.js";
import SearchInput from "@/shared/ui/SearchInput/index.js";

const Toolbar = () => {
  const options = [
    {
      value: 'date',
    },
    {
      value: 'date-reverse',
    },
    {
      value: 'number',
    },
    {
      value: 'vendor',
    }
  ]
  return (
    <div className={styles.toolbar}>
      <SortDropdown options={options}/>
      <SearchInput />
    </div>
  )
}

export default Toolbar;