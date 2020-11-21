import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './pages/AdminLogin';
import Store from './store';

import 'antd/dist/antd.less';

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <Route exect path="/admin" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
