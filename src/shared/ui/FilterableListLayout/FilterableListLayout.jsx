import styles from './FilterableListLayout.module.scss';

const FilterableListLayout = (props) => {
  const  { toolbar, filtersSlot, children } = props

  return (
    <div className={styles.page}>
      {toolbar}
      <div className={styles.body}>
        <aside className={styles.sidebar}>{filtersSlot}</aside>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}

export default FilterableListLayout;