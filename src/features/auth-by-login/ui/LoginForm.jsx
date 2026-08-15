  import {useState} from 'react';
  import toast from 'react-hot-toast';
  import {useNavigate} from 'react-router-dom';
  import {loginApi} from "@/features/auth-by-login/api/authApi.js";
  import {useAuthStore} from '@/entities/user/model';
  import styles from './LoginForm.module.scss';
  import Button from "@/shared/ui/Button/index.js";
  import Field from "@/shared/ui/Field/index.js";

  const LoginForm = () => {
    const [loginError, setLoginError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setTokens = useAuthStore((state) => state.setTokens);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsSubmitting(true);

      setLoginError(false);
      const formData = new FormData(event.currentTarget);
      const email = formData.get('login')?.toString().trim();
      const password = formData.get('password')?.toString();
      console.log(email, password);

      try {
        const {accessToken, refreshToken} = await loginApi(email, password);
        setTokens(accessToken, refreshToken);
        toast.success('Вход выполнен успешно!');
        navigate('/'); //change current URL
        // navigate('/asn');
      } catch (error) {
        error.response?.status === 401
        ? setLoginError(true) : setLoginError(false)
        toast.error(
          error.response?.status === 401
            ? 'Неверный логин или пароль' :
            'Что то пошло не так. Попробуйте еще раз'
        )
      } finally {
        setIsSubmitting(false);
      }
    };


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
            autocomplete="email"
            isRequired={true}
          >Адрес эл. почты</Field>

          <Field
            id="password"
            name="password"
            type='password'
            isRequired={true}
            autocomplete="current-password"
          >Пароль</Field>

        </div>

        <Button type="submit" isDisabled = {isSubmitting}>Войти</Button>
        {
          loginError && (<div className={styles.errorAlert}>
            <p className={styles.errorMessage}>Неверный адрес эл. почты или пароль</p>
          </div>)
        }

      </form>
    )
  }

  export default LoginForm;