import { AccountActionTypes } from '../../types/account';

export const logIn = () => {
  return { type: AccountActionTypes.LOG_IN };
};

export const logOut = () => {
  return { type: AccountActionTypes.LOG_OUT };
};
