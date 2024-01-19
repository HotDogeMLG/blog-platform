import React from 'react';
import { Pagination } from 'antd';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const MyPagination: React.FC = () => {
  const { changePage } = useActions();
  const page = useTypedSelector((state) => state.page.page);
  const changePageFn = (page: number) => {
    changePage(page);
  };
  return (
    <Pagination
      current={page}
      onChange={changePageFn}
      defaultCurrent={1}
      total={50}
    />
  );
};

export default MyPagination;
