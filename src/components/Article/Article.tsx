import { FC } from 'react';
import { Link } from 'react-router-dom';
import { rateArticle } from './rateArticle';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import styles from './Article.module.css';

interface ArticleProps {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  favorites: number;
  favorited: boolean;
  created: string;
  author: {
    username: string;
    image: string;
  };
  index: number;
}

const Article: FC<ArticleProps> = ({
  slug,
  title,
  favorites,
  tags,
  description,
  author,
  created,
  favorited,
  index,
}) => {
  const formatTitle = (title: string) => {
    if (title === undefined) return '';
    const newTitle = title.substring(0, 150);
    if (newTitle.length === title.length) return title;

    const titleArr = newTitle.split(' ');
    if (titleArr.length <= 1) return newTitle + '...';
    else return titleArr.slice(0, titleArr.length - 1).join(' ') + '...';
  };

  const formatTag = (tag: string | null) => {
    if (tag === null) return 'No tags';
    const newTag = tag.substring(0, 20);
    if (newTag.length === tag.length) return tag;

    const tagArr = newTag.split(' ');
    if (tagArr.length <= 1) return newTag + '...';
    else return tagArr.slice(0, tagArr.length - 1).join(' ') + '...';
  };

  const formatDescription = (desc: string) => {
    if (desc === undefined) return '';
    const newDesc = desc.substring(0, 700);
    if (newDesc.length === desc.length) return desc;

    const descArr = newDesc.split(' ');
    if (descArr.length <= 1) return newDesc + '...';
    else return descArr.slice(0, descArr.length - 1).join(' ') + '...';
  };

  const formatDate = (created: string) => {
    const date = new Date(created);
    const month = date.toLocaleString('en-us', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const tagList = tags.map((tag, ind) => {
    return <span key={ind}>{formatTag(tag)}</span>;
  });

  const { updateArticle } = useActions();
  const token = useTypedSelector((state) => state.account.token);

  const loggedIn = useTypedSelector((state) => state.account.loggedIn);

  return (
    <div className={styles.article}>
      <div className={styles.info}>
        <div className={styles.heading}>
          <Link to={`/articles/${slug}`} className={styles.title}>
            {formatTitle(title)}
          </Link>
          <button
            disabled={!loggedIn}
            onClick={() => {
              rateArticle(favorited, slug, token, updateArticle, index);
            }}
            className={`${styles.likes} ${loggedIn &&
              styles.enabled} ${favorited && styles.favorited}`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill={favorited ? 'red' : 'grey'}
            >
              <path d='M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z' />
            </svg>
            {favorites}
          </button>
        </div>
        <div className={styles.tags}>{tagList}</div>
        <p className={styles.text}>{formatDescription(description)}</p>
      </div>

      <div className={styles.creator}>
        <div>
          <div className={styles.name}>{author.username}</div>
          <div className={styles.date}>{formatDate(created)}</div>
        </div>
        <img src={author.image} className={styles.image}></img>
      </div>
    </div>
  );
};

export default Article;
