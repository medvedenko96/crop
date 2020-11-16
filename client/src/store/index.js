import { createStore, applyMiddleware } from 'redux';

import reducers from "./reducers";

const Store = createStore(reducers, [], applyMiddleware());

export default Store;
