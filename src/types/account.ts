export enum AccountActionTypes {
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
}

interface LogInAction {
  type: AccountActionTypes.LOG_IN;
}

interface LogOutAction {
  type: AccountActionTypes.LOG_OUT;
}

export type AccountAction = LogInAction | LogOutAction;

export interface AccountState {
  loggedIn: boolean;
}
