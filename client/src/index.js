import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/* @Components */
import PrivateRoute from './components/PrivateRoute';
import MangerLogin from './pages/MangerPages/Login';
import Dashboard from './pages/MangerPages/Dashboard';
import NotFound from './pages/CommonPages/NotFound';

/* @Store */
import Store from './store';

/* @Styles */
import 'antd/dist/antd.less';
import './index.css';

const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Switch>
          <Route exect path="/manager" render={(props) => <MangerLogin {...props} />} />
          <PrivateRoute exect path="/dashboard" render={(props) => <Dashboard {...props} />} />
          <Route render={(props) => <NotFound {...props} />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
