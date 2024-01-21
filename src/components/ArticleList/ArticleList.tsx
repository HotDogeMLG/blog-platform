import React, { FC, useEffect } from 'react';
import Article from '../Article/Article';
import styles from './ArticleList.module.css';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Loader from '../Loader/Loader';

const ArticleList: FC = () => {
  const { getArticles } = useActions();
  const page = useTypedSelector((state) => state.page.page);

  useEffect(() => {
    getArticles(page);
  }, [page]);

  const articles = useTypedSelector((state) => state.articles.articles);

  const articleElements: JSX.Element[] = articles.map((article) => {
    return (
      <li key={article.slug}>
        <Article
          slug={article.slug}
          title={article.title}
          description={article.description}
          created={article.createdAt}
          favorites={article.favoritesCount}
          tags={article.tagList}
          author={article.author}
        />
      </li>
    );
  });

  const loading = useTypedSelector((state) => state.articles.loading);

  return !loading ? (
    <ul className={styles.list}>{articleElements}</ul>
  ) : (
    <Loader />
  );
};

export default ArticleList;
