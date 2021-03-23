import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from './manager';
import companies from './company';
import regions from './region';
import fields from './field';

export default (history) => combineReducers({ router: connectRouter(history), user, companies, regions, fields });
