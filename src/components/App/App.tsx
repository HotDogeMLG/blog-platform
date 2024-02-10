import { FC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Header from '../Header/Header';
import ArticleList from '../ArticleList/ArticleList';
import MyPagination from '../MyPagination/MyPagination';
import Signup from '../Account/Signup';
import Signin from '../Account/Signin';
import FullArticle from '../Article/FullArticle';
import Error from '../Error/Error';
import Edit from '../Account/Edit';
import NewArticle from '../NewArticle/NewArticle';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './App.scss';
import { articleAPI } from '../../services/ArticleService';
import { ThemeProvider } from 'antd-style';

const App: FC = () => {
  const page = useTypedSelector((state) => state.page.page);
  const token = useTypedSelector((state) => state.account.token);
  const { isError } = articleAPI.useGetArticlesQuery({ page, token });

  const { signIn } = useActions();
  const loggedIn = useTypedSelector((state) => state.account.loggedIn);
  if (!loggedIn && sessionStorage.getItem('user') !== null) signIn(null);

  let themeAppearance = useTypedSelector((state) => state.theme);
  const sessionTheme = sessionStorage.getItem('theme');
  if (sessionTheme !== null) themeAppearance = sessionTheme;

  return (
    <ThemeProvider
      appearance={themeAppearance}
      theme={(appearance) => {
        if (appearance === 'light')
          return {
            components: {
              Switch: {
                handleBg: 'yellow',
              },
            },
            token: {
              colorBgContainer: 'hsla(216, 26%, 94%, 1)',
            },
          };
      }}
    >
      <Router>
        <div className='App'>
          <Header />

          <Routes>
            <Route
              path='/articles'
              element={
                isError ? (
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
              element={isError ? <Error /> : <FullArticle />}
            />
            <Route path='/sign-up' Component={Signup} />
            <Route path='/sign-in' Component={Signin} />
            <Route path='/profile' Component={Edit} />
            <Route path='/new-article' Component={NewArticle} />
            <Route path='/:slug/edit' Component={NewArticle} />
            <Route path='*' element={<Navigate to='/articles' replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
