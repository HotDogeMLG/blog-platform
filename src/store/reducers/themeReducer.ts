import { ThemeAction, ThemeActionTypes } from '../../types/theme';

const sessionTheme = sessionStorage.getItem('theme');
const themeDefaultState = sessionTheme !== null ? sessionTheme : 'dark';

export const themeReducer = (
  state: string = themeDefaultState,
  action: ThemeAction
) => {
  switch (action.type) {
    case ThemeActionTypes.SWITCH_THEME:
      sessionStorage.setItem('theme', state === 'light' ? 'dark' : 'light');
      return state === 'light' ? 'dark' : 'light';
    default:
      return state;
  }
};
