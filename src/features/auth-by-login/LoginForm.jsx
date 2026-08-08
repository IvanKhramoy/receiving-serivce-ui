import {useState} from 'react'
import styles from './LoginForm.module.scss';
import Button from "@/shared/ui/Button/index.js";
import Field from "@/shared/ui/Field/index.js";

const USERS = {
  "ivan@gmail.com": '123456',
  "danila@gmail.com": '123456',
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoginError('');
    const formData = new FormData(event.currentTarget);
    const email = formData.get('login')?.toString().trim();
    const password = formData.get('password')?.toString();

    if (USERS[email] && USERS[email] === password) {
      alert(`Успешный вход! Добро пожаловать, ${email}`);
    } else {
      setLoginError('Неверный логин или пароль');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  }

  // const error = false;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <h2 className={styles.formTitle}>Вход</h2>

      <div className={styles.fieldsGroup}>

        <Field
          id="login"
          name="login"
          type="email"
          placeholder="example@email.com"
          autocomplete="login"
          isRequired={true}
        >Адрес эл. почты</Field>

        {/*<div className={styles.field}>
          <label
            htmlFor="login"
            className={styles.label}
          >
            Адрес эд. почты <span className={styles.requiredStar}>*</span>
          </label>
          <input
            type="email"
            name="login"
            id="login"
            className={styles.input}
            placeholder="example@email.com"
            autoComplete="login"
            required
          />
        </div>*/}

        <Field
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          isRequired={true}
          autocomplete="current-password"
          needsWrapperFormInput={true}
          showPassword={showPassword}
          handleTogglePassword={handleTogglePassword}
        >Пароль</Field>

        {/*<div className={styles.field}>
          <label
            htmlFor="password"
            className={`${styles.label} ${loginError ? styles.isInvalid : ''}`}
          >
            Пароль <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.passwordInputWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              className={styles.input}
              autoComplete="current-password"
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
        </div>*/}

      </div>

      <Button type="submit">Войти</Button>
      {
        loginError && (<div className={styles.errorAlert}>
          <p className={styles.errorMessage}>Неверный адрес эл. почты или пароль</p>
        </div>)
      }

    </form>
  )
}

export default LoginForm;