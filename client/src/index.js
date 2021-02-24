import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MangerLogin from './pages/MangerPages/Login';
import Dashboard from './pages/MangerPages/Dashboard';
import Store from './store';

import 'antd/dist/antd.less';
import './index.css';

const NotFound = () => (
  <div>
    <h3>404 page not found</h3>
    <p>We are sorry but the page you are looking for does not exist.</p>
  </div>
);

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <Switch>
        <Route exect path="/manager" render={(props) => <MangerLogin {...props} />} />
        <Route exect path="/dashboard" render={(props) => <Dashboard {...props} />} />
        <Route render={(props) => <NotFound {...props} />} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
