import {
  AccountAction,
  AccountActionTypes,
  AccountState,
} from '../../types/account';

const accountDefaultState: AccountState = {
  loggedIn: false,
};

export const accountReducer = (
  state: AccountState = accountDefaultState,
  action: AccountAction
): AccountState => {
  switch (action.type) {
    case AccountActionTypes.LOG_IN:
      return { ...state, loggedIn: true };
    case AccountActionTypes.LOG_OUT:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};
