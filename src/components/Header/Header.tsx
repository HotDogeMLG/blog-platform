import React, { FC } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const Header: FC = () => {
  const loggedIn = useTypedSelector((state) => state.account.loggedIn);
  const { logIn, logOut } = useActions();

  return (
    <header className={styles.header}>
      <Link to='/articles' className={styles.btn}>
        Realworld Blog
      </Link>
      <div className={styles.wrapper}>
        {loggedIn && (
          <button
            className={`${styles.btn} ${styles.green} ${styles.createArticle}`}
          >
            Create article
          </button>
        )}

        {loggedIn ? (
          <Link to='/profile' className={styles.user}>
            <div className={styles.name}>John Doe</div>
            <img className={styles.image}></img>
          </Link>
        ) : (
          <Link to='/sign-in' className={styles.btn}>
            Sign In
          </Link>
        )}

        {loggedIn ? (
          <button
            onClick={logOut}
            className={`${styles.btn} ${styles.outlined}`}
          >
            Log Out
          </button>
        ) : (
          <Link
            onClick={logIn}
            to='/sign-up'
            className={`${styles.btn} ${styles.green}`}
          >
            Sign Up
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
