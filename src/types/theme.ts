export enum ThemeActionTypes {
  SWITCH_THEME = 'SWITCH_THEME',
}

interface SwitchThemeAction {
  type: ThemeActionTypes.SWITCH_THEME;
}

export type ThemeAction = SwitchThemeAction;
