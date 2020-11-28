import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Store from './store';

import 'antd/dist/antd.less';
import './index.css';

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <Route exect path="/login" component={Login} />
      <Route exect path="/dashboard" component={Dashboard} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
