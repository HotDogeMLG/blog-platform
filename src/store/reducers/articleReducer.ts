import {
  ArticleAction,
  ArticlesActionTypes,
  ArticleState,
} from '../../types/articles';

const articleDefaultState: ArticleState = {
  articles: [],
  total: 0,
  loading: true,
  error: null,
};

export const articleReducer = (
  state: ArticleState = articleDefaultState,
  action: ArticleAction
): ArticleState => {
  switch (action.type) {
    case ArticlesActionTypes.LOAD_ARTICLES:
      return {
        ...state,
        loading: true,
      };
    case ArticlesActionTypes.GET_ARTICLES:
      return {
        articles: action.payload.articles,
        total: action.payload.articlesCount,
        loading: false,
        error: null,
      };
    case ArticlesActionTypes.GET_FULL_ARTICLE:
      return {
        articles: [action.payload],
        total: 1,
        loading: false,
        error: null,
      };
    case ArticlesActionTypes.UPDATE_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((article, ind) => {
          if (ind === action.payload.index) return action.payload.article;
          return article;
        }),
      };
    case ArticlesActionTypes.ARTICLE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
