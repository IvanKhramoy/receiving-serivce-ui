import styles from './Field.module.scss';
import {useState} from "react";

const Field = (props) => {

  const {
    className = '',
    id,
    name,
    isRequired,
    type,
    placeholder = '',
    autocomplete,
    children
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = (isPassword && showPassword) ? 'text' : type;

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <div className={`${styles.field} ${className}`}>
      <label
        className={styles.label}
        htmlFor={id}
      >
        {children}
        {isRequired && (<span className={styles.requiredStar}> *</span>)}
      </label>

      {!isPassword ?
        <input
          className={styles.input}
          type={inputType}
          name={name}
          id={id}
          placeholder={placeholder}
          autoComplete={autocomplete}
          required
        />
        :
        <div className={styles.passwordInputWrapper}>
          <input
            className={styles.input}
            type={inputType}
            name={name}
            id={id}
            placeholder={placeholder}
            autoComplete={autocomplete}
            required
          />
          <button
            type="button"
            className={`${styles.passwordToggleBtn} ${showPassword ? styles.passwordToggleBtnClosed : ""}`}
            onClick={handleTogglePassword}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          >
          </button>
        </div>
      }

    </div>
  )
}

export default Field;