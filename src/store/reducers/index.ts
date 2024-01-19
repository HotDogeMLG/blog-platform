import { combineReducers } from 'redux';
import { pageReducer } from './pageReducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  page: pageReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
