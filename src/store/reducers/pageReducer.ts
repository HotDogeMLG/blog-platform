import { PageAction, PageActionTypes, PageState } from '../../types/page';

const pageDefaultState: PageState = {
  page: 1,
};

export const pageReducer = (
  state: PageState = pageDefaultState,
  action: PageAction
) => {
  switch (action.type) {
    case PageActionTypes.CHANGE_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
