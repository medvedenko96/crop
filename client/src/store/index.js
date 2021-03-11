import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

/* @Reducers */
import createRootReducer from './reducers';

export default function configureStore(history) {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const middleware = [reduxThunk, routerMiddleware(history)];

  return createStore(createRootReducer(history), {}, composeEnhancers(applyMiddleware(...middleware)));
}
