import { FC } from 'react';
import styles from './NewArticle.module.css';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { Button, Flex } from 'antd';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { article } from '../../types/articles';

interface NewArticle {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

const NewArticle: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<NewArticle>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tagList: [],
    },
  });

  const token = useTypedSelector((state) => state.account.token);

  const submit: SubmitHandler<NewArticle> = (data) => {
    const tags = data.tagList.filter((tag) => tag !== '' && tag !== undefined);
    const uniqueTags: string[] = [];
    for (const tag of tags) {
      if (!uniqueTags.includes(tag)) uniqueTags.push(tag);
    }
    try {
      axios.post<{ article: article }>(
        'https://blog.kata.academy/api/articles',
        { article: { ...data, tagList: uniqueTags } },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
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

  const { deleteTag } = useActions();
  const { addTag } = useActions();
  const ids = useTypedSelector((state) => state.tags.ids);
  const tagList = ids.map((id, index, arr) => (
    <Flex gap='small' align='center' key={id}>
      <input
        type='text'
        placeholder='Tag'
        className={`${styles.tag} ${styles.input} ${errors.tagList &&
          watch(`tagList.${id}`) === '' &&
          styles.invalid}`}
        {...register(`tagList.${id}`, { required: true })}
      ></input>
      {arr.length !== 1 && (
        <Button
          danger
          onClick={() => {
            resetField(`tagList.${id}`);
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

  const loggedIn = useTypedSelector((state) => state.account.loggedIn);
  if (!loggedIn) return <Navigate to='/sign-in' />;

  return (
    <div className={styles.NewArticle}>
      <div className={styles.heading}>Create new article</div>

      <form
        className={styles.form}
        onSubmit={handleSubmit(submit, errorHandler)}
      >
        <label>
          <div className={styles.label}>Title</div>
          <input
            type='text'
            className={`${styles.input} ${errors.title && styles.invalid}`}
            placeholder='Title'
            {...register('title', { required: true, validate: validateTitle })}
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
    </div>
  );
};

export default NewArticle;
