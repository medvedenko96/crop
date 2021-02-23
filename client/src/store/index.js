import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const middleware = [reduxThunk];

const Store = createStore(reducers, {}, composeEnhancers(applyMiddleware(...middleware)));

export default Store;
