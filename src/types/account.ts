export enum AccountActionTypes {
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
  LOAD_ACCOUNT = 'LOAD_ACCOUNT',
  ACCOUNT_ERROR = 'ACCOUNT_ERROR',
}

export interface user {
  username: string;
  email: string;
  token: string;
  bio: string;
  image: null | string;
}

export interface editData {
  username?: string;
  email?: string;
  password?: string;
  bio?: string;
  image?: string;
}

interface LogInAction {
  type: AccountActionTypes.LOG_IN;
  payload: user;
}

interface LoadAccountAction {
  type: AccountActionTypes.LOAD_ACCOUNT;
}

interface AccountErrorAction {
  type: AccountActionTypes.ACCOUNT_ERROR;
  payload: string | { username?: string; email?: string };
}

interface LogOutAction {
  type: AccountActionTypes.LOG_OUT;
}

export type AccountAction =
  | LogInAction
  | LogOutAction
  | LoadAccountAction
  | AccountErrorAction;

export type AccountState = {
  loggedIn: boolean;
  loading: boolean;
  error:
    | null
    | string
    | { username?: string; email?: string; 'email or password'?: string };
} & user;
