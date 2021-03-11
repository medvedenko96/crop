import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from './manager';
import companies from './company';

export default (history) => combineReducers({ router: connectRouter(history), user, companies });
