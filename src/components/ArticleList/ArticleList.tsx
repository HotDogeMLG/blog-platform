import { FC } from 'react';
import Article from '../Article/Article';
import Loader from '../Loader/Loader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './ArticleList.module.css';
import { articleAPI } from '../../services/ArticleService';
import { useTheme } from 'antd-style';

const ArticleList: FC = () => {
  const page = useTypedSelector((state) => state.page.page);
  const token = useTypedSelector((state) => state.account.token);

  const theme = useTheme();

  const { data: articleRes, isFetching } = articleAPI.useGetArticlesQuery({
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

  return !isFetching ? (
    <ul className={styles.list} style={{ background: theme.colorBgContainer }}>
      {articleElements}
    </ul>
  ) : (
    <Loader />
  );
};

export default ArticleList;
