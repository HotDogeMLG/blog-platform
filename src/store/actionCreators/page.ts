import { PageActionTypes } from '../../types/page';

export const changePage = (page: number) => ({
  type: PageActionTypes.CHANGE_PAGE,
  payload: page,
});
