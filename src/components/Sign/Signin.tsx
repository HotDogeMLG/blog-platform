import { FC } from 'react';
import styles from './signup.module.css';
import { Link } from 'react-router-dom';

const Signin: FC = () => {
  return (
    <div className={styles.signup}>
      <div className={styles.heading}>Sign In</div>

      <form className={styles.form}>
        <label>
          <div>Username</div>
          <input
            className={styles.formInput}
            type='text'
            placeholder='Username'
          ></input>
        </label>
        <label>
          <div>Password</div>
          <input
            className={styles.formInput}
            type='password'
            placeholder='Password'
          ></input>
        </label>
        <input className={styles.submit} type='submit' value='Login'></input>
      </form>
      <div className={styles.aboutAcc}>
        <span>Don&apos;t have an account? </span>
        <Link className={styles.btn} to='/signup'>
          Sign Up.
        </Link>
      </div>
    </div>
  );
};

export default Signin;
