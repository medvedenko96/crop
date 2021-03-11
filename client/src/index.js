import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

/* @Components */
import PrivateRoute from './components/PrivateRoute';
import MangerLogin from './pages/MangerPages/Login';
import Dashboard from './pages/MangerPages/Dashboard';
import NotFound from './pages/CommonPages/NotFound';

/* @Store */
import configureStore from './store';

/* @Styles */
import 'antd/dist/antd.less';
import './index.css';

const history = createBrowserHistory();
const Store = configureStore(history);

const App = () => {
  return (
    <Provider store={Store}>
      <ConnectedRouter history={history}>
        <BrowserRouter>
          <Switch>
            <Route exect path="/manager" render={(props) => <MangerLogin {...props} />} />
            <PrivateRoute exect path="/dashboard/:companyId?" render={(props) => <Dashboard {...props} />} />
            <Route render={(props) => <NotFound {...props} />} />
          </Switch>
        </BrowserRouter>
      </ConnectedRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
