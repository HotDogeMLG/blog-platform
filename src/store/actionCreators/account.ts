import { Dispatch } from '@reduxjs/toolkit';
import {
  AccountAction,
  AccountActionTypes,
  editData,
  user,
} from '../../types/account';
import axios from 'axios';

interface userData {
  username: string;
  email: string;
  password: string;
}

function getErrorFromObject(e: unknown) {
  if (
    typeof e === 'object' &&
    e &&
    'response' in e &&
    typeof e.response === 'object' &&
    e.response &&
    'data' in e.response &&
    typeof e.response.data === 'object' &&
    e.response.data &&
    'errors' in e.response.data &&
    typeof e.response.data.errors === 'object' &&
    e.response.data.errors
  )
    return e.response.data.errors;
  return 'Unknown account error';
}

export const signUp = (userData: userData) => {
  return async (dispatch: Dispatch<AccountAction>) => {
    try {
      dispatch({ type: AccountActionTypes.LOAD_ACCOUNT });

      const res = await axios.post<{ user: user }>(
        'https://blog.kata.academy/api/users',
        {
          user: {
            ...userData,
          },
        }
      );
      console.log('Signed up!', res);
      sessionStorage.setItem('user', JSON.stringify(res.data.user));

      dispatch({ type: AccountActionTypes.LOG_IN, payload: res.data.user });
    } catch (e) {
      console.log('FUCK', e);
      dispatch({
        type: AccountActionTypes.ACCOUNT_ERROR,
        payload: getErrorFromObject(e),
      });
    }
  };
};

export const signIn = (
  userData: { email: string; password: string } | null
) => {
  return async (dispatch: Dispatch<AccountAction>) => {
    try {
      dispatch({ type: AccountActionTypes.LOAD_ACCOUNT });

      let user;
      user = sessionStorage.getItem('user');

      if (user !== null) user = JSON.parse(user);
      else {
        const res = await axios.post<{ user: user }>(
          'https://blog.kata.academy/api/users/login',
          { user: { ...userData } }
        );
        console.log('Successfully signed in', res);
        user = res.data.user;
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      dispatch({
        type: AccountActionTypes.LOG_IN,
        payload: user,
      });
    } catch (e) {
      console.log('ERROR', e);

      dispatch({
        type: AccountActionTypes.ACCOUNT_ERROR,
        payload: getErrorFromObject(e),
      });
    }
  };
};

export const editProfile = (editData: editData, token: string) => {
  return async (dispatch: Dispatch<AccountAction>) => {
    try {
      dispatch({ type: AccountActionTypes.LOAD_ACCOUNT });

      const res = await axios.put<{ user: user }>(
        'https://blog.kata.academy/api/user',
        {
          user: { ...editData },
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log('Successfully edited', res);

      const user = res.data.user;
      sessionStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: AccountActionTypes.LOG_IN, payload: user });
    } catch (e) {
      console.log('Profile update error', e);
      dispatch({
        type: AccountActionTypes.ACCOUNT_ERROR,
        payload: getErrorFromObject(e),
      });
    }
  };
};

export const logOut = () => {
  sessionStorage.clear();
  return { type: AccountActionTypes.LOG_OUT };
};
