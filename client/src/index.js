import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/* @Components */
import MangerLogin from './pages/MangerPages/Login';
import Dashboard from './pages/MangerPages/Dashboard';
import NotFound from './pages/CommonPages/NotFound';

/* @Store */
import Store from './store';

/* @Styles */
import 'antd/dist/antd.less';
import './index.css';

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
