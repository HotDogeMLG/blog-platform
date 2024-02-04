import { FC } from 'react';
import Article from '../Article/Article';
import Loader from '../Loader/Loader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './ArticleList.module.css';
import { articleAPI } from '../../services/ArticleService';

const ArticleList: FC = () => {
  const page = useTypedSelector((state) => state.page.page);
  const token = useTypedSelector((state) => state.account.token);

  const { data: articleRes, isLoading } = articleAPI.useGetArticlesQuery({
    token,
    page,
  });

  let articleElements: JSX.Element[] = [];
  if (articleRes)
    articleElements = articleRes.articles.map((article, index) => {
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

  return !isLoading ? (
    <ul className={styles.list}>{articleElements}</ul>
  ) : (
    <Loader />
  );
};

export default ArticleList;
