import styles from './Field.module.scss';

const Field = (props) => {

  const {
    className = '',
    id,
    name,
    isRequired,
    type,
    placeholder = '',
    autocomplete,
    needsWrapperFormInput = false,
    showPassword,
    handleTogglePassword,
    children
  } = props;

  return (
    <div className={`${styles.field} ${className}`}>
      <label
        className={styles.label}
        htmlFor={id}
      >
        {children}
        {isRequired && (<span className={styles.requiredStar}> *</span>)}
      </label>

      {!needsWrapperFormInput ?
        <input
          className={styles.input}
          type={type}
          name={name}
          id="login"
          placeholder={placeholder}
          autoComplete={autocomplete}
          required
        />
        :
        <div className={styles.passwordInputWrapper}>
          <input
            className={styles.input}
            type={type}
            name={name}
            id="login"
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