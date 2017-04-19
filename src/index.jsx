
import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import { routes } from './routes/routes.jsx';

import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './app.jsx';

const createStoreWithMiddleWare = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <AppContainer>
    <Provider store={createStoreWithMiddleWare(reducers)} >
      <App />
    </Provider>
  </AppContainer>
  , document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    render('./app.jsx')
  });
}