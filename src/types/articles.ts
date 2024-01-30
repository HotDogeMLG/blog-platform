export enum ArticlesActionTypes {
  GET_ARTICLES = 'GET_ARTICLES',
  LOAD_ARTICLES = 'LOAD_ARTICLES',
  ARTICLE_ERROR = 'ARTICLE_ERROR',
  GET_FULL_ARTICLE = 'GET_FULL_ARTICLE',
  UPDATE_ARTICLE = 'UPDATE_ARTICLE',
}

export interface article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface articleResponse {
  articles: article[];
  articlesCount: number;
}

interface LoadArticlesAction {
  type: ArticlesActionTypes.LOAD_ARTICLES;
}

interface GetArticlesAction {
  type: ArticlesActionTypes.GET_ARTICLES;
  payload: articleResponse;
}

interface GetFullArticle {
  type: ArticlesActionTypes.GET_FULL_ARTICLE;
  payload: article;
}

interface UpdateArticleAction {
  type: ArticlesActionTypes.UPDATE_ARTICLE;
  payload: { article: article; index: number };
}

interface ArticleErrorAction {
  type: ArticlesActionTypes.ARTICLE_ERROR;
  payload: string;
}

export type ArticleAction =
  | LoadArticlesAction
  | GetArticlesAction
  | ArticleErrorAction
  | GetFullArticle
  | UpdateArticleAction;

export interface ArticleState {
  articles: article[];
  total: number;
  loading: boolean;
  error: null | string;
}
