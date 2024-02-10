import { FC, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Flex } from 'antd';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import styles from './NewArticle.module.css';
import { articleAPI } from '../../services/ArticleService';
import { useTheme } from 'antd-style';

interface NewArticle {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

const NewArticle: FC = () => {
  const navigate = useNavigate();

  const slug = useParams().slug;
  const token = useTypedSelector((state) => state.account.token);
  const editing = slug !== undefined ? true : false;

  const { setTagAmount, deleteTag, addTag, setDefaultTags } = useActions();

  const [postNewArticle] = articleAPI.usePostNewArticleMutation();
  const [editArticle] = articleAPI.useEditArticleMutation();
  const { data: fullArticle } = articleAPI.useGetFullArticleQuery({
    token,
    slug,
  });
  const article = fullArticle?.article;

  const defaultFormValues = {
    title: '',
    description: '',
    body: '',
    tagList: [''],
  };

  const theme = useTheme();

  useEffect(() => {
    if (!editing) reset(defaultFormValues);
    else if (article)
      reset({
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      });
  }, [article, editing]);

  useEffect(() => {
    if (!editing) setDefaultTags();
    else if (article) setTagAmount(article.tagList.length);
  }, [article, editing]);

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    reset,
    formState: { errors },
  } = useForm<NewArticle>({
    defaultValues: defaultFormValues,
  });

  const submit: SubmitHandler<NewArticle> = async (data) => {
    const tags = data.tagList.filter((tag) => tag !== '' && tag !== undefined);
    const uniqueTags: string[] = [];
    for (const tag of tags) {
      if (!uniqueTags.includes(tag)) uniqueTags.push(tag);
    }
    try {
      if (editing && slug) {
        editArticle({
          token,
          slug,
          body: { article: { ...data, tagList: uniqueTags } },
        });
      } else {
        postNewArticle({
          token,
          body: { article: { ...data, tagList: uniqueTags } },
        });
      }
      return navigate('/articles');
    } catch (e) {
      console.log('Article post error: ', e);
    }
  };

  const errorHandler: SubmitErrorHandler<NewArticle> = (data) => {
    console.log('New article error', data);
  };

  const validateTitle = (title: string) => {
    if (title.length > 2 && title.length < 151) return true;
    return false;
  };

  const validateDesc = (desc: string) => {
    if (desc.length > 9 && desc.length < 401) return true;
    return false;
  };

  const ids = useTypedSelector((state) => state.tags.ids);
  const tagList = ids.map((id, index, arr) => (
    <Flex gap='small' align='center' key={id}>
      <input
        type='text'
        placeholder='Tag'
        style={{
          background: theme.colorBgContainer,
          color: theme.colorText,
        }}
        className={`${styles.tag} ${styles.input} ${errors.tagList &&
          watch(`tagList.${id}`) === '' &&
          styles.invalid}`}
        {...register(`tagList.${id}`, { required: true })}
      ></input>
      {arr.length !== 1 && (
        <Button
          danger
          onClick={() => {
            resetField(`tagList.${id}`, { defaultValue: '' });
            deleteTag(id);
          }}
        >
          Delete
        </Button>
      )}
      {index === arr.length - 1 && (
        <Button className={styles.addTag} onClick={addTag}>
          Add tag
        </Button>
      )}
    </Flex>
  ));

  const currentUser = useTypedSelector((state) => state.account.username);
  const loggedIn = useTypedSelector((state) => state.account.loggedIn);
  if (!loggedIn) return <Navigate to='/sign-in' />;
  else if (editing && article && currentUser !== article.author.username)
    return <Navigate to='/articles' />;

  return (
    <div
      className={styles.NewArticleWrapper}
      style={{ background: theme.colorBgContainer }}
    >
      <div
        className={styles.NewArticle}
        style={{ background: theme.colorBgElevated, color: theme.colorText }}
      >
        <div className={styles.heading}>
          {editing ? 'Edit article' : 'Create new article'}
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit(submit, errorHandler)}
        >
          <label>
            <div className={styles.label}>Title</div>
            <input
              type='text'
              className={`${styles.input} ${errors.title && styles.invalid}`}
              style={{
                background: theme.colorBgContainer,
                color: theme.colorText,
              }}
              placeholder='Title'
              {...register('title', {
                required: true,
                validate: validateTitle,
              })}
            ></input>
            {errors.title && (
              <div className={styles.error}>
                {watch('title').length < 3
                  ? 'Title should be at least 3 characters long'
                  : watch('title').length > 150 &&
                    'Title should be at most 150 characters long'}
              </div>
            )}
          </label>

          <label>
            <div className={styles.label}>Short description</div>
            <textarea
              style={{
                background: theme.colorBgContainer,
                color: theme.colorText,
              }}
              className={`${styles.input} ${errors.description &&
                styles.invalid}`}
              placeholder='Description'
              {...register('description', {
                required: true,
                validate: validateDesc,
              })}
            ></textarea>
            {errors.description && (
              <div className={styles.error}>
                {watch('description').length < 10
                  ? 'Description should be at least 10 characters long'
                  : watch('description').length > 400 &&
                    'Description should be at most 400 characters long'}
              </div>
            )}
          </label>

          <label>
            <div className={styles.label}>Text</div>
            <textarea
              style={{
                background: theme.colorBgContainer,
                color: theme.colorText,
              }}
              className={`${styles.input} ${styles.text} ${errors.body &&
                styles.invalid}`}
              placeholder='Text'
              {...register('body', { required: true })}
            ></textarea>
          </label>

          <label>
            <div className={styles.label}>Tags</div>
            <div className={styles.tags}>{tagList}</div>
          </label>

          <button className={styles.submit}>Send</button>
        </form>
      </div>{' '}
    </div>
  );
};

export default NewArticle;
