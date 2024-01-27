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
import Signup from '../Account/Signup';
import Signin from '../Account/Signin';
import FullArticle from '../Article/FullArticle';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Error from '../Error/Error';
import Edit from '../Account/Edit';
import { useActions } from '../../hooks/useActions';
import NewArticle from '../NewArticle/NewArticle';

const App: FC = () => {
  const error = useTypedSelector((state) => state.articles.error);

  const { signIn } = useActions();
  const loggedIn = useTypedSelector((state) => state.account.loggedIn);
  if (!loggedIn && sessionStorage.getItem('user') !== null) signIn(null);

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
          <Route path='/sign-up' Component={Signup} />
          <Route path='/sign-in' Component={Signin} />
          <Route path='/profile' Component={Edit} />
          <Route path='/new-article' Component={NewArticle} />
          <Route path='*' element={<Navigate to='/articles' replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
