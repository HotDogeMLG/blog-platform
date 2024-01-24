import {
  AccountAction,
  AccountActionTypes,
  AccountState,
} from '../../types/account';

const accountDefaultState: AccountState = {
  loggedIn: false,
  loading: false,
  error: null,
  username: '',
  email: '',
  token: '',
  bio: '',
  image: null,
};

export const accountReducer = (
  state: AccountState = accountDefaultState,
  action: AccountAction
): AccountState => {
  switch (action.type) {
    case AccountActionTypes.LOAD_ACCOUNT:
      return { ...state, loading: true, error: null };
    case AccountActionTypes.LOG_IN:
      return {
        loggedIn: true,
        loading: false,
        error: null,
        ...action.payload,
      };
    case AccountActionTypes.LOG_OUT:
      return { ...accountDefaultState };
    case AccountActionTypes.ACCOUNT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
