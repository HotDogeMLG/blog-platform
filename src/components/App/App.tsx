import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Header from '../Header/Header';
import ArticleList from '../ArticleList/ArticleList';
import MyPagination from '../MyPagination/MyPagination';
import './App.scss';
import Signup from '../Sign/Signup';
import Signin from '../Sign/Signin';
import FullArticle from '../Article/FullArticle';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Error from '../Error/Error';

const App: FC = () => {
  const error = useTypedSelector((state) => state.articles.error);
  return (
    <Router>
      <div className='App'>
        <Header />

        <Routes>
          <Route
            path='/articles'
            element={
              error ? (
                <Error />
              ) : (
                <div>
                  <ArticleList />
                  <div className='App__pagination'>
                    <MyPagination />
                  </div>
                </div>
              )
            }
          />
          <Route
            path='/articles/:slug'
            element={error ? <Error /> : <FullArticle />}
          />
          <Route path='/signup' Component={Signup} />
          <Route path='/signin' Component={Signin} />
          <Route path='*' element={<Navigate to='/articles' replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
