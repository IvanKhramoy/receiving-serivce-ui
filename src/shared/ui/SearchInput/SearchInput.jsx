import styles from './SearchInput.module.scss';

const SearchInput = (props) => {
  const {
    value, onSubmit, onInput
  } = props

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        value = {value}
        placeholder='search'
        onInput = {onInput}
      />
    </form>
  )
}

export default SearchInput;