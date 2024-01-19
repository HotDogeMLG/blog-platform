import React, { FC } from 'react';
import Article from '../Article/Article';
import styles from './ArticleList.module.css';

const ArticleList: FC = () => {
  return (
    <ul className={styles.list}>
      <li>
        <Article />
      </li>
      <li>
        <Article />
      </li>
      <li>
        <Article />
      </li>
      <li>
        <Article />
      </li>
      <li>
        <Article />
      </li>
    </ul>
  );
};

export default ArticleList;
