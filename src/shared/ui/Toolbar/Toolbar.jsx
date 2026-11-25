import styles from './Toolbar.module.scss';

const Toolbar = ({sortSlot, searchSlot, filterSlot}) => {
  return (
    <div className={styles.toolbar}>
      {sortSlot && <div className={styles.sortSlot}>{sortSlot}</div>}
      {searchSlot && <div className={styles.searchSlot}>{searchSlot}</div>}
      {filterSlot && <div className={styles.filterSlot}>{filterSlot}</div>}
    </div>
  )
}

export default Toolbar;