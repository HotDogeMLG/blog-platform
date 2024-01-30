import { FC, useEffect } from 'react';
import Article from '../Article/Article';
import Loader from '../Loader/Loader';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './ArticleList.module.css';

const ArticleList: FC = () => {
  const { getArticles } = useActions();
  const page = useTypedSelector((state) => state.page.page);
  const token = useTypedSelector((state) => state.account.token);

  useEffect(() => {
    getArticles(page, token);
  }, [page, token]);

  const articles = useTypedSelector((state) => state.articles.articles);

  const articleElements: JSX.Element[] = articles.map((article, index) => {
    return (
      <li key={article.slug}>
        <Article
          index={index}
          slug={article.slug}
          title={article.title}
          description={article.description}
          created={article.createdAt}
          favorites={article.favoritesCount}
          favorited={article.favorited}
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
