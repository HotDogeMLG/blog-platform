import { FC, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, Popconfirm } from 'antd';
import axios from 'axios';
import Markdown from 'react-markdown';
import { rateArticle } from './rateArticle';
import Loader from '../Loader/Loader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import styles from './Article.module.css';

const Article: FC = () => {
  const navigate = useNavigate();

  const slug = useParams().slug;
  const token = useTypedSelector((state) => state.account.token);

  const { getFullArticle } = useActions();

  useEffect(() => {
    if (slug !== undefined) getFullArticle(slug, token);
  }, []);

  const fullArticle = useTypedSelector((state) => state.articles.articles)[0];

  const formatDate = (created: string) => {
    const date = new Date(created);
    const month = date.toLocaleString('en-us', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  let tags: JSX.Element[] = [];
  if (fullArticle)
    tags = fullArticle.tagList.map((tag, i) => <span key={i}>{tag}</span>);

  const currentUser = useTypedSelector((state) => state.account.username);
  const loading = useTypedSelector((state) => state.articles.loading);

  const deleteArticle = async () => {
    await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return navigate('/articles');
  };

  const { updateArticle } = useActions();
  const loggedIn = useTypedSelector((state) => state.account.loggedIn);

  return !loading ? (
    <div className={styles.article}>
      <div className={styles.info}>
        <div className={styles.heading}>
          <h5 className={styles.title}>{fullArticle.title}</h5>
          <button
            disabled={!loggedIn}
            onClick={() => {
              rateArticle(
                fullArticle.favorited,
                fullArticle.slug,
                token,
                updateArticle
              );
            }}
            className={`${styles.likes} ${loggedIn &&
              styles.enabled} ${fullArticle.favorited && styles.favorited}`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill={fullArticle.favorited ? 'red' : 'grey'}
            >
              <path d='M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z' />
            </svg>
            {fullArticle.favoritesCount}
          </button>
        </div>
        <div className={styles.tags}>{tags}</div>
        <p className={`${styles.text} ${styles.description}`}>
          {fullArticle.description}
        </p>
        {fullArticle.author.username === currentUser && (
          <Flex gap='large' className={styles.buttons}>
            <Popconfirm
              title='Delete the article'
              description='Are you sure to delete this article?'
              placement='rightTop'
              onConfirm={deleteArticle}
            >
              <Button danger className={styles.antdBtn}>
                Delete
              </Button>
            </Popconfirm>
            <Link
              to={`/${fullArticle.slug}/edit`}
              className={`${styles.green} ${styles.antdBtn}`}
            >
              Edit
            </Link>
          </Flex>
        )}
        <Markdown>{fullArticle.body}</Markdown>
      </div>

      <div className={styles.creator}>
        <div>
          <div className={styles.name}>{fullArticle.author.username}</div>
          <div className={styles.date}>{formatDate(fullArticle.createdAt)}</div>
        </div>
        <img src={fullArticle.author.image} className={styles.image}></img>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Article;
