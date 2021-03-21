import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from './manager';
import companies from './company';
import regions from './region';

export default (history) => combineReducers({ router: connectRouter(history), user, companies, regions });
