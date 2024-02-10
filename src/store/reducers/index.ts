import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { pageReducer } from './pageReducer';
import { accountReducer } from './accountReducer';
import { tagsReducer } from './tagsReducer';
import { themeReducer } from './themeReducer';
import { articleAPI } from '../../services/ArticleService';

const rootReducer = combineReducers({
  page: pageReducer,
  account: accountReducer,
  tags: tagsReducer,
  theme: themeReducer,
  [articleAPI.reducerPath]: articleAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleAPI.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
