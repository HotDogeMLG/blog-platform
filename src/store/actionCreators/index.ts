import * as pageActions from './page';
import * as accountActions from './account';
import * as tagsActions from './tags';
import * as themeActions from './theme';

export default {
  ...pageActions,
  ...accountActions,
  ...tagsActions,
  ...themeActions,
};
