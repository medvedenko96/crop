import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from './user/reduser';
import companies from './company/reduser';
import regions from './region/reduser';
import fields from './field/reduser';
import years from './year/reduser';

export default (history) =>
	combineReducers({ router: connectRouter(history), user, companies, regions, fields, years });
