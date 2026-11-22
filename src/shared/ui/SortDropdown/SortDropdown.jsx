import {useState, useRef} from "react";
import useOutsideClick from "@/shared/hooks/useOutsideClick.js";
import sortingIcon from '@/shared/assets/icons/sorting-icon.svg'
import styles from './SortDropdown.module.scss';

const SortDropdown = (props) => {
  const {
    options, value, onChange
  } = props

  // let value = '';
  // const [value, setValue] = useState('');
  // const onChange = (option) => {
  //   setValue(option.value);
  //   setIsExpanded(false);
  //   // console.log(value)
  // }

  const [isExpanded, setIsExpanded] = useState(false);
  const selectRef = useRef(null);
  const selected = options.find((option) => option.value === value);

  useOutsideClick(selectRef, isExpanded, setIsExpanded);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsExpanded(false);
  }

  return (
    <div
      className={styles.sorting}
      title="сортировка"
      ref={selectRef}
    >
      <button
        type="button"
        className={styles.sortingButton}
        // onClick={() => setIsExpanded((v) => !v)}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-haspopup="listbox"
        aria-expanded={isExpanded}
      >
        <img
          className={styles.sortingIcon}
          src={sortingIcon}
          alt=""
        />
        <span className={styles.sortingTitle}>{selected?.value ?? 'Сортировка'}</span>
      </button>
      <ul
        className={`${styles.optionsList} ${isExpanded ? styles.isExpanded : ''}`}
        role="listbox"
      >
        {options.map((option) => (
          <li
            className={`${styles.option} ${option.value === value ? styles.selectedOption : ''}`}
            onClick={() => handleSelect(option)}
            key={option.value}
            role="option"
            aria-selected={option.value === value}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SortDropdown;