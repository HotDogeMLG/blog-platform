import * as pageActions from './page';
import * as articlesActions from './articles';
import * as accountActions from './account';
import * as tagsActions from './tags';

export default {
  ...pageActions,
  ...articlesActions,
  ...accountActions,
  ...tagsActions,
};
