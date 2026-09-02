import {useState, useRef, useEffect} from "react";
import useOutsideClick from "@/shared/hooks/useOutsideClick.js";
import sortingIcon from '@/shared/assets/icons/sorting-icon.svg'
import styles from './SortDropdown.module.scss';

const SortDropdown = (props) => {
  const {
    options
  } = props

  // let value = '';

  const [value, setValue] = useState('');

  const onChange = (option) => {
    setValue(option.value);
    setIsExpanded(false);
    // console.log(value)
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const selectRef = useRef(null);
  const selected = options.find((option) => option.value === value);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (rootRef.current && !rootRef.current.contains(event.target)) {
  //       setIsExpanded(false);
  //     }
  //   };
  //   document.addEventListener('pointerdown', handleClickOutside);
  //   return () => document.removeEventListener('pointerdown', handleClickOutside);
  // }, []);


  // useOutsideClick(selectRef, isExpanded, setIsExpanded);

  useEffect(() => {
    useOutsideClick(selectRef, isExpanded, setIsExpanded);
  }, [selectRef, isExpanded]);

  return (
    <div className={styles.sorting} title="сортировка" ref={selectRef}>
      <button
        type="button"
        className={styles.sortingButton}
        onClick={() => setIsExpanded((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isExpanded}
      >
        <img
          className={styles.sortingIcon}
          src={sortingIcon}
          alt="/"
        />
        <span className={styles.sortingTitle}>{selected?.value ?? 'Сортировка'}</span>
      </button>
      {/*{isExpanded && (
        <ul className={styles.optionsList} role="listbox">
          {options.map((option) => (
            <li
              className={`${styles.option} ${option.value === value ? styles.selectedOption : ''}`}
              onClick={() => {
                onChange(option);
              }}
              key={option.value}
              role="option"
              aria-selected={option.value === value}
            >
              {option.value}
            </li>
          ))}
        </ul>*/}
        <ul className={`${styles.optionsList} ${isExpanded ? styles.isExpanded : ''}`} role="listbox">
          {options.map((option) => (
            <li
              className={`${styles.option} ${option.value === value ? styles.selectedOption : ''}`}
              onClick={() => {
                onChange(option);
              }}
              key={option.value}
              role="option"
              aria-selected={option.value === value}
            >
              {option.value}
            </li>
          ))}
        </ul>
    </div>
  )
}

export default SortDropdown;