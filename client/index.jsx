
import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import { routes } from './routes/routes.jsx';

import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import setAuthorizationToken from './utils/setAuthorizationToken.js';

import App from './app.jsx';

const createStoreWithMiddleWare = applyMiddleware(ReduxThunk)(createStore);
var store = createStoreWithMiddleWare(reducers);

ReactDOM.render(

  <Provider store={store} >
    <App />
  </Provider>

  , document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
