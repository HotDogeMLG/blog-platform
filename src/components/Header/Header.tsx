import React, { FC } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Link to='/articles' className={styles.btn}>
        Realworld Blog
      </Link>
      <div className={styles.wrapper}>
        <Link to='/signin' className={styles.btn}>
          Sign In
        </Link>
        <Link to='/signup' className={`${styles.btn} ${styles.signup}`}>
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
