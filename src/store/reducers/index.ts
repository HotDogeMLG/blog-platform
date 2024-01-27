import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { pageReducer } from './pageReducer';
import { articleReducer } from './articleReducer';
import { accountReducer } from './accountReducer';
import { tagsReducer } from './tagsReducer';

const rootReducer = combineReducers({
  page: pageReducer,
  articles: articleReducer,
  account: accountReducer,
  tags: tagsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
