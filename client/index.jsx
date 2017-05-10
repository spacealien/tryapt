
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
import { setCurrentUser } from './actions/auth_action';

import jwtDecode from 'jwt-decode';

import App from './app.jsx';

const createStoreWithMiddleWare = applyMiddleware(ReduxThunk)(createStore);
var store = createStoreWithMiddleWare(reducers);

console.log(localStorage.jwtToken);

if (localStorage.jwtToken) {
  console.log("setting user data");
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
  , document.getElementById('app')
);


//UNCOMMENT THIS PIECE OF CODE TO ENABLE TO HOT-RELOADING
if (module.hot) {
   module.hot.accept();
}
