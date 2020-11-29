import { combineReducers } from 'redux';

import user from './manager';
import companies from './company';

export default combineReducers({ user, companies });
