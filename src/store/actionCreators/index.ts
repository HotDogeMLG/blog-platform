import * as pageActions from './page';
import * as articlesActions from './articles';
import * as accountActions from './account';

export default { ...pageActions, ...articlesActions, ...accountActions };
