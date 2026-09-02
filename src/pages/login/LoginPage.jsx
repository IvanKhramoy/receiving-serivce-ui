import styles from './LoginPage.module.scss'
import LoginForm from "@/features/auth-by-login/ui/index.js";

const LoginPage = () => {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          {/*<div className={styles.logoWrapper}>*/}
          {/*  <span className={styles.logoIcon}>📦</span>*/}
          {/*</div>*/}
          <h1 className={styles.title}>ReceivingService</h1>
        </div>
      </header>

      <main className={styles.main}>
          <div className={`container ${styles.loginFormContainer}`}>
            <LoginForm/>
          </div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerBody}>
            <p className={styles.copyright}>© ОАО "ReceivingService", 2026 г.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default LoginPage;