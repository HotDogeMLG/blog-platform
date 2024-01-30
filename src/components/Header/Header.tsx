import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import styles from './Header.module.css';

const Header: FC = () => {
  const loggedIn = useTypedSelector((state) => state.account.loggedIn);
  const { logOut } = useActions();

  const username = useTypedSelector((state) => state.account.username);
  const image = useTypedSelector((state) => state.account.image);

  const { setDefaultTags } = useActions();

  return (
    <header className={styles.header}>
      <Link to='/articles' className={styles.btn}>
        Realworld Blog
      </Link>
      <div className={styles.wrapper}>
        {loggedIn && (
          <Link
            to='/new-article'
            onClick={setDefaultTags}
            className={`${styles.btn} ${styles.green} ${styles.createArticle}`}
          >
            Create article
          </Link>
        )}

        {loggedIn ? (
          <Link to='/profile' className={styles.user}>
            <div className={styles.name}>{username}</div>
            <img
              src={image !== null ? image : undefined}
              className={styles.image}
            ></img>
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
          <Link to='/sign-up' className={`${styles.btn} ${styles.green}`}>
            Sign Up
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
