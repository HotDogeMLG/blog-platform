import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { pageReducer } from './pageReducer';
import { articleReducer } from './articleReducer';

const rootReducer = combineReducers({
  page: pageReducer,
  articles: articleReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
