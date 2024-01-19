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

const App: FC = () => {
  return (
    <Router>
      <div className='App'>
        <Header />

        <Routes>
          <Route
            path='/articles'
            element={
              <div>
                <ArticleList />
                <div className='App__pagination'>
                  <MyPagination />
                </div>
              </div>
            }
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
