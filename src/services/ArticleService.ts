import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { article, articleResponse } from '../types/articles';
import NewArticle from '../components/NewArticle/NewArticle';

export const articleAPI = createApi({
  reducerPath: 'articleAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api',
  }),
  tagTypes: ['Article'],

  endpoints: (build) => ({
    getArticles: build.query<articleResponse, { token: string; page: number }>({
      query: ({ token, page }) => ({
        url: '/articles',
        params: { limit: 5, offset: (page - 1) * 5 },
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      providesTags: () => ['Article'],
    }),

    getFullArticle: build.query<
      { article: article },
      { token: string; slug?: string }
    >({
      query: ({ token, slug }) => ({
        url: `/articles/${slug}`,
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      providesTags: () => ['Article'],
    }),

    postNewArticle: build.mutation<
      { article: article },
      { token: string; body: { article: NewArticle } }
    >({
      query: ({ token, body }) => ({
        url: '/articles',
        method: 'POST',
        body,
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['Article'],
    }),

    editArticle: build.mutation<
      { article: article },
      { token: string; slug: string; body: { article: NewArticle } }
    >({
      query: ({ slug, token, body }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['Article'],
    }),

    deleteArticle: build.mutation<
      { article: article },
      { token: string; slug: string }
    >({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['Article'],
    }),

    rateArticle: build.mutation<
      { article: article },
      { slug: string; token: string; page: number }
    >({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
        body: {},
        headers: {
          Authorization: `Token ${token}`,
        },
      }),

      async onQueryStarted(
        { slug, token, page },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          articleAPI.util.updateQueryData(
            'getArticles',
            { page, token },
            (draft) => {
              const newArticles = draft.articles.map((article) => {
                if (article.slug === slug) {
                  article.favorited = true;
                  article.favoritesCount += 1;
                }
                return article;
              });
              draft.articles = newArticles;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    removeRating: build.mutation<
      { article: article },
      { slug: string; token: string; page: number }
    >({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),

      async onQueryStarted(
        { slug, token, page },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          articleAPI.util.updateQueryData(
            'getArticles',
            { page, token },
            (draft) => {
              const newArticles = draft.articles.map((article) => {
                if (article.slug === slug) {
                  article.favorited = false;
                  article.favoritesCount -= 1;
                }
                return article;
              });
              draft.articles = newArticles;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});
