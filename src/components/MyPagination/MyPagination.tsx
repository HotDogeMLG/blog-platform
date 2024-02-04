import React from 'react';
import { Pagination } from 'antd';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { articleAPI } from '../../services/ArticleService';

const MyPagination: React.FC = () => {
  const { changePage } = useActions();
  const page = useTypedSelector((state) => state.page.page);
  const changePageFn = (page: number) => {
    changePage(page);
  };

  const token = useTypedSelector((state) => state.account.token);
  const { data: articleRes } = articleAPI.useGetArticlesQuery({ token, page });

  return (
    <Pagination
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
