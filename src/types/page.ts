export enum PageActionTypes {
  CHANGE_PAGE = 'CHANGE_PAGE',
}

interface ChangePageAction {
  type: PageActionTypes.CHANGE_PAGE;
  payload: number;
}

export type PageAction = ChangePageAction;

export interface PageState {
  page: number;
}
