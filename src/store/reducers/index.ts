import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { pageReducer } from './pageReducer';
import { articleReducer } from './articleReducer';
import { accountReducer } from './accountReducer';

const rootReducer = combineReducers({
  page: pageReducer,
  articles: articleReducer,
  account: accountReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
