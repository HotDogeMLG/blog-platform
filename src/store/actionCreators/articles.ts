import { Dispatch } from '@reduxjs/toolkit';
import {
  ArticleAction,
  ArticlesActionTypes,
  article,
  articleResponse,
} from '../../types/articles';
import axios, { AxiosResponse } from 'axios';

export const getArticles = (page: number, token?: string) => {
  return async (dispatch: Dispatch<ArticleAction>) => {
    try {
      dispatch({ type: ArticlesActionTypes.LOAD_ARTICLES });

      let res: AxiosResponse<articleResponse>;
      if (token) {
        res = await axios.get<articleResponse>(
          'https://blog.kata.academy/api/articles',
          {
            params: { limit: 5, offset: (page - 1) * 5 },
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      } else {
        res = await axios.get<articleResponse>(
          'https://blog.kata.academy/api/articles',
          { params: { limit: 5, offset: (page - 1) * 5 } }
        );
      }
      dispatch({ type: ArticlesActionTypes.GET_ARTICLES, payload: res.data });
    } catch (e) {
      dispatch({
        type: ArticlesActionTypes.ARTICLE_ERROR,
        payload: 'Failed to load articles',
      });
    }
  };
};

export const getFullArticle = (slug: string, token?: string) => {
  return async (dispatch: Dispatch<ArticleAction>) => {
    try {
      dispatch({ type: ArticlesActionTypes.LOAD_ARTICLES });
      let res: AxiosResponse<{ article: article }>;

      if (token) {
        res = await axios.get<{ article: article }>(
          `https://blog.kata.academy/api/articles/${slug}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      } else {
        res = await axios.get<{ article: article }>(
          `https://blog.kata.academy/api/articles/${slug}`
        );
      }

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

export const updateArticle = (article: article, index: number) => {
  return {
    type: ArticlesActionTypes.UPDATE_ARTICLE,
    payload: {
      article,
      index,
    },
  };
};

export type updateArticleType = typeof updateArticle;
