import * as pageActions from './page';
import * as accountActions from './account';
import * as tagsActions from './tags';

export default {
  ...pageActions,
  ...accountActions,
  ...tagsActions,
};
