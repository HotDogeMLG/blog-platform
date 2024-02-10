import React from 'react';
import { Pagination } from 'antd';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { articleAPI } from '../../services/ArticleService';
import { useTheme } from 'antd-style';

const MyPagination: React.FC = () => {
  const { changePage } = useActions();
  const page = useTypedSelector((state) => state.page.page);
  const changePageFn = (page: number) => {
    changePage(page);
  };

  const token = useTypedSelector((state) => state.account.token);
  const { data: articleRes } = articleAPI.useGetArticlesQuery({ token, page });

  const theme = useTheme();

  return (
    <Pagination
      style={{
        background: theme.colorBgContainer,
        padding: '0 0 20px 0',
      }}
      current={page}
      onChange={changePageFn}
      defaultCurrent={1}
      total={articleRes?.articlesCount}
      pageSize={5}
      showSizeChanger={false}
      showQuickJumper
    />
  );
};

export default MyPagination;
