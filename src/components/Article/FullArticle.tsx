import { FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, Popconfirm } from 'antd';
import Markdown from 'react-markdown';
import Loader from '../Loader/Loader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './Article.module.css';
import { articleAPI } from '../../services/ArticleService';
import { useTheme } from 'antd-style';

const Article: FC = () => {
  const navigate = useNavigate();

  const slug = useParams().slug;
  const token = useTypedSelector((state) => state.account.token);

  const { data: fullArticle, isLoading } = articleAPI.useGetFullArticleQuery({
    token,
    slug,
  });
  const [rateArticleViaAPI] = articleAPI.useRateArticleMutation();
  const [removeRatingViaAPI] = articleAPI.useRemoveRatingMutation();
  const [deleteArticle] = articleAPI.useDeleteArticleMutation();

  const formatDate = (created: string) => {
    const date = new Date(created);
    const month = date.toLocaleString('en-us', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  let tags: JSX.Element[] = [];
  if (fullArticle)
    tags = fullArticle.article.tagList.map((tag, i) => (
      <span key={i}>{tag}</span>
    ));

  const currentUser = useTypedSelector((state) => state.account.username);

  const onClickDelete = async () => {
    if (slug) deleteArticle({ token, slug });
    return navigate('/articles');
  };

  const onLikeButton = async () => {
    if (slug)
      fullArticle?.article.favorited
        ? await removeRatingViaAPI({ slug, token })
        : await rateArticleViaAPI({ slug, token });
  };

  const loggedIn = useTypedSelector((state) => state.account.loggedIn);

  const theme = useTheme();

  return !isLoading && fullArticle ? (
    <div
      className={styles.articleWrapper}
      style={{
        background: theme.colorBgContainer,
      }}
    >
      <div
        className={styles.article}
        style={{
          background: theme.colorBgElevated,
          color: theme.colorText,
        }}
      >
        <div className={styles.info}>
          <div className={styles.heading}>
            <h5 className={styles.title}>{fullArticle.article.title}</h5>
            <button
              disabled={!loggedIn}
              onClick={onLikeButton}
              className={`${styles.likes} ${loggedIn &&
                styles.enabled} ${fullArticle.article.favorited &&
                styles.favorited}`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill={fullArticle.article.favorited ? 'red' : 'grey'}
              >
                <path d='M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z' />
              </svg>
              {fullArticle.article.favoritesCount}
            </button>
          </div>
          <div className={styles.tags}>{tags}</div>
          <p
            style={{
              color: theme.colorText,
            }}
            className={`${styles.text} ${styles.description}`}
          >
            {fullArticle.article.description}
          </p>
          {fullArticle.article.author.username === currentUser && (
            <Flex gap='large' className={styles.buttons}>
              <Popconfirm
                title='Delete the article'
                description='Are you sure to delete this article?'
                placement='rightTop'
                onConfirm={onClickDelete}
              >
                <Button danger className={styles.antdBtn}>
                  Delete
                </Button>
              </Popconfirm>
              <Link
                to={`/${fullArticle.article.slug}/edit`}
                className={`${styles.green} ${styles.antdBtn}`}
              >
                Edit
              </Link>
            </Flex>
          )}
          <Markdown>{fullArticle.article.body}</Markdown>
        </div>

        <div className={styles.creator}>
          <div>
            <div className={styles.name}>
              {fullArticle.article.author.username}
            </div>
            <div
              className={styles.date}
              style={{ color: theme.colorTextDescription }}
            >
              {formatDate(fullArticle.article.createdAt)}
            </div>
          </div>
          <img
            src={fullArticle.article.author.image}
            className={styles.image}
          ></img>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Article;
