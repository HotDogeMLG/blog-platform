import { Dispatch } from '@reduxjs/toolkit';
import {
  ArticleAction,
  ArticlesActionTypes,
  article,
  articleResponse,
} from '../../types/articles';
import axios from 'axios';

export const getArticles = (page: number) => {
  return async (dispatch: Dispatch<ArticleAction>) => {
    try {
      dispatch({ type: ArticlesActionTypes.LOAD_ARTICLES });

      const res = await axios.get<articleResponse>(
        'https://blog.kata.academy/api/articles',
        { params: { limit: 5, offset: (page - 1) * 5 } }
      );

      dispatch({ type: ArticlesActionTypes.GET_ARTICLES, payload: res.data });
    } catch (e) {
      dispatch({
        type: ArticlesActionTypes.ARTICLE_ERROR,
        payload: 'Failed to load articles',
      });
    }
  };
};

export const getFullArticle = (slug: string) => {
  return async (dispatch: Dispatch<ArticleAction>) => {
    try {
      dispatch({ type: ArticlesActionTypes.LOAD_ARTICLES });

      const res = await axios.get<{ article: article }>(
        `https://blog.kata.academy/api/articles/${slug}`
      );

      dispatch({
        type: ArticlesActionTypes.GET_FULL_ARTICLE,
        payload: res.data.article,
      });
    } catch (e) {
      dispatch({
        type: ArticlesActionTypes.ARTICLE_ERROR,
        payload: 'Something went wrong. Unable to load full article',
      });
    }
  };
};
